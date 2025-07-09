# AI CV Analyzer

A full-stack application that analyzes CV/resume documents using Google's Gemini AI to evaluate candidate profiles and provide insights.

## Features

- **PDF Upload & Processing**: Upload CV/resume documents in PDF format
- **AI-Powered Analysis**: Uses Google Gemini AI to analyze candidate profiles
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **RESTful API**: Express.js backend with tRPC for type-safe API calls
- **File Upload**: Multer middleware for handling file uploads

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Axios for API calls
- React Icons

### Backend

- Node.js
- Express.js
- TypeScript
- tRPC for type-safe APIs
- Google Gemini AI
- Multer for file uploads
- PDF parsing with pdf-parse
- CORS enabled

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Google Cloud Platform account** with Gemini AI API access
- **Google Cloud service account key** for authentication

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd AI-CV-Analyzer
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

### 3. Environment Configuration

#### Backend Environment Variables

Create a `.env` file in the `backend` folder with the following variables:

```env
# Server Configuration
PORT=4000
CLIENT_ORIGIN=http://localhost:5173

# Google Gemini AI Configuration
GEMINI_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
GEMINI_AUTH_TOKEN=your_gemini_auth_token_here
GOOGLE_API_KEY=your_google_api_key_here
```

#### Frontend Environment Variables

Create a `.env` file in the `frontend` folder with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:4000
```

**Note**: The `VITE_` prefix is required for Vite to expose environment variables to the frontend application.

### 4. Google Cloud Service Account Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Gemini AI API
4. Create a service account and download the JSON key file
5. Place the downloaded `service-account-key.json` file in the `backend` folder

**Important**: Never commit your `.env` file or `service-account-key.json` to version control!

### 5. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

## Running the Application

### Development Mode

1. **Start the Backend Server** (from the `backend` directory):

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3001`

2. **Start the Frontend Development Server** (from the `frontend` directory):

   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

3. Open your browser and navigate to `http://localhost:5173`

### Production Build

1. **Build the Backend** (from the `backend` directory):

   ```bash
   npm run build
   npm start
   ```

2. **Build the Frontend** (from the `frontend` directory):
   ```bash
   npm run build
   npm run preview
   ```

## Project Structure

```
AI-CV-Analyzer/
├── backend/
│   ├── index.ts              # Main server entry point
│   ├── package.json          # Backend dependencies
│   ├── .env                  # Environment variables (create this)
│   ├── service-account-key.json  # Google Cloud credentials (add this)
│   ├── router/
│   │   ├── router.ts         # tRPC router configuration
│   │   └── uploadRoute.ts    # File upload routes
│   └── utils/
│       ├── config.ts         # Configuration management
│       ├── extractPDFText.ts # PDF text extraction
│       ├── gemini.ts         # Gemini AI integration
│       └── upload.ts         # File upload utilities
└── frontend/
    ├── src/
    │   ├── App.tsx           # Main React component
    │   ├── components/
    │   │   └── FileUploadForm.tsx  # File upload component
    │   ├── config/
    │   │   └── environment.ts      # Environment configuration
    │   ├── constants/
    │   │   └── api.ts              # API route constants
    │   ├── hooks/
    │   │   └── useFileUpload.ts    # Custom upload hook
    │   ├── services/
    │   │   └── fileSubmit.ts       # File upload service
    │   ├── types/
    │   │   └── upload.ts           # TypeScript interfaces
    │   ├── utils/
    │   │   └── fileValidation.ts   # File validation utilities
    │   └── main.tsx          # React entry point
    ├── .env                  # Frontend environment variables (create this)
    └── package.json          # Frontend dependencies
```

## API Endpoints

- `POST /upload` - Upload PDF files for analysis
- `POST /trpc/analyzeCV` - Analyze uploaded CV using Gemini AI

## Architecture

The application follows a clean, modular architecture with proper separation of concerns:

### Frontend Architecture

- **Components**: Reusable UI components with clear responsibilities
- **Services**: Business logic and API communication layer
- **Hooks**: Custom React hooks for state management
- **Types**: TypeScript interfaces for type safety
- **Utils**: Utility functions for validation and common operations
- **Config**: Environment and configuration management

### Backend Architecture

- **Routes**: API endpoint definitions
- **Utils**: Business logic and external service integrations
- **Config**: Environment and configuration management

## Environment Variables

### Backend Variables

| Variable            | Description                    | Required | Default |
| ------------------- | ------------------------------ | -------- | ------- |
| `PORT`              | Backend server port            | No       | 4000    |
| `CLIENT_ORIGIN`     | Frontend URL for CORS          | Yes      | -       |
| `GEMINI_URL`        | Gemini AI API endpoint         | Yes      | -       |
| `GEMINI_AUTH_TOKEN` | Gemini AI authentication token | Yes      | -       |
| `GOOGLE_API_KEY`    | Google Cloud API key           | Yes      | -       |

### Frontend Variables

| Variable            | Description          | Required | Default               |
| ------------------- | -------------------- | -------- | --------------------- |
| `VITE_API_BASE_URL` | Backend API base URL | No       | http://localhost:4000 |

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `CLIENT_ORIGIN` in your backend `.env` file matches your frontend URL
2. **API Connection Errors**: Verify `VITE_API_BASE_URL` in your frontend `.env` file points to the correct backend URL
3. **Authentication Errors**: Verify your Google Cloud credentials and API keys
4. **Port Conflicts**: Change the `PORT` in backend `.env` if 4000 is already in use
5. **PDF Processing Errors**: Ensure uploaded files are valid PDF documents
6. **Environment Variables Not Loading**: Make sure `.env` files are in the correct directories and have the right variable names

### Getting Google Cloud Credentials

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Gemini AI API
4. Create a service account with appropriate permissions
5. Download the JSON key file and save as `service-account-key.json`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please open an issue in the repository.
