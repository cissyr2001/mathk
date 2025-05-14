import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import useAuthStore from "../../auth/hooks/useAuthStore";
import { signInMock } from "../../auth/api/authApi";

const SignInPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const { signIn } = useAuthStore(); // Get the signIn action from the store
  const navigate = useNavigate(); // Hook for navigation

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError(null); // Clear previous errors
    setIsSigningIn(true); // Set loading state

    // Call the mock sign-in API
    const user = await signInMock(username, password);

    setIsSigningIn(false); // Clear loading state

    if (user) {
      // If sign-in is successful, update the Zustand store
      signIn(user);
      console.log("Signed in successfully:", user);
      // Redirect to the homepage or a dashboard
      navigate("/");
    } else {
      // If sign-in fails, show an error message
      setSignInError("Invalid username or password.");
      console.log("Sign in failed.");
    }
  };

  return (
    <div className="flex justify-center items-center p-[var(--spacing-lg)]">
      <div className="bg-[color:var(--color-surface)] rounded-[var(--border-radius-md)] shadow-md p-[var(--spacing-lg)] w-full max-w-sm border border-[color:var(--color-border)]">
        <h1 className="text-2xl font-bold mb-[var(--spacing-lg)] text-center">
          Sign In
        </h1>
        <form onSubmit={handleSignIn}>
          <div className="mb-[var(--spacing-md)]">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-[color:var(--color-text-primary)] mb-[var(--spacing-xs)]"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow-sm focus:ring-[color:var(--color-primary)] focus:border-[color:var(--color-primary)] block w-full sm:text-sm border-gray-300 rounded-[var(--border-radius-md)] p-2"
              required
            />
          </div>
          <div className="mb-[var(--spacing-lg)]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[color:var(--color-text-primary)] mb-[var(--spacing-xs)]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-sm focus:ring-[color:var(--color-primary)] focus:border-[color:var(--color-primary)] block w-full sm:text-sm border-gray-300 rounded-[var(--border-radius-md)] p-2"
              required
            />
          </div>

          {signInError && (
            <p className="text-[color:var(--color-danger)] text-sm mb-[var(--spacing-md)]">
              {signInError}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[color:var(--color-primary)] text-white py-2 px-4 rounded-[var(--border-radius-md)] hover:bg-[color:var(--color-primary-dark)] transition-colors font-semibold"
            disabled={isSigningIn} // Disable button while signing in
          >
            {isSigningIn ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
