# 🥗 NutriPlate

<div align="center">
  <img src="public/assets/img/logo.png" alt="NutriFe Logo" width="200"/>
  <p><em>Nutrition tracking and food analysis at your fingertips</em></p>
</div>

## 📱 Overview

NutriPlate is a comprehensive nutrition tracking and health management application built with Next.js. It helps users monitor their nutritional intake, track meals through food scanning, get personalized health information, find recipes, and receive AI-powered nutrition advice.

### ✨ Key Features

- **🔍 Food Scanning**: Take photos of your meals to automatically analyze nutritional content
- **📊 Nutrition Tracking**: Track calories, macros, and other nutritional metrics
- **💬 AI Nutrition Assistant**: Get personalized nutrition advice with our chatbot
- **📈 Progress Statistics**: View detailed charts of your nutrition journey
- **🍲 Recipe Recommendations**: Discover healthy recipes tailored to your preferences
- **📰 Health Information**: Access reliable health and nutrition articles

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with React 19 and TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with shadcn/ui components
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) and [Nanostores](https://github.com/nanostores/nanostores)
- **API Layer**: [TanStack Query](https://tanstack.com/query) (React Query)
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **AI Integration**: OpenAI API and Google GenAI for food analysis and nutrition insights
- **Form Handling**: React Hook Form with Zod validation
- **Charts**: Recharts for statistics visualization
- **Camera Integration**: react-camera-pro for food scanning
- **Containerization**: Docker for easy deployment and scalability

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (20+ recommended)
- npm, yarn, or pnpm
- Docker and Docker Compose (for containerized deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nutrife.git
   cd nutrife
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Create a `.env.local` file based on `.env.example`:
   ```bash
   cp .env.example .env.local
   ```

4. Fill in the environment variables in `.env.local`:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `GOOGLE_GENAI_API_KEY`: Your Google GenAI API key
   - Firebase configuration variables
   - Other required secrets

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🐳 Docker Deployment

NutriFe can be easily deployed using Docker and Docker Compose.

### Using Docker Compose

1. Configure your environment variables:
   ```bash
   cp .env.docker .env.local
   ```
   Edit the `.env.local` file with your actual configuration values.

2. Build and start the containers:
   ```bash
   docker-compose up -d --build
   ```

3. Access the application at [http://localhost:3000](http://localhost:3000)

### Manual Docker Deployment

1. Build the Docker image:
   ```bash
   docker build -t nutrife-app .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file .env.local -d nutrife-app
   ```

3. Access the application at [http://localhost:3000](http://localhost:3000)

### Docker Configuration Files

- **Dockerfile**: Multi-stage build process for optimized production deployment
- **docker-compose.yml**: Orchestrates the application with proper environment and volumes
- **.dockerignore**: Excludes unnecessary files from the Docker build context
- **.env.docker**: Template for Docker deployment environment variables

## 📂 Project Structure

```
nutrife/
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js app router pages and layouts
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and configurations
│   ├── providers/     # Context providers
│   │   ├── ai/        # AI and ML integrations
│   │   ├── auth/      # Authentication logic
│   │   ├── chatbot/   # AI nutrition assistant
│   │   ├── home/      # Home screen features
│   │   ├── info_kesehatan/ # Health information
│   │   ├── profile/   # User profile management
│   │   ├── resep_makanan/  # Recipe recommendations
│   │   ├── scan/      # Food scanning and analysis
│   │   └── statistic/ # Nutrition tracking statistics
│   └── layout/        # Layout components
├── .env.example       # Example environment variables
├── .env.docker        # Docker environment template
├── Dockerfile         # Docker build instructions
├── docker-compose.yml # Docker Compose configuration
├── .dockerignore      # Files to exclude from Docker build
├── next.config.ts     # Next.js configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## 🔐 Authentication and Security

NutriFe uses Firebase Authentication for secure user management. User data is stored in Firebase Firestore, and all API requests to OpenAI and other services are authenticated with JWT tokens.

## 📱 Application Features

### Food Scanning

Upload or take photos of your food to get instant nutritional analysis:
- Calorie count
- Macronutrient breakdown
- Food identification
- Health recommendations

### Nutrition Tracking

- Daily calorie and macro tracking
- Meal categorization (breakfast, lunch, dinner, snacks)
- Custom food entry
- Progress visualization

### AI Nutrition Assistant (Nubo)

Chat with our AI assistant for:
- Personalized nutrition advice
- Diet recommendations
- Answers to health and nutrition questions
- Food substitution suggestions

### Recipe Recommendations

- Healthy recipe suggestions based on preferences
- Detailed nutritional information for recipes
- Easy-to-follow cooking instructions
- Ingredient substitution options

### Health Information

- Curated health and nutrition articles
- Evidence-based nutrition information
- Tips for healthy eating habits

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [OpenAI](https://openai.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- All the amazing open-source libraries used in this project
