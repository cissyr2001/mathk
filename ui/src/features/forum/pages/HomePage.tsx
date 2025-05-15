import React, { useState } from "react"; // Import useState
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/forumApi";
import type { IForumPost } from "../types/forumTypes"; // Use new interface name
import { Link } from "react-router-dom";
import RelativeTime from "../components/RelativeTime/RelativeTime";

const HomePage: React.FC = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // Define posts per page

  const { data, isLoading, error } = useQuery<
    { posts: IForumPost[]; totalCount: number },
    Error
  >({
    // Use new return type
    queryKey: ["forumPosts", currentPage, postsPerPage], // Include pagination in query key
    queryFn: () => fetchPosts(currentPage, postsPerPage), // Pass pagination parameters
    placeholderData: (previousData) => previousData, // Keep previous data while fetching next page
    // keepPreviousData: true, // Optional: prevents flash when changing pages
  });

  const posts = data?.posts;
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / postsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (isLoading && !data) {
    // Show loading only on initial fetch
    return (
      <div className="text-center p-[var(--spacing-lg)]">
        Loading forum posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-[color:var(--color-danger)] p-[var(--spacing-lg)]">
        Error loading posts: {error.message}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-[var(--spacing-md)]">
        Latest Forum Posts
      </h1>
      {posts && posts.length > 0 ? (
        <>
          <ul>
            {posts.map((post) => (
              // Use flexbox for layout and apply spacing
              <li
                key={post.id}
                className="flex flex-col bg-[color:var(--color-surface)] rounded-[var(--border-radius-md)] shadow-sm p-[var(--spacing-md)] mb-[var(--spacing-md)] border border-[color:var(--color-border)]"
              >
                <Link
                  to={`/thread/${post.id}`}
                  className="text-[color:var(--color-primary)] hover:underline text-lg font-semibold"
                >
                  {post.title}
                </Link>
                {/* Use flex to align items and gap for spacing */}
                <div className="flex items-center text-sm text-[color:var(--color-text-secondary)] mt-1 gap-[var(--spacing-sm)] flex-wrap">
                  Posted by {post.author} - {post.repliesCount} replies
                  {/* Add date using RelativeTime component */}
                  <span className="ml-auto">
                    {" "}
                    {/* Use ml-auto to push date to the right */}
                    <RelativeTime dateString={post.createdAt} />
                  </span>
                </div>
              </li>
            ))}
          </ul>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-[var(--spacing-md)] mt-[var(--spacing-md)]">
              <button
                className="btn btn-default btn-sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1 || isLoading}
              >
                Previous
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-default btn-sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages || isLoading}
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center p-[var(--spacing-lg)]">
          No forum posts found.
        </div>
      )}
    </div>
  );
};

export default HomePage;
