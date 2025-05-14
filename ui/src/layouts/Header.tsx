// src/layouts/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../features/auth/hooks/useAuthStore";

const Header: React.FC = () => {
  const { user, signOut } = useAuthStore(); // Get user and signOut function from the store

  return (
    <header className="bg-[color:var(--color-primary-dark)] text-white p-[var(--spacing-md)] shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold text-[color:var(--color-surface)] hover:text-gray-200 transition-colors"
        >
          Math Forum
        </Link>{" "}
        {/* Ensure white text */}
        <nav className="flex items-center">
          {/* Add navigation links here later */}
          {/* <Link to="/new-post" className="ml-4 hover:underline">New Post</Link> */}

          {/* Show user name or Sign In button */}
          {user ? (
            <div className="flex items-center ml-4">
              <span className="mr-2">Welcome, {user.username}!</span>
              <button
                onClick={signOut}
                className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/signin"
              className="ml-4 bg-[color:var(--color-secondary)] text-white py-1 px-3 rounded-[var(--border-radius-md)] hover:bg-[color:var(--color-secondary-dark)] transition-colors"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
