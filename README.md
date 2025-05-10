# Brinca Website

Brazil Canada Community Association Website

## Setup local development

Follow these steps to set up the project:

**Requirements**

- [Node.js 20+](https://nodejs.org/)
- [PNPM 10+](https://pnpm.io/)

1. **Clone the repository:**

   ```sh
   git clone https://github.com/marceloglacial/brinca-website.git
   cd brinca-website
   ```

2. **Install dependencies:**

   ```sh
   pnpm install
   ```

3. **Set up environment variables:**

   Use [dotenv.org](https://dotenv.org/) to manage your environment variables.

   Open the environment variables configuration:

   ```sh
   pnpm env:open
   ```

   Pull the latest environment variables:

   ```sh
   # Local development using brinca-api running
   pnpm env:pull

   # Use staging database
   pnpm env:pull-staging

   # Use prod database
   pnpm env:pull-prod

   ```

4. **Build the project:**

   ```sh
   pnpm build
   ```

5. **Run the development server:**

   ```sh
   pnpm dev
   ```

## Useful Scripts

- `pnpm lint`: Lint the codebase.
- `pnpm format`: Format the codebase.
- `pnpm env:open`: Open the environment variables configuration.
- `pnpm env:pull`: Pull the latest environment variables.
- `pnpm env:push`: Push your local environment variables.

## Stack

- [ESLint](https://eslint.org/)
- [Husky](https://typicode.github.io/husky/)
- [Next.js](https://nextjs.org/)
- [Prettier](https://prettier.io/)
- [React Server Components](https://react.dev/reference/rsc/server-components)
- [Tailwind CSS](https://tailwindcss.com/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
