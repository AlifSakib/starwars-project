# Star Wars Character Explorer

An application that allows users to explore Star Wars characters. Built with React (Vite) for the frontend and Node.js for the backend.

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
