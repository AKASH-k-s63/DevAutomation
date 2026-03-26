# Dev Automation Platform

A comprehensive Angular application for software development automation and AI-powered services.

## Features

### 🏠 Dashboard
- Overview of all platform activities
- Real-time statistics and metrics
- Recent activity feed
- Quick action buttons

### 🔍 Code Analysis
- Upload and analyze projects
- Quality metrics and security analysis
- Performance monitoring
- Historical analysis results

### ⚡ Automation
- Create custom automation workflows
- Monitor active automations
- Usage statistics and analytics
- Pre-built automation templates

### 🤖 AI Services
- Code generation assistance
- AI-powered code review
- Automated documentation generation
- Interactive AI chat assistant
- Usage tracking and limits

### 💳 Payments & Billing
- Subscription management
- Payment method management
- Billing history and invoices
- Usage-based pricing
- Plan comparison and upgrades

## Technology Stack

- **Frontend**: Angular 17 with standalone components
- **Styling**: SCSS with CSS custom properties
- **Routing**: Angular Router with lazy loading
- **State Management**: Services with RxJS
- **Build Tool**: Angular CLI

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/dev-automation-platform` directory.

## Project Structure

```
src/
├── app/
│   ├── app.component.ts          # Main application component
│   ├── app.config.ts             # Application configuration
│   ├── app.routes.ts             # Routing configuration
│   ├── navbar/
│   │   └── navbar.component.ts   # Navigation component
│   ├── dashboard/
│   │   └── dashboard.component.ts # Dashboard page
│   ├── code-analysis/
│   │   └── code-analysis.component.ts # Code analysis page
│   ├── automation/
│   │   └── automation.component.ts   # Automation page
│   ├── ai-services/
│   │   └── ai-services.component.ts  # AI services page
│   ├── payments/
│   │   └── payments.component.ts     # Payments page
│   └── services/
│       └── api.service.ts        # API service
├── index.html                    # Main HTML file
├── main.ts                       # Application bootstrap
└── styles.scss                   # Global styles
```

## Features Overview

### Dashboard
- Real-time statistics display
- Activity monitoring
- Quick access to all features

### Code Analysis
- Support for multiple file formats
- Comprehensive quality metrics
- Security vulnerability scanning
- Performance optimization suggestions

### Automation
- Visual workflow builder
- Multiple trigger types (Git, Schedule, Manual, Webhook)
- Pre-built templates
- Real-time monitoring

### AI Services
- Code generation with natural language prompts
- Automated code review and suggestions
- Documentation generation
- Interactive chat interface

### Payments
- Multiple subscription tiers
- Usage-based billing
- Payment method management
- Billing history and invoices

## Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop browsers
- Tablets
- Mobile devices

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
