# PhoneStore - React Phone Shopping Application

A modern React application for browsing and purchasing mobile phones. Built with React 18, TypeScript, and Vite, featuring a responsive UI, comprehensive cart management, and extensive test coverage.

## Project Structure

```
src/
├── components/      # Reusable React components
├── pages/          # Page components (Home, Detail, Cart)
├── hooks/          # Custom React hooks (useApi, useCart, useDebounce)
├── context/        # React Context for global state management
├── services/       # API service layer
├── types/          # TypeScript type definitions
└── __tests__/      # Comprehensive test suite (Vitest)
```

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Testing**: Vitest with @testing-library/react
- **Styling**: CSS
- **State Management**: React Context API
- **Navigation**: React Router (implied by page structure)

## Getting Started

### Installation

```bash
npm install
```

## Running the Application

### Development Server

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Production Build

Build the application for production:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Testing

### Run All Unit Tests

Execute the complete test suite:

```bash
npm test
```

Or with the `--run` flag for CI/CD environments:

```bash
npm test -- --run
```

### Test Coverage Report

Generate a detailed test coverage report (HTML + JSON):

```bash
npm run test:coverage
```

Coverage report is generated in the `coverage/` directory. Open `coverage/index.html` in a browser to view the interactive report.

**Current Coverage Metrics:**
- Overall: 68.78%
- Components: 100%
- Services: 100%
- Hooks: 94.44%
- Context: 91.3%
- Pages: 47.05%

## Application Features

### Core Features

1. **Browse Phones**: 
   - View a comprehensive list of available phones
   - Search and filter phones by name and specifications
   - Real-time search with debouncing for performance

2. **Product Details**:
   - View detailed information about each phone
   - See related/similar phone recommendations
   - Add phones to shopping cart from detail page

3. **Shopping Cart**:
   - Add/remove phones from cart
   - View cart summary with total price
   - Persistent cart storage using localStorage
   - Cart persists across browser sessions

4. **Responsive Design**:
   - Mobile-friendly interface
   - Works seamlessly on desktop, tablet, and mobile devices

### Components

- **PhoneCard**: Displays individual phone with image, price, and quick actions
- **CartCard**: Shows phone details in cart with quantity and remove option
- **SimilarCard**: Recommendation card for related phones
- **Navbar**: Navigation bar with cart badge showing item count
- **Layout**: Main layout wrapper for consistent page structure

### Custom Hooks

- **useApi**: Handles API calls with proper error handling and request management
- **useCart**: Manages cart state and operations (add, remove, get items)
- **useDebounce**: Debounces search input to optimize API calls

## API Integration

The application integrates with a phone API service:
- Fetches product catalog
- Handles error states gracefully
- Supports filtering and searching
- Implements request headers and authentication

## Testing Strategy

The application includes comprehensive test coverage with:

- **Component Tests**: Full rendering and interaction testing for all UI components
- **Hook Tests**: Testing custom hooks in isolation with proper mocking
- **Service Tests**: API service mocking and request validation
- **Context Tests**: State management and context provider functionality
- **Page Tests**: Basic rendering and navigation flow testing

All tests use Vitest as the test runner with jsdom for DOM simulation and @testing-library/react for component testing utilities.

## Git Workflow

The repository uses standard git practices:
- Generated files (coverage/, test_*.txt) are excluded via .gitignore
- Source code is organized in src/ directory
- Tests are collocated in __tests__/ directory

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests in watch mode |
| `npm test -- --run` | Run tests once (CI mode) |
| `npm run test:coverage` | Generate coverage report |
| `npm run lint` | Run ESLint |
