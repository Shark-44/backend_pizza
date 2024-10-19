# Pizza Backend Node.js Project

## Description
This project is a backend built with Node.js and Express. It uses MySQL for the database and is configured with ESLint, Prettier, and Nodemon for development.

## Prerequisites
- **Node.js** and **npm** installed on your machine.
- A **MySQL** database.

## Installation Steps
1. **Clone the project**:
   ```bash
   git clone https://github.com/Shark-44/backend_pizza
   cd backend_pizza
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a .env file at the root of the project and add the necessary variables. Example:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=database_name
   ```

## npm Scripts
Here are the different commands you can use to manage the project.

### Starting the Server
- **In development mode** (with automatic reloading of changes):
  ```bash
  npm run dev
  ```
- **In production mode**:
  ```bash
  npm start
  ```

## Linting & Formatting
- **Check code for style errors**:
  ```bash
  npm run lint
  ```
- **Automatically fix style errors**:
  ```bash
  npm run fix
  ```

## Database Migration
- **Run migrations** (if a migrate.js file exists to handle migrations):
  ```bash
  npm run migrate
  ```

## Project Structure
- `index.js`: Main file where the Express application starts.
- `.env`: Environment variables for project configuration.
- `node_modules/`: Directory containing project dependencies.
- `package.json`: File listing dependencies and npm scripts.

## Usage
After starting the server, access http://localhost:4242 to see the application in action.