# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# React E-Commerce App

Modern React + TypeScript application using:

- Feature-based architecture
- Zustand state management
- Custom Form System
- Custom Validation System
- Custom Fetch Hook
- React Router
- MSW Mock API

This project focuses on scalable frontend architecture, reusable abstractions, clean separation of concerns, and type-safe development.

---

# Tech Stack

- React
- TypeScript
- React Router DOM
- Zustand
- MSW
- Fetch API
- CSS Modules
- pnpm

---

# Project Structure

```txt
src
│
├── api
│   ├── api.ts
│   ├── types.ts
│   └── useFetch.ts
│
├── assets
│
├── components
│
├── core
│   ├── Form
│   └── validator
│
├── features
│   ├── auth
│   ├── cart
│   ├── home
│   └── product
│
├── layout
│   ├── 404
│   ├── Footer
│   ├── Header
│   └── AppLayout.tsx
│
├── mocks
│
├── App.tsx
└── main.tsx
```

---

# Architecture

Project uses feature-based architecture.

Each feature owns:

- UI
- business logic
- hooks
- state
- types
- services

Benefits:

- scalable
- maintainable
- isolated domains
- reusable modules
- easier refactoring
- better separation of concerns

---

# API Layer

Located in:

```txt
/api
```

Contains reusable API logic and async handling.

---

## api.ts

Reusable HTTP wrapper.

Responsibilities:

- centralized request handling
- reusable HTTP methods
- error normalization
- response handling

Example:

```ts
api.get()
api.post()
api.put()
api.delete()
```

---

## types.ts

Shared API response types.

### ApiResponse

```ts
export type ApiResponse<T> = {
  data: T;
};
```

Example:

```ts
type UserResponse = ApiResponse<User>;
```

Response:

```json
{
  "data": {
    "id": 1,
    "name": "John"
  }
}
```

---

### PaginatedResponse

```ts
export type PaginatedResponse<T> = {
  data: T[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
```

Used for:

- product list
- pagination
- infinite scroll
- tables

Example:

```ts
type ProductListResponse =
  PaginatedResponse<Product>;
```

Response:

```json
{
  "data": [
    {
      "id": 1,
      "title": "Product A"
    }
  ],

  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

---

### ApiErrorResponse

```ts
export type ApiErrorResponse = {
  status: number;
  message: string;
  code: string;
};
```

Example:

```json
{
  "status": 401,
  "message": "Unauthorized",
  "code": "AUTH_REQUIRED"
}
```

---

## Why Shared API Types

Benefits:

- consistent API structure
- reusable contracts
- type-safe responses
- predictable backend integration
- centralized error handling

---

## Example API Usage

```ts
const response =
  await api.get<
    PaginatedResponse<Product>
  >("/products");

console.log(response.data);

console.log(
  response.pagination.totalPages
);
```

---

# useFetch Hook

Reusable async fetching hook.

Located in:

```txt
/api/useFetch.ts
```

Features:

- loading state
- error state
- dependency re-fetch
- request cancellation
- reusable async logic

---

## useFetch Example

```tsx
const { loading, data } = useFetch(
  (signal) =>
    productService.findAll(
      page,
      limit,
      signal
    ),
  [page, limit]
);
```

---

## Request Cancellation

Supports `AbortController`.

Example:

```ts
(signal) =>
  productService.findAll(
    page,
    limit,
    signal
  )
```

Benefits:

- cancels previous requests
- prevents race conditions
- avoids memory leaks
- safer async handling

Useful for:

- pagination
- filtering
- searching
- component unmount

---

## Re-fetch Flow

```txt
Dependency Change
→ Abort Previous Request
→ Start New Request
→ Loading State
→ Response
→ UI Update
```

---

# Core Systems

Located in:

```txt
/core
```

Contains reusable application systems.

---

# Custom Form System

Located in:

```txt
/core/Form
```

Inspired by React Hook Form.

Features:

- generic typing
- reusable field components
- form context
- centralized validation
- type-safe form values
- reusable submit handling

---

## Form Example

```tsx
type FormData = {
  email: string;
  password: string;
};

const initialForm: FormData = {
  email: "",
  password: "",
};

const validator = new Validator({
  email: [
    isRequired(
      "Email must not be empty"
    ),
    isEmail(),
  ],

  password: [
    isRequired(
      "Password must not be empty"
    ),
  ],
});

<Form<FormData>
  className={styles.form}
  initialState={initialForm}
  validator={validator}
  onSubmit={(values) =>
    handleLogin(values)
  }
>
  <TextField
    type="email"
    name="email"
    placeholder="Email"
    className={styles.input}
  />

  <TextField
    type="password"
    name="password"
    placeholder="Password"
    className={styles.input}
  />

  <SubmitButton
    className={styles.button}
  >
    Sign in
  </SubmitButton>
