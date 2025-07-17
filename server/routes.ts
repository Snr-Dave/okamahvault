import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { signupSchema, loginSchema } from "@shared/schema";
import { registerInvestmentRoutes } from "./investmentRoutes";
import { registerWithdrawalRoutes } from "./withdrawalRoutes";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Server is running", timestamp: new Date().toISOString() });
  });

  // User registration
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const validatedData = signupSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      // Create new user (includes signup bonus)
      const user = await storage.createUser({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        password: validatedData.password, // In production, hash this password
        referralCode: validatedData.referralCode,
      });

      // Handle referral bonus if referral code was provided
      if (validatedData.referralCode) {
        const referrer = await storage.getUserByEmail(validatedData.referralCode);
        if (referrer) {
          await storage.createReferral(referrer.id, user.id);
          await storage.createTransaction({
            userId: referrer.id,
            type: "referral",
            amount: "15.00",
            description: `Referral bonus for inviting ${user.firstName} ${user.lastName}`,
          });
        }
      }

      // Don't return password
      const { password, ...userWithoutPassword } = user;
      res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // User login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user || user.password !== validatedData.password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // In production, create and return JWT token
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get user dashboard data
  app.get("/api/user/:id/dashboard", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const portfolio = await storage.getPortfolio(userId);
      const transactions = await storage.getTransactionsByUser(userId);
      const referrals = await storage.getReferralsByUser(userId);

      const { password, ...userWithoutPassword } = user;
      
      res.json({
        user: userWithoutPassword,
        portfolio,
        recentTransactions: transactions.slice(0, 10),
        referralCount: referrals.length,
        referralEarnings: referrals.reduce((sum, ref) => sum + parseFloat(ref.bonusAmount || "0"), 0),
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get user transactions
  app.get("/api/user/:id/transactions", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const transactions = await storage.getTransactionsByUser(userId);
      res.json({ transactions });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Register investment and withdrawal routes
  registerInvestmentRoutes(app);
  registerWithdrawalRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
