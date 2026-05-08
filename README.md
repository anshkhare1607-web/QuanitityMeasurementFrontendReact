# Quantity Measurement App - React Frontend

A modern React application for performing quantity measurements, conversions, and comparisons across multiple measurement categories. This frontend provides an intuitive interface for users to work with different units of measurement including length, weight, temperature, and volume.

## Overview

The Quantity Measurement App is a React-based frontend that connects to a backend API to perform unit conversions, value comparisons, and arithmetic operations on measurements. The application features a clean, organized interface with category-based navigation and a calculation history tracker.

## Features

- Unit Conversion: Convert between different units within the same measurement category
- Value Comparison: Compare two measurements to determine their relationship
- Arithmetic Operations: Perform calculations (addition, subtraction, multiplication, division) with measurements
- Multi-Category Support: Switch between different measurement types including Length, Weight, Temperature, and Volume
- Calculation History: View and track all previous calculations and conversions
- Dynamic Unit Loading: Units are fetched from the backend API on application startup
- Responsive Design: Clean, modern user interface built with SCSS

## Tech Stack

- React 19.2.4 - UI framework
- Vite 8.0.4 - Build tool and development server
- React DOM 19.2.4 - DOM rendering
- SCSS - Styling
- ESLint - Code linting and quality
- Node.js and npm - Package management

## Project Structure

```
quantity-measurement-app/
├── src/
│   ├── components/
│   │   ├── ArithmeticCard.jsx      - Arithmetic operations component
│   │   ├── Card.scss               - Card styling
│   │   ├── ComparisonCard.jsx      - Value comparison component
│   │   ├── ConversionCard.jsx      - Unit conversion component
│   │   ├── HistoryView.jsx         - Calculation history display
│   │   ├── HistoryView.scss        - History styling
│   │   ├── SideBar.jsx             - Navigation sidebar
│   │   └── SideBar.scss            - Sidebar styling
│   ├── context/
│   │   └── MeasurementContext.jsx  - Global state management
│   ├── App.jsx                     - Main application component
│   ├── App.scss                    - App styling
│   ├── main.jsx                    - Entry point
│   └── index.css                   - Global styles
├── public/                         - Static assets
├── index.html                      - HTML template
├── vite.config.js                 - Vite configuration
├── eslint.config.js               - ESLint configuration
└── package.json                   - Dependencies and scripts
```

## Components

**SideBar**: Main navigation component that displays all available measurement categories. Users can switch between categories and toggle between the tools view and history view.

**ConversionCard**: Allows users to convert values from one unit to another within the same measurement category. Features input for value, from-unit selection, to-unit selection, and displays the converted result.

**ComparisonCard**: Enables comparison of two measurements to determine their relationship. Takes two values with their respective units and returns a comparison result (equal to, greater than, less than).

**ArithmeticCard**: Supports arithmetic operations on measurements including addition, subtraction, multiplication, and division. Users select two values with units, choose an operation, and receive the calculated result.

**HistoryView**: Displays a log of all previous calculations, conversions, and comparisons performed in the session.

## State Management

The application uses React Context API through MeasurementContext for global state management. The context manages:

- unitMap: Mapping of all available measurement categories and their units
- unitType: Currently selected measurement category
- units: Array of units for the currently selected category
- view: Toggle between TOOLS view (calculation cards) and HISTORY view
- allCategories: List of all available measurement categories



## API Integration

The application connects to a backend API running on `http://localhost:8080`. The following endpoints are used:

- GET `/api/quantity/units` - Fetch all available measurement categories and their units
- POST `/api/quantity/convert` - Convert a value from one unit to another
- POST `/api/quantity/compare` - Compare two measurements
- POST `/api/quantity/calculate` - Perform arithmetic operations on measurements


## Getting Started

1. Ensure the backend API is running on `http://localhost:8080`
2. Install dependencies: `npm install && cd quantity-measurement-app && npm install`
3. Start development server: `npm run dev`
4. Open browser to the displayed URL
5. Select a measurement category from the sidebar
6. Use the cards to perform conversions, comparisons, or calculations
7. Switch to History view to see previous calculations