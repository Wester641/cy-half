# EasyFleet Test Suite

## Overview
This repository contains automated tests for the EasyFleet management system using Cypress. The test suite covers various aspects of fleet management functionality, including unit management and filtering capabilities.

## Prerequisites
- Node.js (latest LTS version recommended)
- npm (Node Package Manager)
- Modern web browser (Chrome recommended)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd EasyFleetTest
```

2. Install dependencies:
```bash
npm install
```

## Project Structure
```
EasyFleetTest/
├── cypress/
│   ├── e2e/                    # Test specifications
│   │   └── general-management/
│   │       └── units/         # Unit management related tests
│   ├── fixtures/              # Test data
│   ├── support/               # Support files and commands
│   └── plugins/               # Cypress plugins
└── README.md
```

## Running Tests

### Open Cypress Test Runner
```bash
npx cypress open
```

### Run Tests Headlessly
```bash
npx cypress run
```

### Run Specific Test File
```bash
npx cypress run --spec "cypress/e2e/general-management/units/**/*"
```

## Test Categories

### Unit Management Tests
- Filter functionality
- Unit creation and modification
- Data validation
- Search capabilities

## Best Practices
- Each test file follows the AAA pattern (Arrange, Act, Assert)
- Tests are independent and can run in isolation
- Meaningful test descriptions using proper naming conventions
- Proper use of beforeEach and afterEach hooks for test setup and cleanup

## Contributing
1. Create a new branch for your feature
2. Write or update tests
3. Ensure all tests pass
4. Submit a pull request

## Troubleshooting
If you encounter any issues:
1. Make sure all dependencies are installed
2. Clear Cypress cache: `npx cypress cache clear`
3. Delete node_modules and reinstall dependencies
4. Check for any browser console errors

## Support
For any questions or issues, please create an issue in the repository.
