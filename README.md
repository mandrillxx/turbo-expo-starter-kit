# 🚀 Full-Stack Turborepo Starter

A modern, feature-rich monorepo starter template built with Turborepo, combining a React Native mobile app with a type-safe backend.

## ✨ Features

- 📱 **Mobile App** - React Native with Expo SDK 52
- 🔒 **Authentication** - Secure auth flow using Better-Auth
- 🎯 **Type Safety** - End-to-end typesafe APIs with tRPC
- 📦 **Database** - Type-safe ORM with Drizzle
- 🎨 **UI Components** - Shared UI library for consistent design
- 🚄 **Fast API** - Lightweight Hono server
- ⚡️ **Performance** - Turborepo for optimal build performance

## 📦 What's Inside?

### Apps

- `mobile`: React Native app built with Expo
- `api`: Backend API server using Hono

### Packages

- `@repo/auth`: Authentication utilities and hooks
- `@repo/db`: Database schema and Drizzle ORM setup
- `@repo/trpc`: tRPC router definitions and procedures
- `@repo/ui`: Shared React Native components
- `@repo/eslint-config`: Shared ESLint configurations
- `@repo/typescript-config`: Shared TypeScript configurations

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/username/your-repo-name.git
cd your-repo-name
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up your environment variables:

```bash
cp .env.example .env
```

4. Start the development servers:

```bash
# Start all applications
pnpm dev
```

## 📱 Mobile Development

The mobile app is built with Expo. To run it:

1. Install Expo Go on your device
2. Start the mobile app:

```bash
pnpm dev
```
3. Scan the QR code with Expo Go (Android) or Camera app (iOS)

## 🛠 Development Tools

This Turborepo includes:

- 🔍 **TypeScript** for static type checking
- 📝 **ESLint** for code linting
- 💅 **Prettier** for code formatting
- 🧪 **Testing Library** for component testing
- 📱 **Expo** for mobile development
- 🔄 **tRPC** for type-safe APIs

## 📚 Useful Commands

```bash
# Build all applications and packages
pnpm build

# Run development servers
pnpm dev

# Lint all projects
pnpm lint

# Run tests
pnpm test

# Clean all builds
pnpm clean
```

## 🏗 Project Structure

```
.
├── apps
│   ├── mobile          # React Native mobile app
│   └── api             # Hono API server
├── packages
│   ├── auth           # Authentication package
│   ├── db             # Database package
│   ├── trpc           # tRPC package
│   └── ui             # Shared UI components
└── package.json
```

## 🔐 Authentication

This template uses Better-Auth for secure authentication, supporting:

- 🔑 Email/Password authentication
- 🌐 OAuth providers (Google, GitHub, etc.)
- 📱 Mobile-specific auth flows
- 🔒 Secure session management

## 📖 Documentation

For more detailed documentation:

- [Mobile App](./apps/mobile/README.md)
- [API Server](./apps/api/README.md)
- [Authentication](./packages/auth/README.md)
- [Database](./packages/db/README.md)

## 📝 License

MIT

---

Built with ❤️ using [Turborepo](https://turbo.build/repo)
