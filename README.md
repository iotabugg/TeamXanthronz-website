# eBaja Webapp - Team Xanthronz Official Website

![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)
![Node Version](https://img.shields.io/badge/Node-v18%2B-green)
![React](https://img.shields.io/badge/React-v19-blue)
![Express](https://img.shields.io/badge/Express-v5-orange)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v8-336791)

A full-stack web application for managing and showcasing Team Xanthronz's achievements, events, members, gallery, and sponsorships. Built with modern technologies for optimal performance and user experience.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Installation & Setup](#installation--setup)
- [Running the Project](#running-the-project)
- [Environment Variables](#environment-variables)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

eBaja Webapp is the official web presence for **Team Xanthronz**, providing:

- **Public Portal**: Showcase team achievements, events, members, and gallery
- **Admin Dashboard**: Manage content including members, achievements, events, and sponsorships
- **User Management**: Authentication system with role-based access control
- **Content Management**: Add and manage events, achievements, gallery images, and member profiles
- **Cloud Storage**: Integration with Cloudinary for image management
- **Request System**: Allow users to request changes/updates to team information

The application serves both as a marketing platform and an internal management system for team operations.

---

## ✨ Features

### Public Features
- 📸 **Photo Gallery**: Display team achievements and event photos
- 🏆 **Achievements**: Showcase yearly achievements and rankings
- 📅 **Events**: Browse upcoming, ongoing, and completed events
- 👥 **Team Members**: View detailed member profiles with skills and contact info
- 💼 **Sponsors**: Display partner and sponsor information
- 🔐 **User Registration**: Create accounts and access member features

### Admin Features
- 🛡️ **Role-Based Access Control**: Admin, Member, and Guest roles
- ➕ **Content Management**: Add/edit/delete achievements, events, members, and sponsors
- 📸 **Image Management**: Upload and manage images via Cloudinary
- ✏️ **Change Requests**: Review and approve user requests for updates
- 📊 **Dashboard**: Overall management interface
- 🔄 **Automated Cleanup**: Scheduled jobs for cleanup operations

### Security Features
- 🔐 **JWT Authentication**: Secure token-based authentication
- 🚀 **Rate Limiting**: Protection against abuse (100 requests per 15 minutes)
- 🛡️ **Helmet.js**: Security headers middleware
- 🔒 **Password Hashing**: bcrypt for secure password storage
- 🌐 **CORS**: Configured for secure cross-origin requests

---

## 🔧 Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js 5
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer + Cloudinary
- **Validation**: Zod
- **Security**: Helmet, CORS, bcrypt, express-rate-limit
- **Scheduling**: node-cron for background jobs

### Frontend
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Intersection Observer**: For lazy loading and animations
- **Build Tool**: Vite (Lightning-fast dev server)

### DevTools
- **Linting**: ESLint
- **Package Manager**: npm

---

## 📁 Project Structure

```
ebaja-webapp/
├── backend/                    # Express.js server
│   ├── src/
│   │   ├── app.ts             # Express app configuration
│   │   ├── index.ts           # Server entry point
│   │   ├── controllers/       # Route handlers
│   │   │   ├── auth.controller.ts
│   │   │   ├── member.controller.ts
│   │   │   ├── achievement.controller.ts
│   │   │   ├── event.controller.ts
│   │   │   ├── gallery.controller.ts
│   │   │   ├── sponsor.controller.ts
│   │   │   ├── changeRequest.controller.ts
│   │   │   └── user.controller.ts
│   │   ├── routes/            # API route definitions
│   │   ├── middleware/        # Express middleware
│   │   ├── lib/               # Utilities (Cloudinary, Prisma)
│   │   ├── utils/             # Helper classes
│   │   │   ├── ApiError.ts
│   │   │   ├── ApiResponse.ts
│   │   │   ├── AsyncHandler.ts
│   │   │   └── token.ts
│   │   ├── types/             # TypeScript type definitions
│   │   └── jobs/              # Background jobs
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── migrations/        # Database migrations
│   └── package.json
│
├── frontend/                   # React + Vite application
│   ├── src/
│   │   ├── main.jsx           # Application entry point
│   │   ├── Layout.jsx         # Main layout wrapper
│   │   ├── App.jsx            # App component
│   │   ├── components/        # Reusable React components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── AchievementsPage.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ... (more components)
│   │   ├── context/           # React Context (AuthContext)
│   │   ├── api/               # API client configuration
│   │   ├── assets/            # Images, fonts, etc.
│   │   └── index.css          # Global styles
│   ├── public/                # Static files
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind CSS config
│   └── package.json
│
└── README.md                  # This file
```

---

## 🗄️ Database Schema

### Core Models

#### User
- **id**: Unique identifier (CUID)
- **email**: Unique email address
- **name**: User full name
- **passwordHash**: Bcrypt hashed password
- **role**: ADMIN | MEMBER | GUEST
- **refreshToken**: JWT refresh token
- **createdAt, updatedAt**: Timestamps
- **Relations**: changeRequests, galleryUploads

#### Member
- **id**: Unique identifier
- **name, role, department, year**: Member info
- **imgUrl, imgPublicId**: Cloudinary image reference
- **github, linkedin, email**: Contact information
- **skills**: Array of skill tags
- **createdAt, updatedAt**: Timestamps

#### Achievement
- **id**: Unique identifier
- **year**: Achievement year
- **title**: Achievement title
- **category**: Achievement category
- **rankSummary**: JSON data containing rankings
- **highlights**: Array of highlight strings
- **imageUrl, imgPublicId**: Cloudinary image reference
- **createdAt, updatedAt**: Timestamps

#### Event
- **id**: Unique identifier
- **title, date, venue, description**: Event details
- **status**: UPCOMING | ONGOING | COMPLETED
- **imageUrl, imgPublicId**: Cloudinary image reference
- **createdAt, updatedAt**: Timestamps

#### GalleryImage
- **id**: Unique identifier
- **url**: Image URL
- **imgPublicId**: Cloudinary image ID
- **type**: SLIDER | COLLAGE
- **caption**: Image description
- **uploadedBy**: User ID (foreign key)
- **createdAt**: Timestamp

#### ChangeRequest
- **id**: Unique identifier
- **requestedBy**: User ID (foreign key)
- **section**: Which section to update
- **description**: Requested changes
- **status**: PENDING | APPROVED | REJECTED
- **adminNote**: Admin response
- **createdAt, resolvedAt**: Timestamps

#### Sponsor
- **id**: Unique identifier
- **name**: Sponsor name
- **logoUrl, logoPublicId**: Cloudinary logo reference
- **websiteUrl**: Sponsor website
- **order**: Display order
- **isActive**: Visibility flag
- **createdAt, updatedAt**: Timestamps

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Routes `/auth`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | ❌ | Register new user |
| POST | `/login` | ❌ | Login user |
| POST | `/logout` | ✅ | Logout user |
| POST | `/refresh` | ❌ | Refresh access token |
| GET | `/me` | ✅ | Get current user profile |

### Member Routes `/member`
| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/members` | ❌ | - | Get all members |
| GET | `/members/:id` | ❌ | - | Get member by ID |
| POST | `/members` | ✅ | ADMIN | Create new member |
| PUT | `/members/:id` | ✅ | ADMIN | Update member |
| DELETE | `/members/:id` | ✅ | ADMIN | Delete member |

### Achievement Routes `/achievement`
| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/achievements` | ❌ | - | Get all achievements |
| GET | `/achievements/:id` | ❌ | - | Get achievement by ID |
| POST | `/achievements` | ✅ | ADMIN | Create achievement |
| PUT | `/achievements/:id` | ✅ | ADMIN | Update achievement |
| DELETE | `/achievements/:id` | ✅ | ADMIN | Delete achievement |

### Event Routes `/event`
| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/events` | ❌ | - | Get all events |
| GET | `/events/:id` | ❌ | - | Get event by ID |
| POST | `/events` | ✅ | ADMIN | Create event |
| PUT | `/events/:id` | ✅ | ADMIN | Update event |
| DELETE | `/events/:id` | ✅ | ADMIN | Delete event |

### Gallery Routes `/gallery`
| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/gallery` | ❌ | - | Get all gallery images |
| POST | `/gallery` | ✅ | MEMBER | Upload image |
| DELETE | `/gallery/:id` | ✅ | MEMBER | Delete own image |

### Sponsor Routes `/sponsor`
| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/sponsors` | ❌ | - | Get all sponsors |
| POST | `/sponsors` | ✅ | ADMIN | Create sponsor |
| PUT | `/sponsors/:id` | ✅ | ADMIN | Update sponsor |
| DELETE | `/sponsors/:id` | ✅ | ADMIN | Delete sponsor |

### Change Request Routes `/change-requests`
| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/change-requests` | ✅ | ADMIN | Get all requests |
| POST | `/change-requests` | ✅ | MEMBER | Create request |
| PUT | `/change-requests/:id` | ✅ | ADMIN | Approve/reject request |

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- Cloudinary account (for image management)
- Git

### Clone the Repository
```bash
git clone https://github.com/yourusername/ebaja-webapp.git
cd ebaja-webapp
```

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration** (see [Environment Variables](#environment-variables))
```bash
cp .env .env.local  # Configure your variables
```

4. **Database Setup**
```bash
# Run Prisma migrations to create tables
npx prisma migrate dev --name init
```

5. **Generate Prisma Client**
```bash
npx prisma generate
```

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
```bash
# Create .env.local file with API URL
echo "VITE_API_URL=http://localhost:5000/api/v1" > .env.local
```

---

## ▶️ Running the Project

### Backend

```bash
cd backend

# Development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The server runs on `http://localhost:5000` (or `process.env.PORT`)

### Frontend

```bash
cd frontend

# Development mode (with hot module replacement)
npm run dev

# Build for production
npm run build

# Preview production build
npm preview

# Lint code
npm run lint
```

The app runs on `http://localhost:5173` (Vite default)

### Running Both Simultaneously

From the root directory:
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev
```

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ebaja_db

# JWT Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret_key_here_min_32_chars
REFRESH_TOKEN_SECRET=your_refresh_token_secret_key_here_min_32_chars
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=7d

# Cloudinary (Image Management)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173
```

### Frontend (.env / .env.local)

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api/v1
```

---

## 🏗️ Architecture

### Design Patterns

#### Backend
- **MVC Architecture**: Separation of controllers, routes, and business logic
- **Middleware Pattern**: Reusable middleware for authentication and error handling
- **Repository Pattern**: Prisma ORM abstracts database operations
- **Async/Await**: Consistent async handling with custom `AsyncHandler` wrapper
- **Custom Error Handling**: Centralized error management with `ApiError` and `ApiResponse`

#### Frontend
- **Component-Based**: Modular React components for reusability
- **Context API**: Global state management for authentication
- **Routing**: React Router for SPA navigation
- **Responsive Design**: Mobile-first Tailwind CSS approach

### Security Considerations

1. **Authentication**: JWT tokens stored in HTTP-only cookies
2. **Authorization**: Role-based middleware (`requireRole` middleware)
3. **Rate Limiting**: 100 requests per 15 minutes per IP
4. **CORS**: Restricted to CLIENT_URL
5. **Helmet**: Security headers middleware
6. **Password Security**: bcrypt hashing with salt rounds
7. **Input Validation**: Zod schema validation
8. **HTTPS Ready**: Configured for production HTTPS

### Performance Optimizations

1. **Frontend**:
   - Vite for instant HMR and fast builds
   - Code splitting with React Router
   - Lazy loading with Intersection Observer
   - Tailwind CSS for optimized CSS delivery
   - Framer Motion for GPU-accelerated animations

2. **Backend**:
   - Connection pooling with Prisma
   - Efficient database queries
   - Cloudinary for CDN image delivery
   - Scheduled cleanup jobs for data maintenance

---

## 📝 Development Guidelines

### Code Style
- **TypeScript**: Strict mode for type safety
- **Formatting**: ESLint for consistent code style
- **Comments**: JSDoc comments for complex functions
- **Naming**: camelCase for variables/functions, PascalCase for components/classes

### Database Migrations
```bash
# Create new migration
npx prisma migrate dev --name migration_name

# View migrations
npx prisma migrate status

# Deploy migrations (production)
npx prisma migrate deploy
```

### Git Workflow
1. Create feature branch: `git checkout -b feature/feature-name`
2. Commit changes: `git commit -m "feat: add feature-name"`
3. Push to remote: `git push origin feature/feature-name`
4. Create Pull Request for review

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'feat: Add AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Commit Convention
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Test additions/updates
- `chore:` Build/tooling changes

---

## 📄 License

This project is licensed under the **ISC License** - see the LICENSE file for details.

---

## 📧 Contact & Support

For questions, issues, or suggestions:

- **Repository**: [GitHub](https://github.com/yourusername/ebaja-webapp)
- **Issues**: [GitHub Issues](https://github.com/yourusername/ebaja-webapp/issues)
- **Team Website**: (Add your team's website)

---

## 🙏 Acknowledgments

- Team Xanthronz members for their contributions
- Open-source community for amazing tools and libraries
- PostgreSQL, Express.js, React, and Vite communities

---

**Last Updated**: April 2026  
**Maintainers**: Team Xanthronz Development Committee
