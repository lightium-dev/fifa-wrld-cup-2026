# FIFA World Cup 2026 RefTech Backend

API backend prototype for referee and match assignments using Node.js, Express, PostgreSQL, and Sequelize.

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure PostgreSQL in `.env`:
   ```bash
   DB_NAME=fifa-cup
   DB_USER=admin
   DB_PASSWORD=mysecretpassword
   DB_HOST=localhost
   DB_PORT=5433
   PORT=3000
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

## Endpoints

- `GET /arbitres`
- `GET /arbitres/search?q=UEFA`
- `GET /arbitres/:id`
- `GET /arbitres/:id/matchs`
- `POST /arbitres`
- `PUT /arbitres/:id`
- `DELETE /arbitres/:id`

- `GET /matchs`
- `GET /matchs?phase=finale`
- `GET /matchs?ville=Mexico`
- `GET /matchs/:id`
- `GET /matchs/:id/arbitres`
- `POST /matchs`
- `PUT /matchs/:id`
- `DELETE /matchs/:id`

- `GET /affectations`
- `GET /affectations/:id`
- `POST /affectations`
- `DELETE /affectations/:id`

## Features

- MVC architecture
- Sequelize models with associations and indexes
- Validation middleware for payloads
- Centralized error handling middleware
- Request logging middleware
- PostgreSQL sync on startup

