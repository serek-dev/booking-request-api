FROM node:18 as base

# Build base layer with all dependencies including --dev
WORKDIR /app
COPY . .
RUN npm install

# Development environment with mocked data and --watch mode
FROM base as dev
RUN npm install -g @nestjs/cli
WORKDIR /app
CMD ["npm", "run", "start:debug"]
EXPOSE 3000

# Run unit tests using jest
FROM dev as tests_unit
ENV CI=true
CMD ["npm", "run", "test"]

# Run e2e tests using jest
FROM dev as tests_e2e
CMD ["npm", "run", "test:e2e"]

# Run static analysis
FROM dev as linting
CMD ["npm", "run", "lint:ci"]

# Builds and serves production
FROM node:18 as web_production
COPY --from=base /app /app
WORKDIR /app
RUN npm run build
CMD ["npm", "run", "start:prod"]
EXPOSE 3000
