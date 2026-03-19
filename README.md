# 🛒 React E-Commerce Storefront

A fully responsive, production-ready e-commerce storefront built with React. This project demonstrates advanced frontend architecture, including multi-layered state management, robust form validation, and full internationalization (i18n) with Right-to-Left (RTL) layout support.

## 🚀 Live Demos

- **Cloudflare Pages:** [Insert your Cloudflare URL here]
- **GitHub Pages:** [Insert your GitHub Pages URL here]

> Note: This project utilizes a dual-deployment CI/CD pipeline. Both links serve the exact same code, automatically deployed via GitHub Actions and Cloudflare Git integrations.

## ✨ Key Features

- **Multi-Tool State Management:**
  - **Redux Toolkit:** Manages complex, scalable data (The Shopping Cart).
  - **Zustand:** Handles lightweight, global UI state (Light/Dark Mode toggle).
- **Internationalization (i18n):** Full English and Arabic localization using `react-i18next`, including dynamic layout flipping (RTL) and translated URL parameters.
- **Robust Authentication UI:** Login form built with `react-hook-form` and secured with `zod` schema validation.
- **Protected Routing:** Custom wrapper components using React Router v7 to prevent unauthenticated access to the checkout/cart flow.
- **Advanced UI/UX:**
  - Styled with **Tailwind CSS v4** and **Shadcn UI**.
  - Dynamic, translated skeleton loaders for smooth data-fetching transitions.
  - Real-time search filtering and categorized browsing.
- **Data Fetching:** Integrates with the public Platzi Fake Store API, utilizing optional chaining and pagination to handle unpredictable data.

## 🛠️ Tech Stack

| Category | Tools |
|---|---|
| **Core** | React 19, Vite, React Router v7 |
| **Styling** | Tailwind CSS, Shadcn UI, Lucide React |
| **State** | Redux Toolkit, Zustand, Context API |
| **Forms & Validation** | React Hook Form, Zod |
| **Localization** | i18next, react-i18next |
| **Deployment** | GitHub Actions (gh-pages), Cloudflare Pages |

## 🚦 Getting Started

To run this project locally on your machine:

1. **Clone the repository:**
```bash
   git clone https://github.com/your-username/react-ecommerce.git
   cd react-ecommerce
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Start the development server:**
```bash
   npm run dev
```

4. **Open your browser:** Navigate to `http://localhost:5173`