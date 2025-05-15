import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
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
        {/* Removed Sign In Title */}
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
              className="w-full" // Keep w-full, global styles add the rest
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
              className="w-full" // Keep w-full, global styles add the rest
              required
            />
          </div>

          {signInError && (
            <p className="text-[color:var(--color-danger)] text-sm mb-[var(--spacing-md)]">
              {signInError}
            </p>
          )}

          {/* Use the new default button class */}
          <button
            type="submit"
            className="w-full btn btn-default"
            disabled={isSigningIn} // Disable button while signing in
          >
            {isSigningIn ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Add OR separator and Sign Up link */}
        <div className="flex items-center justify-center my-[var(--spacing-md)]">
          <hr className="flex-grow border-gray-300" />
          <span className="px-[var(--spacing-sm)] text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <Link
          to="/signup"
          className="w-full flex justify-center btn-text text-gray-600" // Styled as text button, grey color, centered
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
