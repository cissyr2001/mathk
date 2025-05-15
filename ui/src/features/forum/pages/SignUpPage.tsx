import React from "react";
import { Link } from "react-router-dom";

const SignUpPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-[var(--spacing-lg)]">
      <div className="bg-[color:var(--color-surface)] rounded-[var(--border-radius-md)] shadow-md p-[var(--spacing-lg)] w-full max-w-sm border border-[color:var(--color-border)] text-center">
        <h1 className="text-2xl font-bold mb-[var(--spacing-lg)]">Sign Up</h1>
        <p className="text-sm text-[color:var(--color-text-secondary)] mb-[var(--spacing-md)]">
          Join the MathVerse Forum!
        </p>
        {/* Sign up via Google Button */}
        <button className="btn btn-default w-full">Sign up via Google</button>

        {/* Link back to Sign In */}
        <p className="mt-[var(--spacing-md)] text-sm text-[color:var(--color-text-secondary)]">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-[color:var(--color-primary)] hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
