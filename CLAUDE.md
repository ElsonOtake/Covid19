# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
React SPA displaying COVID-19 statistics for South American countries using WHO data. Built with React 18, Redux Toolkit, and Recharts for data visualization.

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Run development server (port 3000)
npm start

# Build production bundle
npm run build

# Run all tests
npm test

# Run a specific test file
npm test -- Article.test.js

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watchAll
```

### Code Quality
No dedicated lint/typecheck commands in package.json. ESLint and Stylelint are configured but must be run manually:
```bash
# Run ESLint
npx eslint . --ext .js,.jsx

# Run Stylelint
npx stylelint "**/*.css"
```

## Architecture Overview

### State Management Pattern
The app uses Redux Toolkit with a traditional slice pattern (not RTK Query):

1. **Store Configuration** (`src/redux/configureStore.js`): Combines two main reducers
2. **Home Slice** (`src/redux/Home/Home.js`): Manages dashboard state with async thunk for API calls
3. **Details Slice** (`src/redux/Details/Details.js`): Manages individual country data

Key pattern: Each slice has its own axios function for API calls (`axiosGetWHO.js`, `axiosGetDetails.js`)

### Component Structure
- **Route Components**: `Home.js` and `Details.js` serve as page containers
- **Presentation Components**: `Article.js` (country card), `Header.js` (navigation)
- **Chart Components**: `LineCountry.js` and `PieCountry.js` in `src/charts/`
- All components use functional style with hooks and PropTypes validation

### API Integration
- Base endpoint: `https://corona-api.com/countries`
- Client-side filtering for 13 South American countries (AR, BO, BR, CL, CO, EC, GF, GY, PE, PY, SR, UY, VE)
- Data transformation happens in Redux slices before storing

### Routing Structure
```javascript
// Two main routes defined in App.js
'/' → Home component (dashboard)
'/details/:code' → Details component (country-specific page)
```

### Testing Approach
- Tests located in `src/__tests__/` directory
- Snapshot testing for UI components
- Mock Redux store for connected components
- Transform configuration for Recharts: `--transformIgnorePatterns "node_modules/(?!recharts)/"`

## Key Implementation Details

### Country Data Handling
- Country codes are hardcoded in `src/redux/Global.js`
- Each country has a corresponding image in `src/images/[COUNTRY_CODE].png`
- Images are imported statically in components, not loaded dynamically

### Chart Implementation
- Uses Recharts library for visualizations
- `LineCountry.js`: Timeline data (confirmed, deaths, recovered)
- `PieCountry.js`: Proportional data display
- Data passed as props from Details component

### Styling Approach
- Single global CSS file (`src/index.css` - 240 lines)
- No CSS modules or styled-components
- Mobile-first responsive design
- Color scheme uses CSS custom properties

## Important Constraints

1. **South America Only**: The app filters for exactly 13 countries - modifications should maintain this constraint
2. **Static Images**: Country images must be imported explicitly, not loaded dynamically
3. **Redux Pattern**: Maintain the existing slice/thunk pattern rather than migrating to RTK Query
4. **PropTypes**: All components require PropTypes definitions
5. **No TypeScript**: Project uses PropTypes for type checking instead

## Common Tasks

### Adding a New Feature to a Country
1. Update the Redux slice in `src/redux/Details/Details.js`
2. Modify the API call in `src/redux/Details/axiosGetDetails.js` if needed
3. Update the Details component to display new data
4. Add PropTypes for any new props
5. Update relevant tests and snapshots

### Modifying Charts
1. Edit chart components in `src/charts/` directory
2. Recharts configuration is inline - modify ResponsiveContainer, Line/Pie components
3. Test with: `npm test -- --transformIgnorePatterns "node_modules/(?!recharts)/"`

### Working with API Data
1. API responses are transformed in Redux slices before storage
2. Check `src/redux/Home/axiosGetWHO.js` for data structure
3. Country filtering happens in the axios functions, not in components