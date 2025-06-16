# InvoiceAgent: AI-Powered Invoice Reminder System

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![AWS Cognito](https://img.shields.io/badge/AWS_Cognito-Integrated-FF9900?logo=amazon-aws)](https://aws.amazon.com/cognito/)
[![Zoho API](https://img.shields.io/badge/Zoho_API-Integrated-E42527?logo=zoho)](https://www.zoho.com/developer/)

## 📋 Overview

InvoiceAgent is an intelligent invoice reminder system built to help businesses automate and streamline their accounts receivable process. By integrating with popular accounting platforms like Zoho Invoice, the application automatically identifies overdue invoices and sends customized, polite reminders to clients, improving cash flow and saving valuable time for business owners.

![InvoiceAgent Dashboard Preview](https://via.placeholder.com/800x450.png?text=InvoiceAgent+Dashboard+Preview)
*Demo screenshot placeholder - replace with actual application screenshot*

## 🚀 Key Features

- **Multi-Platform Integration** - Connect with Zoho Invoice, QuickBooks, FreshBooks, and Xero
- **Secure Authentication** - Dual authentication system with AWS Cognito and Zoho OAuth 2.0
- **Intelligent Reminder System** - AI-driven timing and messaging for maximum effectiveness
- **Custom Reminder Templates** - Create and manage personalized reminder templates
- **Dashboard Analytics** - Visual insights into outstanding invoices and payment patterns
- **Responsive UI** - Beautiful, modern interface using shadcn-ui and Tailwind CSS
- **Multi-tenant Architecture** - Enterprise-ready with secure data isolation between businesses

## 🏗️ Architecture

InvoiceAgent employs a modern frontend architecture with these key components:

- **React 18** - Component-based UI with hooks for state management
- **TypeScript** - Type-safe development with enhanced IDE support
- **Vite** - Fast development server and optimized builds
- **AWS Cognito** - User authentication, authorization, and profile management
- **Zoho OAuth 2.0** - Secure access to Zoho Invoice API resources
- **React Router** - Client-side routing with protected routes
- **React Query** - Efficient data fetching, caching, and state synchronization
- **shadcn-ui & Tailwind CSS** - Responsive and customizable UI components

## 🛠️ Installation

### Prerequisites
- Node.js 16+ and npm (or yarn/pnpm)
- AWS account with Cognito User Pool
- Zoho Developer account with API credentials

### Setup Steps

```bash
# Clone the repository
git clone https://github.com/yourusername/invoice-agent.git
cd invoice-agent/invoice-agent-ui-spark

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your AWS Cognito and Zoho API credentials

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env` file in the project root with the following variables:

```
# Zoho OAuth Configuration
VITE_ZOHO_CLIENT_ID=your_zoho_client_id
VITE_ZOHO_CLIENT_SECRET=your_zoho_client_secret
VITE_ZOHO_REDIRECT_URI=http://localhost:8080/callback
VITE_ZOHO_TOKEN_URL=https://accounts.zoho.{in|com|eu}/oauth/v2/token

# AWS Cognito Configuration
VITE_AWS_REGION=your_aws_region
VITE_COGNITO_USER_POOL_ID=your_user_pool_id
VITE_COGNITO_CLIENT_ID=your_client_id

# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## 💻 Usage

1. **Signup/Login**:
   - New users can sign up with email, business details, and password
   - Verification via email through AWS Cognito
   - Secure login with email and password

2. **Integration Setup**:
   - Connect to your accounting software using OAuth authorization
   - Sync invoices automatically from your accounting platform

3. **Reminder Configuration**:
   - Set up automated reminder schedules based on invoice due dates
   - Create custom templates for different scenarios (friendly reminder, overdue, severely overdue)

4. **Monitoring**:
   - Track which reminders have been sent and when
   - View payment conversions and effectiveness metrics

## 🔐 Authentication Flow

The application implements a comprehensive dual authentication system:

1. **User Authentication (AWS Cognito)**
   - Registration with email verification
   - Custom attributes for business data
   - Secure login and session management
   - Password reset and account recovery flows

2. **Integration Authentication (OAuth 2.0)**
   - Zoho OAuth implementation with authorization code flow
   - Secure storage of access and refresh tokens
   - Automatic token refresh for uninterrupted API access
   - Dedicated callback route for OAuth response handling

## 🧩 Technical Highlights

- **Custom OAuth Implementation** - Built a complete OAuth 2.0 flow for Zoho API integration without external libraries
- **Advanced Form Validation** - Client and server-side validation with detailed error handling
- **Protected Routes** - Route-based authentication and authorization checks
- **Optimistic UI Updates** - Immediate UI updates with background synchronization for a responsive experience
- **Error Boundary Implementation** - Graceful error handling throughout the application
- **API Layer Abstraction** - Clean separation of concerns with service modules
- **Environment-Aware Configuration** - Different settings for development, testing, and production environments

## 🔮 Future Roadmap

- **AI-Powered Response Analysis** - Analyze client communications to optimize reminder strategies
- **Payment Gateway Integration** - Allow clients to pay directly from reminder emails
- **Extended Platform Support** - Add integration with more accounting software platforms
- **Mobile App** - Companion mobile application for on-the-go reminder management
- **Internationalization** - Multi-language support for global businesses

## 👨‍💻 Developer Notes

This project demonstrates implementation of several advanced concepts:

- Secure authentication flows with AWS Cognito including custom attributes and multi-step verification
- OAuth 2.0 integration with third-party APIs including token management and refresh strategies
- React best practices including custom hooks, context API, and component composition
- TypeScript type safety with interfaces, generics, and utility types
- Modern UI development with Tailwind CSS utility-first approach and shadcn-ui components
- Frontend architecture patterns including service layers, state management, and API abstraction

## 📄 License

MIT © [Your Name]

