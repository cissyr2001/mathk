import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../features/auth/hooks/useAuthStore";
import { FORUM_NAME } from "../config/appConfig"; // Import forum name

const Header: React.FC = () => {
  const { user, signOut } = useAuthStore(); // Get user and signOut function from the store

  return (
    // Use the new header background color variable
    <header className="bg-[color:var(--color-header-bg)] text-white p-[var(--spacing-md)] shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Text color handled by CSS rule on header */}
        {/* Increase font size and use config name */}
        <Link
          to="/"
          className="text-3xl md:text-4xl font-bold hover:text-gray-200 transition-colors flex items-center gap-2" // Increased size, kept bold, added flex and gap
        >
          <span>🏠</span> {/* Add Home emoji */}
          {FORUM_NAME}
        </Link>
        <nav className="flex items-center">
          {/* Add New Post Button */}
          <Link
            to="/new-post"
            className="ml-4 btn-text text-white text-base"
            aria-label="Create New Post"
          >
            ✍️ New Post
          </Link>
          {/* Search Button */}
          <Link
            to="/search"
            className="ml-4 btn-text text-white text-base" // Use btn-text, white text, and base font size
            aria-label="Search" // Add aria-label for accessibility
          >
            🔍
          </Link>
          {/* Show user name or Sign In button */}
          {user ? (
            // Added gap for spacing
            <div className="flex items-center ml-4 gap-[var(--spacing-sm)]">
              {/* Circled avatar placeholder */}
              <div className="avatar-circle"></div>
              <span className="text-white text-base">{user.username}</span>{" "}
              {/* Ensure username is white and base size */}
              {/* Convert to text-based white button, set font size */}
              <button
                onClick={signOut}
                className="btn-text text-white text-base" // Use btn-text, white text, and base font size
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/signin"
              className="ml-4 btn-text text-white text-base" // Use btn-text, white text, and base font size
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
