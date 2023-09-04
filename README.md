# Fika

Welcome to the Fika! This TypeScript Next.js application is designed to help restaurant owners and managers efficiently manage their food and drink menus digitally. Customers can easily access the menu by scanning a QR code, while administrators have access to all CRUD (Create, Read, Update, Delete) operations to maintain the menu items. This app is built upon the T3 Stack.

## Features

- **Digital Menu**: Customers can access the restaurant's menu by scanning a QR code, making it convenient and contactless.
- **User Authentication**: User authentication is implemented using Clerk for a secure and seamless login experience.
- **Administrator Role**: The application distinguishes between administrators and regular users. Only administrators have permission to perform CRUD operations.
- **Home Page**: The home page features a recommended section to highlight special dishes or drinks, enticing customers to explore further.
- **Drinks Page**: Customers can view the full list of drinks available at the restaurant.

# Tech Stack

## Frontend

- **TypeScript**: A statically typed superset of JavaScript.
- **Next.js**: A popular React framework for building server-rendered and static web applications.
- **UI and Styling**:
  - [@chakra-ui/react](https://github.com/chakra-ui/chakra-ui): A popular UI component library for React applications.
  - [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework.
- **Authentication**:
  - [@clerk/nextjs](https://www.clerk.dev/): A library for adding authentication to Next.js applications.
- **State Management and Data Fetching**:
  - [@tanstack/react-query](https://react-query.tanstack.com/): A library for managing and fetching data in React applications.
  - [@prisma/client](https://www.prisma.io/): Prisma client for database access.
- **Form Handling**:
  - [react-hook-form](https://react-hook-form.com/): A library for managing form state and validation in React applications.
- **Internationalization (i18n)**:
  - [i18next](https://www.i18next.com/): A library for internationalization in JavaScript applications.

## Development Tools

- [TypeScript](https://www.typescriptlang.org/): A statically typed superset of JavaScript.
