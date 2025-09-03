# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with Turbopack (default port: 3000)
- `npm run build` - Build the application for production with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint (note: command is incomplete in package.json, use with caution)

### Testing
No testing framework is currently configured in this project.

## Project Architecture

### Framework & Dependencies
- **Next.js 15.5.0** with App Router (not Pages Router)
- **React 19.1.0** with React DOM
- **Tailwind CSS** via PostCSS plugin for styling
- **Turbopack** enabled for both development and build processes

### Application Structure
This is an order management dashboard application with authentication features:

#### Core Architecture
- **App Router Structure**: Uses Next.js 13+ app directory structure
- **Client-Side Components**: Most components use "use client" directive
- **Context-Based State Management**: Authentication state managed via React Context
- **Mock Data**: Application uses hardcoded mock order data (no backend integration)

#### Key Components & Pages
- `src/app/layout.js` - Root layout with conditional navigation and AuthProvider wrapper
- `src/app/page.js` - Main dashboard showing order management interface
- `src/app/contexts/AuthContext.js` - Authentication context with localStorage persistence
- `src/app/login/page.js` - Authentication page (imported in main page)
- `src/app/[about|contact|products]/page.js` - Additional pages with navigation

#### Authentication Flow
- Uses localStorage for session persistence
- AuthContext provides isAuthenticated, currentUser, login, logout, isLoading
- Conditional rendering: login page for unauthenticated users, dashboard for authenticated
- Navigation bar only shows when authenticated

#### Styling Approach
- Tailwind CSS with utility-first approach
- Responsive design (sm:, md:, lg: breakpoints)
- Custom gradient backgrounds and hover effects
- Chinese text content mixed with English UI

### Configuration Files
- `eslint.config.mjs` - ESLint with Next.js core-web-vitals config
- `next.config.mjs` - Minimal Next.js configuration
- `jsconfig.json` - Path aliases: "@/*" maps to "./src/*"
- `postcss.config.mjs` - PostCSS with Tailwind CSS plugin

## Development Notes

### Key Patterns
- All client components must have "use client" directive
- Authentication state checked in multiple components
- Mock data is embedded directly in components
- Chinese language used for user-facing text
- Consistent use of Tailwind classes for styling

### File Organization
- App directory structure with page.js files
- Context providers in `src/app/contexts/`
- No components directory (components defined inline)
- No API routes currently implemented (has placeholder at `src/app/api/posts.js`)