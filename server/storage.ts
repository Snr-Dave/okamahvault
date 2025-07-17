import { 
  users, 
  portfolios, 
  transactions, 
  referrals,
  deposits,
  investments,
  withdrawalRequests,
  type User, 
  type InsertUser,
  type Portfolio,
  type Transaction,
  type InsertTransaction,
  type Referral,
  type Deposit,
  type InsertDeposit,
  type Investment,
  type InsertInvestment,
  type WithdrawalRequest,
  type InsertWithdrawal
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Portfolio methods
  getPortfolio(userId: number): Promise<Portfolio | undefined>;
  createPortfolio(userId: number): Promise<Portfolio>;
  updatePortfolioValue(userId: number, totalValue: string): Promise<Portfolio>;
  
  // Transaction methods
  getTransactionsByUser(userId: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  // Referral methods
  getReferralsByUser(userId: number): Promise<Referral[]>;
  createReferral(referrerId: number, referredId: number): Promise<Referral>;
  
  // Deposit methods
  createDeposit(deposit: InsertDeposit): Promise<Deposit>;
  getDepositsByUser(userId: number): Promise<Deposit[]>;
  updateDepositStatus(depositId: number, status: string): Promise<Deposit>;
  
  // Investment methods
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  getInvestmentsByUser(userId: number): Promise<Investment[]>;
  updateInvestmentProfit(investmentId: number, totalProfit: string): Promise<Investment>;
  getActiveInvestments(userId: number): Promise<Investment[]>;
  
  // Withdrawal methods
  createWithdrawalRequest(withdrawal: InsertWithdrawal): Promise<WithdrawalRequest>;
  getWithdrawalsByUser(userId: number): Promise<WithdrawalRequest[]>;
  updateWithdrawalStatus(withdrawalId: number, status: string, txHash?: string): Promise<WithdrawalRequest>;
}

export class DatabaseStorage implements IStorage {

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values({
      ...insertUser,
      walletBalance: "15.00", // Signup bonus
      referralCode: `REF${Date.now()}`,
      referredBy: insertUser.referralCode || null,
    }).returning();

    // Create initial portfolio
    await this.createPortfolio(user.id);

    // Create signup bonus transaction
    await this.createTransaction({
      userId: user.id,
      type: "signup_bonus",
      amount: "15.00",
      description: "Welcome bonus for new user registration",
    });

    return user;
  }

  async getPortfolio(userId: number): Promise<Portfolio | undefined> {
    const [portfolio] = await db.select().from(portfolios).where(eq(portfolios.userId, userId));
    return portfolio;
  }

  async createPortfolio(userId: number): Promise<Portfolio> {
    const [portfolio] = await db.insert(portfolios).values({
      userId,
      totalValue: "0.00",
    }).returning();
    return portfolio;
  }

  async updatePortfolioValue(userId: number, totalValue: string): Promise<Portfolio> {
    const [portfolio] = await db.update(portfolios)
      .set({ totalValue, lastUpdated: new Date() })
      .where(eq(portfolios.userId, userId))
      .returning();
    
    if (!portfolio) {
      throw new Error("Portfolio not found");
    }
    return portfolio;
  }

  async getTransactionsByUser(userId: number): Promise<Transaction[]> {
    return await db.select()
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.createdAt));
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const [transaction] = await db.insert(transactions).values(insertTransaction).returning();
    return transaction;
  }

  async getReferralsByUser(userId: number): Promise<Referral[]> {
    return await db.select()
      .from(referrals)
      .where(eq(referrals.referrerId, userId));
  }

  async createReferral(referrerId: number, referredId: number): Promise<Referral> {
    const [referral] = await db.insert(referrals).values({
      referrerId,
      referredId,
      bonusAmount: "15.00",
    }).returning();
    return referral;
  }

  // Deposit methods
  async createDeposit(deposit: InsertDeposit): Promise<Deposit> {
    const [newDeposit] = await db.insert(deposits).values(deposit).returning();
    return newDeposit;
  }

  async getDepositsByUser(userId: number): Promise<Deposit[]> {
    return await db.select()
      .from(deposits)
      .where(eq(deposits.userId, userId))
      .orderBy(desc(deposits.createdAt));
  }

  async updateDepositStatus(depositId: number, status: string): Promise<Deposit> {
    const [deposit] = await db.update(deposits)
      .set({ status, processedAt: new Date() })
      .where(eq(deposits.id, depositId))
      .returning();
    
    if (!deposit) {
      throw new Error("Deposit not found");
    }
    return deposit;
  }

  // Investment methods
  async createInvestment(investment: InsertInvestment): Promise<Investment> {
    const [newInvestment] = await db.insert(investments).values(investment).returning();
    return newInvestment;
  }

  async getInvestmentsByUser(userId: number): Promise<Investment[]> {
    return await db.select()
      .from(investments)
      .where(eq(investments.userId, userId))
      .orderBy(desc(investments.createdAt));
  }

  async updateInvestmentProfit(investmentId: number, totalProfit: string): Promise<Investment> {
    const [investment] = await db.update(investments)
      .set({ totalProfit })
      .where(eq(investments.id, investmentId))
      .returning();
    
    if (!investment) {
      throw new Error("Investment not found");
    }
    return investment;
  }

  async getActiveInvestments(userId: number): Promise<Investment[]> {
    return await db.select()
      .from(investments)
      .where(eq(investments.userId, userId))
      .where(eq(investments.status, "active"));
  }

  // Withdrawal methods
  async createWithdrawalRequest(withdrawal: InsertWithdrawal): Promise<WithdrawalRequest> {
    const [newWithdrawal] = await db.insert(withdrawalRequests).values(withdrawal).returning();
    return newWithdrawal;
  }

  async getWithdrawalsByUser(userId: number): Promise<WithdrawalRequest[]> {
    return await db.select()
      .from(withdrawalRequests)
      .where(eq(withdrawalRequests.userId, userId))
      .orderBy(desc(withdrawalRequests.requestedAt));
  }

  async updateWithdrawalStatus(withdrawalId: number, status: string, txHash?: string): Promise<WithdrawalRequest> {
    const [withdrawal] = await db.update(withdrawalRequests)
      .set({ status, processedAt: new Date(), txHash })
      .where(eq(withdrawalRequests.id, withdrawalId))
      .returning();
    
    if (!withdrawal) {
      throw new Error("Withdrawal request not found");
    }
    return withdrawal;
  }
}

export const storage = new DatabaseStorage();
