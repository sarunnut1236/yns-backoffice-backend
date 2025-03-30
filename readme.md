# YNS Backoffice Backend

A backend service for camp management system built with Hexagonal Architecture using ExpressJS, TypeORM, JWT, and TypeScript.

## Architecture Overview

This project follows the Hexagonal Architecture (Ports and Adapters) pattern to create a maintainable and testable codebase with clear separation of concerns:

- **Core Domain**: Contains the business logic, entities, and business rules
- **Ports**: Defines interfaces for interacting with the domain
- **Adapters**: Implements the interfaces defined by the ports
  - Primary (Driving) Adapters: HTTP controllers, routes
  - Secondary (Driven) Adapters: Database repositories, external services

## Project Structure

```
src/
├── core/              # Domain layer (business logic)
│   ├── entity/        # Domain entities
│   ├── ports/         # Interface definitions
│   └── services/      # Business logic services
└── adapters/          # Implementation of ports
    ├── http/          # Primary adapters (controllers, routes)
    │   ├── controllers/
    │   ├── middleware/
    │   └── routes/
    ├── secondaryAdapter/ # Secondary adapters (repositories)
    └── database/      # Database configuration
```

## Features

- **Entity Management**:
  - Users: User creation, authentication, and management
  - Camps: Create, read, update, and delete camp information
  - Camp Days: Manage available days for each camp
  - Registrations: Handle user registrations for camps

- **Technical Features**:
  - Consistent error handling and logging
  - JWT authentication
  - TypeORM integration with PostgreSQL/MySQL
  - RESTful API endpoints

## Getting Started

### Prerequisites

- Node.js (v14+)
- A database (PostgreSQL, MySQL)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/yns-backoffice-backend.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the project root with the following variables:
   ```
    DATABASE_URL=your_database_url_here
    NODE_ENV=development
    JWT_SECRET=your_jwt_secret_here
    PORT=3000
DATABASE_URL_PROD=your_production_database_url_here
   ```

4. Run database migrations:
   ```
   npm run typeorm migration:run
   ```

5. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/liff/:liffUserId` - Get user by LIFF user ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `POST /api/users/login` - User login

### Camps
- `GET /api/camps` - Get all camps
- `GET /api/camps/:id` - Get camp by ID
- `POST /api/camps` - Create a new camp
- `PUT /api/camps/:id` - Update camp
- `DELETE /api/camps/:id` - Delete camp

### Camp Days
- `GET /api/camp-days` - Get all camp days
- `GET /api/camp-days/:id` - Get camp day by ID
- `GET /api/camp-days/camp/:campId` - Get camp days by camp ID
- `POST /api/camp-days` - Create a new camp day
- `PUT /api/camp-days/:id` - Update camp day
- `DELETE /api/camp-days/:id` - Delete camp day

### Registrations
- `GET /api/registrations` - Get all registrations
- `GET /api/registrations/:id` - Get registration by ID
- `POST /api/registrations` - Create a new registration
- `PUT /api/registrations/:id` - Update registration
- `DELETE /api/registrations/:id` - Delete registration

## Error Handling

The application uses consistent error handling across all services and controllers. Errors are captured, logged, and appropriate HTTP status codes are returned to the client.
