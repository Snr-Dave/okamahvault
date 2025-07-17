import { 
  users, 
  portfolios, 
  transactions, 
  referrals,
  type User, 
  type InsertUser,
  type Portfolio,
  type Transaction,
  type InsertTransaction,
  type Referral 
} from "@shared/schema";

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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private portfolios: Map<number, Portfolio>;
  private transactions: Map<number, Transaction>;
  private referrals: Map<number, Referral>;
  private currentUserId: number;
  private currentPortfolioId: number;
  private currentTransactionId: number;
  private currentReferralId: number;

  constructor() {
    this.users = new Map();
    this.portfolios = new Map();
    this.transactions = new Map();
    this.referrals = new Map();
    this.currentUserId = 1;
    this.currentPortfolioId = 1;
    this.currentTransactionId = 1;
    this.currentReferralId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      walletBalance: "15.00", // Signup bonus
      solanaAddress: null,
      referralCode: `REF${id.toString().padStart(6, '0')}`,
      referredBy: insertUser.referralCode || null,
      createdAt: new Date(),
    };
    this.users.set(id, user);

    // Create initial portfolio
    await this.createPortfolio(id);

    // Create signup bonus transaction
    await this.createTransaction({
      userId: id,
      type: "signup_bonus",
      amount: "15.00",
      description: "Welcome bonus for new user registration",
    });

    return user;
  }

  async getPortfolio(userId: number): Promise<Portfolio | undefined> {
    return Array.from(this.portfolios.values()).find(
      (portfolio) => portfolio.userId === userId,
    );
  }

  async createPortfolio(userId: number): Promise<Portfolio> {
    const id = this.currentPortfolioId++;
    const portfolio: Portfolio = {
      id,
      userId,
      totalValue: "0.00",
      lastUpdated: new Date(),
    };
    this.portfolios.set(id, portfolio);
    return portfolio;
  }

  async updatePortfolioValue(userId: number, totalValue: string): Promise<Portfolio> {
    const portfolio = await this.getPortfolio(userId);
    if (!portfolio) {
      throw new Error("Portfolio not found");
    }
    
    const updatedPortfolio: Portfolio = {
      ...portfolio,
      totalValue,
      lastUpdated: new Date(),
    };
    this.portfolios.set(portfolio.id, updatedPortfolio);
    return updatedPortfolio;
  }

  async getTransactionsByUser(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter((transaction) => transaction.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentTransactionId++;
    const transaction: Transaction = {
      ...insertTransaction,
      id,
      createdAt: new Date(),
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getReferralsByUser(userId: number): Promise<Referral[]> {
    return Array.from(this.referrals.values()).filter(
      (referral) => referral.referrerId === userId,
    );
  }

  async createReferral(referrerId: number, referredId: number): Promise<Referral> {
    const id = this.currentReferralId++;
    const referral: Referral = {
      id,
      referrerId,
      referredId,
      bonusAmount: "15.00",
      createdAt: new Date(),
    };
    this.referrals.set(id, referral);
    return referral;
  }
}

export const storage = new MemStorage();
