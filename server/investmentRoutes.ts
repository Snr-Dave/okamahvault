import type { Express } from "express";
import { storage } from "./storage";
import { investmentSchema, depositSchema, withdrawalSchema } from "@shared/schema";
import { z } from "zod";

export function registerInvestmentRoutes(app: Express) {
  // Submit deposit request
  app.post("/api/submit-deposit", async (req, res) => {
    try {
      const validatedData = depositSchema.parse(req.body);
      const userId = req.body.userId; // TODO: Get from JWT token
      
      if (!userId) {
        return res.status(401).json({ message: "User ID required" });
      }

      const deposit = await storage.createDeposit({
        userId,
        transactionId: validatedData.transactionId,
        amount: validatedData.amount.toString(),
        screenshotUrl: validatedData.screenshotUrl,
      });

      res.status(201).json({ 
        message: "Deposit submitted successfully. Awaiting admin approval.",
        deposit 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      console.error("Deposit submission error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Start investment
  app.post("/api/invest", async (req, res) => {
    try {
      const validatedData = investmentSchema.parse(req.body);
      const userId = req.body.userId; // TODO: Get from JWT token
      
      if (!userId) {
        return res.status(401).json({ message: "User ID required" });
      }

      // Check user's available balance
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const availableBalance = parseFloat(user.walletBalance || "0");
      if (availableBalance < validatedData.amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }

      // Generate ROI between 2-3.5% daily
      const roiPercent = (Math.random() * 1.5 + 2).toFixed(2); // 2.00 - 3.50%
      const dailyReturn = (validatedData.amount * parseFloat(roiPercent) / 100).toFixed(2);
      
      // 7-day investment period
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 7);

      const investment = await storage.createInvestment({
        userId,
        amount: validatedData.amount.toString(),
        roiPercent,
        endDate,
        dailyReturn,
      });

      // Update user's wallet balance
      const newBalance = (availableBalance - validatedData.amount).toFixed(2);
      // TODO: Update user wallet balance in database

      // Create transaction record
      await storage.createTransaction({
        userId,
        type: "investment",
        amount: validatedData.amount.toString(),
        description: `Investment started with ${roiPercent}% daily ROI for 7 days`,
      });

      res.status(201).json({ 
        message: "Investment started successfully",
        investment,
        dailyReturn: dailyReturn,
        totalExpectedReturn: (parseFloat(dailyReturn) * 7).toFixed(2)
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      console.error("Investment creation error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get investment status
  app.get("/api/investment-status/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      const investments = await storage.getActiveInvestments(userId);
      
      const investmentStatus = investments.map(investment => {
        const startDate = new Date(investment.startDate!);
        const endDate = new Date(investment.endDate);
        const now = new Date();
        
        const totalDays = 7;
        const daysPassed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const daysRemaining = Math.max(0, totalDays - daysPassed);
        
        const currentProfit = (parseFloat(investment.dailyReturn) * Math.min(daysPassed, totalDays)).toFixed(2);
        const isCompleted = now >= endDate;
        
        return {
          id: investment.id,
          amount: investment.amount,
          roiPercent: investment.roiPercent,
          dailyReturn: investment.dailyReturn,
          daysRemaining: isCompleted ? 0 : daysRemaining,
          currentProfit,
          totalProfit: investment.totalProfit,
          status: investment.status,
          isCompleted,
          canWithdraw: isCompleted
        };
      });

      res.json({ investments: investmentStatus });
    } catch (error) {
      console.error("Investment status error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update investment profits (daily cron job would call this)
  app.post("/api/update-investment-profits", async (req, res) => {
    try {
      const allActiveInvestments = await storage.getInvestmentsByUser(0); // Get all users' investments
      
      for (const investment of allActiveInvestments) {
        if (investment.status === "active") {
          const startDate = new Date(investment.startDate!);
          const now = new Date();
          const daysPassed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
          
          if (daysPassed > 0 && daysPassed <= 7) {
            const newProfit = (parseFloat(investment.dailyReturn) * daysPassed).toFixed(2);
            await storage.updateInvestmentProfit(investment.id, newProfit);
          }
        }
      }

      res.json({ message: "Investment profits updated successfully" });
    } catch (error) {
      console.error("Update profits error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
}