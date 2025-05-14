# Math Forum App

This is a simple forum web application built with React, TypeScript, Vite, and Tailwind CSS, designed to handle mathematical content using AsciiMath and LaTeX rendering via KaTeX.

## Current Progress

As of May 14, 2025, the core project structure is set up using Vite with TypeScript. Key libraries like React Router, TanStack Query, Zustand, KaTeX, and `asciimath-to-latex` are installed.

The application has the following features implemented:

-   **Project Structure:** Organized into `features`, `components`, `layouts`, `utils`, etc., for modularity and separation of concerns.
-   **Basic Routing:** Navigation between a Home page (listing posts) and individual Thread pages is set up using React Router.
-   **Mock API Integration:** Mock data for forum posts, threads, and replies is available and served with a simulated 0.5-second delay using TanStack Query for data fetching, loading, and error handling.
-   **Theming:** Basic theming is implemented using root CSS variables and applied via Tailwind CSS classes for a more appealing layout.
-   **Thread and Reply Display:** The Thread page fetches and displays the content of a specific thread and its associated replies.
-   **Text Editor Placeholder:** A basic `TextEditor` component with mode selection (Embed, Plain Text, LaTeX) and a textarea is present in the reply form area on the Thread page.
-   **Math Rendering Utility:** A helper function exists to parse content within backticks (`) as AsciiMath and convert it to LaTeX.
-   **Reusable Message Content Component:** A `MessageContent` component is implemented to render text, including executing the AsciiMath-to-LaTeX conversion for content within backticks and using KaTeX to display the resulting mathematical expressions.
-   **Placeholder Voting Buttons:** "Good" and "Bad" buttons are present on reply messages (logic not yet implemented).
-   **Placeholder Reply Submission:** A submit button is available for adding replies (logic not yet implemented).

## Expectations

At this stage, you can:

1.  Clone the repository.
2.  Install dependencies.
3.  Start the development server.
4.  View the Home page displaying a list of mock forum posts.
5.  Click on a post title to navigate to the Thread page.
6.  On the Thread page, view the mock thread content and replies, including the rendering of mathematical expressions wrapped in backticks.
7.  Interact with the mode selection and textarea in the reply form (input is captured but not submitted).
8.  Observe the basic styling and layout provided by Tailwind CSS and the theme variables.

## Usage

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd math-forum-app # Or the name of your project directory
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```

3.  **Create a `.env` file:**
    Copy the `.env.example` file and rename it to `.env` in the project root.
    ```bash
    cp .env.example .env
    ```
    Update the `VITE_API_URL` variable in `.env` if your backend is running elsewhere (currently using a mock URL internally).

4.  **Start the development server:**
    ```bash
    npm run dev
    # or yarn dev
    # or pnpm dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

5.  **Run tests (currently basic setup):**
    ```bash
    npm test
    # or yarn test
    # or pnpm test
    ```

## Next Steps (Planned)

-   Implement functionality for voting buttons using TanStack Query Mutations.
-   Implement reply submission using TanStack Query Mutations and update the UI upon success.
-   Enhance the `TextEditor` component with preview functionality for different modes (especially math).
-   Add pages/components for creating new posts.
-   Implement user authentication (login/signup - structure is in place in `features/auth`).
-   Connect to a real backend API.
-   Implement pagination or infinite scrolling for long lists of posts/replies.
-   Improve error handling and loading states.
-   Refine accessibility and responsiveness.
-   Write comprehensive unit and integration tests.
-   Set up CI/CD for automatic deployment (e.g., to GitHub Pages).