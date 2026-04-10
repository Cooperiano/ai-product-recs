# AI Product Recommendation MVP

A modern AI-powered product recommendation system built with Next.js, featuring conversational AI assistance and intelligent product suggestions.

## 🚀 Features

- **AI-Powered Product Recommendations**: Get intelligent product suggestions using OpenAI's GPT model
- **Conversational AI Chat**: Natural language interface to ask questions and get product recommendations
- **Real-time Search**: Instant product search with filtering and sorting capabilities
- **Modern UI/UX**: Built with Tailwind CSS, Radix UI, and shadcn/ui components
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Supabase Integration**: Scalable backend with PostgreSQL database

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **shadcn/ui** - Beautiful, customizable UI components
- **Lucide React** - Beautiful icons
- **Zustand** - Lightweight state management

### Backend & AI
- **OpenAI API** - GPT-4 for AI-powered recommendations
- **Supabase** - Backend as a Service with PostgreSQL
- **Next.js API Routes** - Serverless API endpoints

### Development
- **Jest** - Testing framework
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📦 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- OpenAI API key
- Supabase project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-product-recs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

### Supabase Configuration

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Set up the database with the required tables (schema handled by migrations)
3. Get your project URL and anon key from the Supabase dashboard
4. Update the `.env.local` file with your credentials

## 🧪 Development

### Available Scripts

```bash
# Development server
npm run dev
# or
yarn dev
# or
pnpm dev

# Build for production
npm run build

# Start production server
npm run start

# Linting
npm run lint

# Type checking
npm run type-check

# Testing
npm run test
# or
npm run test:watch
# or
npm run test:coverage
```

### Development Workflow

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

3. The app will automatically reload when you make changes

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Configure environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`

4. Deploy automatically on every push

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

### Environment Variables

Required environment variables for deployment:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

## 📁 Project Structure

```
ai-product-recs/
├── app/                    # Next.js App Router
│   ├── api/              # API routes
│   │   ├── chat/         # Chat API
│   │   └── products/     # Products API
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── chat/             # Chat-related components
│   └── products/         # Product components
├── lib/                  # Utility libraries
│   ├── ai/               # AI utilities
│   ├── db/               # Database utilities
│   └── utils.ts          # General utilities
├── types/               # TypeScript type definitions
├── public/              # Static assets
├── tests/               # Test files
├── scripts/             # Build and utility scripts
└── data/                # Data files (if needed)
```

## 🧪 Testing

Run the test suite:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests with coverage:

```bash
npm run test:coverage
```

## 📋 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## 🎯 Future Enhancements

- User authentication and profiles
- Product categories and subcategories
- Advanced filtering and sorting
- Real-time notifications
- Mobile app (React Native)
- Analytics and reporting
- A/B testing framework
- Performance optimization

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the project documentation
- Review the API documentation

---

Built with ❤️ using Next.js, Supabase, and OpenAI