</Form>
```

---

## Why Generic Form Types

```tsx
<Form<FormData>>
```

Benefits:

- autocomplete field names
- type-safe form values
- type-safe submit handlers
- prevents invalid field access

Example:

```ts
name="email" // valid
name="username" // TypeScript error
```

---

# Validation System

Located in:

```txt
/core/validator
```

Validation logic is separated from UI.

---

## Validator Example

```ts
const validator = new Validator({
  email: [
    isRequired(),
    isEmail(),
  ],
});
```

---

## Example Validators

```ts
isRequired()
isEmail()
minLength()
maxLength()
pattern()
match()
```

---

## Validation Flow

```txt
Field Change
→ Form State Update
→ Validator Execute
→ Error State Update
→ UI Re-render
```

---

# Features

Business domains are separated into independent modules.

Located in:

```txt
/features
```

Each feature contains:

- UI
- hooks
- services
- types
- business logic
- state

---

## auth

Authentication feature.

Contains:

- login page
- auth validation
- auth API
- auth store
- authentication logic

---

## cart

Cart feature.

Contains:

- add/remove item
- quantity update
- total calculation
- cart persistence

Usually powered by Zustand.

---

## home

Homepage feature.

Contains:

- banners
- sections
- featured products

---

## product

Product domain.

Contains:

- product list
- product detail
- product API
- product types

---

# Layout

Located in:

```txt
/layout
```

Contains:

- Header
- Footer
- 404 Page
- AppLayout

Example:

```tsx
<AppLayout>
  <Outlet />
</AppLayout>
```

---

# Routing

Using React Router.

Example:

```tsx
<Routes>
  <Route element={<AppLayout />}>
    <Route
      path="/"
      element={<HomePage />}
    />

    <Route
      path="/products/:id"
      element={
        <ProductDetailPage />
      }
    />

    <Route
      path="/cart"
      element={<CartPage />}
    />

    <Route
      path="/login"
      element={<LoginPage />}
    />
  </Route>
</Routes>
```

---

## Nested Routing

```tsx
<Route element={<AppLayout />}>
```

Shared layout wrapper.

Rendered through:

```tsx
<Outlet />
```

Useful for:

- shared layouts
- header
- footer
- navigation

---

## Dynamic Routes

```tsx
/products/:id
```

Access params:

```tsx
const { id } = useParams();
```

---

# State Management

Using Zustand.

---

## Zustand Example

```ts
export const useCartStore =
  create<CartStore>()(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => ({
          items: [
            ...state.items,
            product,
          ],
        }));
      },

      totalPrice: () => {
        return get().items.reduce(
          (total, item) =>
            total +
            item.price *
              item.quantity,
          0
        );
      },
    })
  );
```

---

## Why Zustand

Advantages:

- simple API
- minimal boilerplate
- no provider required
- performant selectors
- easier than Redux

---

## Selector Optimization

Avoid:

```ts
const store = useCartStore();
```

Prefer:

```ts
const items = useCartStore(
  (state) => state.items
);
```

Benefits:

- reduces unnecessary re-renders
- subscribes only to required state
- improves performance

---

# Mock API

Using MSW.

Located in:

```txt
/mocks
```

Purpose:

- mock backend APIs
- frontend development without backend
- testing
- simulate real API flow

---

## MSW Example

```ts
http.get("/api/products", () => {
  return HttpResponse.json(
    products
  );
});
```

---

# Reusable Components

Shared UI components belong in:

```txt
/components
```

Examples:

- Button
- Card
- Modal
- Spinner
- Loader

Feature-specific components should remain inside feature folders.

---

# Error Handling

Example:

```ts
try {
  const data =
    await api.get("/products");
} catch (error) {
  console.error(error);
}
```

Can centralize:

- API errors
- response normalization
- toast notifications

---

# Setup

## Install Dependencies

```bash
pnpm install
```

---

## Run Development Server

```bash
pnpm dev
```

---

## Build Project

```bash
pnpm build
```

---

## Preview Production Build

```bash
pnpm preview
```

---

# Package Manager

Project uses `pnpm`.

Benefits:

- faster installs
- disk space optimization
- shared package store
- stricter dependency resolution

---

## Install pnpm

Using npm:

```bash
npm install -g pnpm
```

Or using Corepack:

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

---

# MSW Setup

Example:

```ts
worker.start();
```

Usually initialized in:

```txt
main.tsx
```

---

# Recommended Practices

- keep business logic inside features
- colocate related logic
- reuse validators
- avoid unnecessary global state
- use Zustand selectors
- separate UI from business logic
- keep components small
- prefer reusable abstractions

---

# Suggested Future Improvements

Possible additions:

- TanStack Query
- React Hook Form
- Zod
- protected routes
- dark mode
- pagination
- unit testing
- E2E testing
- async validation
- optimistic updates
- field arrays
- form reset

---

# Example Application Flow

```txt
UI
→ Feature Logic
→ API Layer
→ MSW Mock
→ Response
→ Zustand Store
→ UI Update
```

---

# Learning Goals

This project demonstrates:

- scalable React architecture
- reusable form systems
- reusable validation systems
- feature modularization
- routing architecture
- Zustand patterns
- async handling patterns
- mock API workflows
- reusable component patterns
- TypeScript utility usage
```