# Star Wars Character Explorer

An application that allows users to explore Star Wars characters. Built with React (Vite) for the frontend and Node.js for the backend.

## Note: The .env file was not added to the .gitignore file."

## Project Structure

```
├── starwar-frontend/    # React frontend built with Vite
└── starwars-backend/    # Node.js backend
```

## Features

- Browse Star Wars characters
- Search functionality
- Pagination
- Detailed character information
- Responsive design
- Character images - Find the images from this repo (https://github.com/vieraboschkova/swapi-gallery)

## Technical Stack

### Frontend

- React.js with Vite
- Tailwind CSS v4 for styling
- React Hooks for state management
- Axios for API calls
- React Query for data fetching, caching.

### Backend

- Node.js
- Express.js
- RESTful API architecture

## Installation Guide

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd starwars-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:

   ```bash
   PORT=5000
   SWAPI_BASE_URL=https://swapi.tech/api
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

The backend server will start running on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd starwar-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will start running on `http://localhost:5173`

## API Documentation

### Endpoints

#### Get Characters

- `GET /api/characters`
- Query Parameters:
  - `page`: Page number (default: 1)
  - `search`: Search term (optional)
- Returns: List of characters with pagination info

#### Get Character by ID

- `GET /api/characters/:id`
- Returns: Detailed information about a specific character

## Components

### Frontend Components

1. `CharacterCard.jsx`

   - Displays individual character cards
   - Props:
     - `character`: Character data object

2. `CharacterDetails.jsx`

   - Shows detailed information about a selected character
   - Props:
     - `id`: Character ID

3. `SearchBar.jsx`

   - Handles character search functionality
   - Props:
     - `onSearch`: Search callback function

4. `Pagination.jsx`
   - Manages page navigation
   - Props:
     - `currentPage`: Current page number
     - `totalPages`: Total number of pages
     - `onPageChange`: Page change callback

## QA/Test Plan

### 1. Unit Testing

- **Frontend Tests** (Using Jest/Vitest)

  - Component rendering tests (React Devtool)
  - Hook testing (useCharacters.js)
  - API service function tests
  - State management tests
  - Event handling tests
  - Remove unnecessary console logs to maintain a clean codebase.

- **Backend Tests** (Using Jest)
  - API endpoint tests
  - Controller function tests
  - Business logic tests
  - Error handling tests
  - Data validation tests

### 2. Integration Testing

- API integration tests
- Frontend-Backend integration

### 3. End-to-End Testing

- Confirm a smooth happy journey
- User flow testing
- Navigation
- Search functionality
- Pagination testing
- Character details view
- Loading states
- Error states

### 4. Performance Testing

- Load time
- API response times
- Image optimization, Lazy Loading
- Responsiveness
- Browser compatibility

### 5. Test Cases Priority

1. Important parts

   - Character list
   - Search functionality
   - Pagination
   - Character details view

2. Exception Handling

   - Empty search results
   - Invalid character IDs
   - Network errors
   - API failures

## Design Decisions & Rationale

### 1. Technology Choices

#### Why Vite + React?

- Faster development experience with Hot Module Replacement
- Better build performance compared to Create React App
- Modern tooling and optimizations out of the box
- Growing community and ecosystem

#### Why Tailwind CSS?

- Utility-first approach for faster UI development
- Reduced CSS bundle size
- Excellent responsive design capabilities

#### Why React Query?

- Efficient data fetching and caching
- Automatic background data refetching
- Built-in loading and error states

### 2. Architecture Decisions

#### Frontend Architecture

- Component-based architecture for reusability
- Custom hooks for business logic separation
- Centralized state management with React Query

### 3. UX Decisions

#### Pagination Implementation

- Server-side pagination to handle large datasets efficiently
- Limited items per page for better performance and visiblity
- Smooth loading

#### Search Implementation

- Debounced search to prevent unnecessary API calls (300ms)
- Clear search results

#### Loading States

- Skeleton loading for better user experience
- Fallback images if failed to load image.

### 4. Future Considerations

- Improve the caching strategy
- Supporting offline mode
