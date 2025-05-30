import { useEffect } from "react"; // Import useEffect
import { Route, Routes, useLocation } from "react-router-dom";
import useAuthStore from "./features/auth/hooks/use-auth-store.hook";
import { mockUsers } from "./features/forum/api/mock-data.service"; // Import mock users for auto sign-in
import HomePage from "./features/forum/pages/home.component";
import SearchPage from "./features/forum/pages/search.component"; // Import SearchPage
import SignInPage from "./features/forum/pages/sign-in.component";
import SignUpPage from "./features/forum/pages/sign-up.component"; // Import SignUpPage
import ThreadPage from "./features/forum/pages/thread.component";
import NewPostPage from "./features/forum/pages/new-post.component"; // Import NewPostPage
import DocumentationPage from "./features/forum/pages/documentation.component"; // Import DocumentationPage
import Header from "./layouts/header.component";
import { IS_DEVELOPMENT } from "./config/app-config.constant"; // Import development flag

function App() {
  const { signIn } = useAuthStore(); // Get signIn function from the store
  const location = useLocation();

  // Auto sign in a mock user on app load in development
  useEffect(() => {
    if (IS_DEVELOPMENT) {
      // Attempt to sign in the first mock user
      const defaultUser = mockUsers[0];
      if (defaultUser) {
        // In a real app, you'd check for a token/cookie here
        // For now, we just simulate a successful sign-in with the mock user
        signIn(defaultUser); // Use the store's signIn action
        console.log(
          `Auto signed in as ${defaultUser.username} (development mode)`
        );
      }
    }
  }, [signIn]); // Dependency array includes signIn to avoid lint warnings

  // Check if current route is docs to apply different layout
  const isDocsPage = location.pathname === "/docs";

  return (
    <div className="App">
      <Header />
      {/* Add padding-top to the main content area to clear the fixed header */}
      {/* Apply max-width and centering to the main content area, except for docs page */}
      <main className={`${isDocsPage ? "" : "container mx-auto"} p-[var(--spacing-md)] md:p-[var(--spacing-lg)] pt-[var(--spacing-header-padding-top)]`}>
        {/* Apply a specific max-width and center the content for non-docs pages */}
        <div className={`${isDocsPage ? "" : "max-w-[900px] mx-auto"}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/thread/:threadId" element={<ThreadPage />} />
            <Route path="/signin" element={<SignInPage />} />{" "}
            {/* Add route for Sign In page */}
            <Route path="/signup" element={<SignUpPage />} />{" "}
            {/* Add route for Sign Up page */}
            <Route path="/search" element={<SearchPage />} />{" "}
            {/* Add route for Search page */}
            <Route path="/new-post" element={<NewPostPage />} />{" "}
            {/* Add route for New Post page */}
            <Route path="/docs" element={<DocumentationPage />} />{" "}
            {/* Add route for Documentation page */}
            {/* Add a 404 page later */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </div>
      </main>
      {/* Add Footer here later if needed */}
    </div>
  );
}

export default App;
