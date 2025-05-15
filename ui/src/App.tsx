import { useEffect } from "react"; // Import useEffect
import { Route, Routes } from "react-router-dom";
import useAuthStore from "./features/auth/hooks/useAuthStore";
import { mockUsers } from "./features/forum/api/mockData"; // Import mock users for auto sign-in
import HomePage from "./features/forum/pages/HomePage";
import SearchPage from "./features/forum/pages/SearchPage"; // Import SearchPage
import SignInPage from "./features/forum/pages/SignInPage";
import SignUpPage from "./features/forum/pages/SignUpPage"; // Import SignUpPage
import ThreadPage from "./features/forum/pages/ThreadPage";
import Header from "./layouts/Header";

function App() {
  const { signIn } = useAuthStore(); // Get signIn function from the store

  // Auto sign in a mock user on app load
  useEffect(() => {
    // Attempt to sign in the first mock user
    const defaultUser = mockUsers[0];
    if (defaultUser) {
      // In a real app, you'd check for a token/cookie here
      // For now, we just simulate a successful sign-in with the mock user
      signIn(defaultUser); // Use the store's signIn action
      console.log(`Auto signed in as ${defaultUser.username}`);
    }
  }, [signIn]); // Dependency array includes signIn to avoid lint warnings

  return (
    <div className="App">
      <Header />
      {/* Add padding-top to the main content area to clear the fixed header */}
      {/* Apply max-width and centering to the main content area */}
      <main className="container mx-auto p-[var(--spacing-md)] md:p-[var(--spacing-lg)] pt-[var(--spacing-header-padding-top)]">
        {/* Apply a specific max-width and center the content */}
        <div className="max-w-[600px] mx-auto">
          {" "}
          {/* Use arbitrary value for 600px */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/thread/:threadId" element={<ThreadPage />} />
            <Route path="/signin" element={<SignInPage />} />{" "}
            {/* Add route for Sign In page */}
            <Route path="/signup" element={<SignUpPage />} />{" "}
            {/* Add route for Sign Up page */}
            <Route path="/search" element={<SearchPage />} />{" "}
            {/* Add route for Search page */}
            {/* Add a route for creating a new post later */}
            {/* <Route path="/new-post" element={<NewPostPage />} /> */}
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
