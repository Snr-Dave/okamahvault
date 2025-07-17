import type { Express } from "express";
import { storage } from "./storage";
import { withdrawalSchema } from "@shared/schema";
import { z } from "zod";

export function registerWithdrawalRoutes(app: Express) {
  // Request withdrawal
  app.post("/api/request-withdrawal", async (req, res) => {
    try {
      const validatedData = withdrawalSchema.parse(req.body);
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
        return res.status(400).json({ message: "Insufficient balance for withdrawal" });
      }

      const withdrawalRequest = await storage.createWithdrawalRequest({
        userId,
        amount: validatedData.amount.toString(),
        walletAddress: validatedData.walletAddress,
      });

      // Create transaction record
      await storage.createTransaction({
        userId,
        type: "withdrawal_request",
        amount: validatedData.amount.toString(),
        description: `Withdrawal request to ${validatedData.walletAddress.substring(0, 8)}...`,
      });

      res.status(201).json({ 
        message: "Withdrawal request submitted successfully. Awaiting admin approval.",
        withdrawal: withdrawalRequest 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      console.error("Withdrawal request error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get user's withdrawal history
  app.get("/api/withdrawals/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      const withdrawals = await storage.getWithdrawalsByUser(userId);
      
      res.json({ withdrawals });
    } catch (error) {
      console.error("Get withdrawals error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Admin: Process withdrawal (approve/reject)
  app.post("/api/admin/process-withdrawal", async (req, res) => {
    try {
      const { withdrawalId, status, txHash } = req.body;
      
      if (!withdrawalId || !status) {
        return res.status(400).json({ message: "Withdrawal ID and status are required" });
      }

      if (!["processed", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status. Must be 'processed' or 'rejected'" });
      }

      const withdrawal = await storage.updateWithdrawalStatus(withdrawalId, status, txHash);
      
      // If processed, create confirmation transaction
      if (status === "processed") {
        await storage.createTransaction({
          userId: withdrawal.userId,
          type: "withdrawal_processed",
          amount: withdrawal.amount,
          description: `Withdrawal processed to ${withdrawal.walletAddress.substring(0, 8)}... - TX: ${txHash || 'N/A'}`,
        });
      }

      res.json({ 
        message: `Withdrawal ${status} successfully`,
        withdrawal 
      });
    } catch (error) {
      console.error("Process withdrawal error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Reinvest profits or capital
  app.post("/api/reinvest", async (req, res) => {
    try {
      const { investmentId, reinvestType, amount } = req.body; // reinvestType: 'profits' | 'capital' | 'both'
      const userId = req.body.userId; // TODO: Get from JWT token
      
      if (!userId || !investmentId || !reinvestType || !amount) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Generate new investment with same or updated parameters
      const roiPercent = (Math.random() * 1.5 + 2).toFixed(2); // 2.00 - 3.50%
      const dailyReturn = (amount * parseFloat(roiPercent) / 100).toFixed(2);
      
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 7);

      const newInvestment = await storage.createInvestment({
        userId,
        amount: amount.toString(),
        roiPercent,
        endDate,
        dailyReturn,
      });

      // Create transaction record
      await storage.createTransaction({
        userId,
        type: "reinvestment",
        amount: amount.toString(),
        description: `Reinvestment of ${reinvestType} - ${roiPercent}% daily ROI for 7 days`,
      });

      res.status(201).json({ 
        message: "Reinvestment successful",
        investment: newInvestment,
        dailyReturn: dailyReturn,
        totalExpectedReturn: (parseFloat(dailyReturn) * 7).toFixed(2)
      });
    } catch (error) {
      console.error("Reinvestment error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
}