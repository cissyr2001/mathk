// src/App.tsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./features/forum/pages/HomePage";
import ThreadPage from "./features/forum/pages/ThreadPage";
import Header from "./layouts/Header";
import { useEffect } from "react"; // Import useEffect
import { mockUsers } from "./features/forum/api/mockData"; // Import mock users for auto sign-in
import useAuthStore from "./features/auth/hooks/useAuthStore";
import SignInPage from "./features/forum/pages/SignInPage";

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
      {/* Add horizontal padding to the main content area */}
      <main className="container mx-auto p-[var(--spacing-md)] md:p-[var(--spacing-lg)]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/thread/:threadId" element={<ThreadPage />} />
          <Route path="/signin" element={<SignInPage />} />{" "}
          {/* Add route for Sign In page */}
          {/* Add a route for creating a new post later */}
          {/* <Route path="/new-post" element={<NewPostPage />} /> */}
          {/* Add a 404 page later */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </main>
      {/* Add Footer here later if needed */}
    </div>
  );
}

export default App;
