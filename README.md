# Bonum Medelae Healing Hub

A modern pharmaceutical product catalog and order management system built with React and TypeScript.

## 🚀 Features

- **Product Catalog**: Comprehensive listing of pharmaceutical products
- **Category Management**: Products organized by medical categories
- **Shopping Cart**: Real-time cart management with GST calculations
- **Order Processing**: Direct order submission to Google Sheets backend
- **WhatsApp Integration**: Automatic order notifications via WhatsApp
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Authentication**: User login and registration system

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Routing**: React Router DOM v6
- **State Management**: React Hooks + Context
- **UI Components**: Shadcn/ui (based on Radix UI)
- **Styling**: 
  - Tailwind CSS
  - CSS Modules
  - CSS-in-JS with `tailwind-merge`
- **Icons**: Lucide React
- **Form Handling**: React Hook Form
- **Notifications**: Sonner Toast
- **Data Fetching**: TanStack Query (React Query)

### Backend
- **Database**: Google Sheets (via Google Apps Script)
- **API**: RESTful endpoints using Google Apps Script
- **Notifications**: WhatsApp Business API integration

### Development Tools
- **Language**: TypeScript
- **Linting**: ESLint
- **Package Manager**: npm
- **Version Control**: Git
- **Deployment**: Vercel

## 📁 Project Structure

```
bonum-medelae-healing-hub/
├── src/
│   ├── api/           # API integration
│   ├── assets/        # Static assets and images
│   ├── components/    # React components
│   ├── data/         # Data models and constants
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions
│   ├── pages/        # Page components
│   └── styles/       # Global styles
├── public/           # Public assets
└── config files      # Various configuration files
```

### Key Components

- **`src/components/`**:
  - `Products.tsx`: Main product catalog with filtering
  - `ProductCard.tsx`: Individual product display
  - `Cart.tsx`: Shopping cart management
  - `Header.tsx`: Navigation and branding
  - `Hero.tsx`: Landing page hero section
  - `About.tsx`: Company information
  - `Contact.tsx`: Contact information
  - `ui/`: Reusable UI components

- **`src/pages/`**:
  - `Index.tsx`: Main landing page
  - `Checkout.tsx`: Order processing
  - `Login.tsx`: User authentication
  - `GetStarted.tsx`: User registration
  - `NotFound.tsx`: 404 page

- **`src/api/`**:
  - `orders.ts`: Order submission and processing

## 🔧 Configuration Files

- **`vite.config.ts`**: Vite build configuration
- **`tailwind.config.cjs`**: Tailwind CSS configuration
- **`postcss.config.cjs`**: PostCSS plugins configuration
- **`tsconfig.json`**: TypeScript configuration
- **`vercel.json`**: Vercel deployment configuration

## 📦 Dependencies

### Production Dependencies
- React ecosystem: react, react-dom, react-router-dom
- UI components: @radix-ui/* components
- Styling: tailwindcss, tailwind-merge
- Forms: react-hook-form
- Data fetching: @tanstack/react-query
- Utilities: date-fns, zod, clsx

### Development Dependencies
- Build tools: vite, @vitejs/plugin-react-swc
- TypeScript: typescript, @types/*
- Linting: eslint and related plugins
- PostCSS: autoprefixer, postcss

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bonum-medelae-healing-hub.git
   cd bonum-medelae-healing-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔒 Environment Variables

- `VITE_GOOGLE_SHEETS_API_URL`: Google Apps Script deployment URL
- `VITE_WHATSAPP_NUMBER`: WhatsApp notification number

## 📱 Mobile Responsiveness

The application is fully responsive with:
- Mobile-first design approach
- Responsive navigation
- Adaptive layouts
- Touch-friendly interactions

## 🔐 Security

- CORS configuration for API endpoints
- Environment variable protection
- Input validation and sanitization
- Secure data transmission

## 🌐 Deployment

The application is deployed on Vercel with:
- Automatic deployments from main branch
- Environment variable management
- Build optimization
- Asset compression

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email your-email@example.com or join our Slack channel.
