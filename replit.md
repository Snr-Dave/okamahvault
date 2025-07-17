# Okamah$Vesting Investment Dashboard

## Overview

Okamah$Vesting is a modern full-stack investment dashboard platform that combines traditional investment tracking with blockchain integration. The platform provides users with portfolio management capabilities, Solana wallet integration, and a referral rewards system with instant bonuses.

**Recent Updates (January 2025):**
- Implemented full PostgreSQL database with Drizzle ORM
- Added comprehensive investment flow with 2-3.5% daily ROI over 7 days
- Created deposit system with Solana wallet integration
- Built withdrawal request system with admin approval
- Enhanced dashboard with functional deposit, investment, and withdrawal sections

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React.js with TypeScript for type safety and modern component development
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS for utility-first styling with Shadcn UI component library
- **Data Fetching**: TanStack Query for efficient server state management and caching
- **Forms**: React Hook Form with Zod validation for robust form handling
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript throughout the stack for consistency
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: Connect-pg-simple for PostgreSQL-backed sessions
- **Authentication**: JWT-based authentication system (planned implementation)

### Key Components

#### Database Schema
The application uses four main tables:
- **Users**: Stores user information including wallet balance, Solana addresses, and referral codes
- **Portfolios**: Tracks investment portfolio values per user
- **Transactions**: Records all financial activities (deposits, investments, referrals, bonuses)
- **Referrals**: Manages the referral system linking referrers to referred users

#### User Incentive System
- **$15 Welcome Bonus**: Automatically credited to new users upon registration
- **Referral Rewards**: $15 bonus for successful referrals with tracking system
- **Wallet Integration**: Solana blockchain integration for secure wallet management

#### Dashboard Features
- Real-time portfolio tracking with performance metrics
- Transaction history with categorization
- Referral management and earnings tracking
- Statistics cards showing key performance indicators

### Data Flow

1. **User Registration**: Creates user account, applies $15 welcome bonus, processes referral codes
2. **Portfolio Management**: Updates investment values, tracks performance metrics
3. **Transaction Processing**: Records all financial activities with proper categorization
4. **Referral System**: Validates referral codes, applies bonuses, tracks relationships

### External Dependencies

#### UI/Component Libraries
- Radix UI primitives for accessible, unstyled components
- Lucide React for consistent iconography
- Class Variance Authority for component variant management

#### Database & Storage
- Neon Database serverless PostgreSQL for cloud-native data persistence
- Drizzle Kit for database migrations and schema management

#### Blockchain Integration
- Solana wallet adapter for mainnet blockchain interactions
- Planned integration for secure wallet transactions

#### Development Tools
- ESBuild for production bundling
- Replit-specific plugins for development environment integration

### Deployment Strategy

#### Development Environment
- Vite dev server with hot module replacement
- TypeScript compilation with strict type checking
- Database migrations via Drizzle Kit
- Environment-based configuration management

#### Production Considerations
- Static asset generation via Vite build process
- Express server bundling with ESBuild
- PostgreSQL database with connection pooling
- Environment variable management for sensitive data

#### Security Measures
- Password hashing for user authentication (to be implemented)
- JWT token-based session management
- CORS configuration for cross-origin requests
- Input validation using Zod schemas

The architecture prioritizes type safety, developer experience, and scalability while maintaining a clean separation between frontend presentation, backend logic, and data persistence layers.