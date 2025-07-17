import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  walletBalance: decimal("wallet_balance", { precision: 10, scale: 2 }).default("15.00"),
  solanaAddress: text("solana_address"),
  referralCode: text("referral_code").unique(),
  referredBy: text("referred_by"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  totalValue: decimal("total_value", { precision: 12, scale: 2 }).default("0.00"),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  type: text("type").notNull(), // 'deposit', 'investment', 'referral', 'signup_bonus'
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const referrals = pgTable("referrals", {
  id: serial("id").primaryKey(),
  referrerId: integer("referrer_id").references(() => users.id).notNull(),
  referredId: integer("referred_id").references(() => users.id).notNull(),
  bonusAmount: decimal("bonus_amount", { precision: 10, scale: 2 }).default("15.00"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const deposits = pgTable("deposits", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  transactionId: text("transaction_id").notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  screenshotUrl: text("screenshot_url"),
  status: text("status").default("pending").notNull(), // pending, approved, rejected
  createdAt: timestamp("created_at").defaultNow(),
  processedAt: timestamp("processed_at"),
});

export const investments = pgTable("investments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  roiPercent: decimal("roi_percent", { precision: 5, scale: 2 }).notNull(),
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date").notNull(),
  dailyReturn: decimal("daily_return", { precision: 12, scale: 2 }).notNull(),
  totalProfit: decimal("total_profit", { precision: 12, scale: 2 }).default("0.00"),
  status: text("status").default("active").notNull(), // active, completed, withdrawn
  createdAt: timestamp("created_at").defaultNow(),
});

export const withdrawalRequests = pgTable("withdrawal_requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  walletAddress: text("wallet_address").notNull(),
  status: text("status").default("pending").notNull(), // pending, processed, rejected
  requestedAt: timestamp("requested_at").defaultNow(),
  processedAt: timestamp("processed_at"),
  txHash: text("tx_hash"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  firstName: true,
  email: true,
  lastName: true,
  password: true,
  referralCode: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  userId: true,
  type: true,
  amount: true,
  description: true,
});

export const insertDepositSchema = createInsertSchema(deposits).pick({
  userId: true,
  transactionId: true,
  amount: true,
  screenshotUrl: true,
});

export const insertInvestmentSchema = createInsertSchema(investments).pick({
  userId: true,
  amount: true,
  roiPercent: true,
  endDate: true,
  dailyReturn: true,
});

export const insertWithdrawalSchema = createInsertSchema(withdrawalRequests).pick({
  userId: true,
  amount: true,
  walletAddress: true,
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = insertUserSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  referralCode: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const depositSchema = z.object({
  transactionId: z.string().min(1, "Transaction ID is required"),
  amount: z.number().positive("Amount must be positive"),
  screenshotUrl: z.string().url("Invalid screenshot URL").optional(),
});

export const investmentSchema = z.object({
  amount: z.number().positive("Investment amount must be positive"),
});

export const withdrawalSchema = z.object({
  amount: z.number().positive("Withdrawal amount must be positive"),
  walletAddress: z.string().min(32, "Invalid Solana wallet address"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type Portfolio = typeof portfolios.$inferSelect;
export type Referral = typeof referrals.$inferSelect;
export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>;
export type Deposit = typeof deposits.$inferSelect;
export type InsertDeposit = z.infer<typeof insertDepositSchema>;
export type Investment = typeof investments.$inferSelect;
export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;
export type WithdrawalRequest = typeof withdrawalRequests.$inferSelect;
export type InsertWithdrawal = z.infer<typeof insertWithdrawalSchema>;
export type DepositData = z.infer<typeof depositSchema>;
export type InvestmentData = z.infer<typeof investmentSchema>;
export type WithdrawalData = z.infer<typeof withdrawalSchema>;
