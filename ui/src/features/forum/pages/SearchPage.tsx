import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { IForumPost, IReply } from "../types/forumTypes"; // Import types
import { Link } from "react-router-dom";
import MessageContent from "../components/MessageContent/MessageContent"; // Import MessageContent
import RelativeTime from "../components/RelativeTime/RelativeTime";
import { search } from "../api/forumApi";

const SearchPage: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Use useQuery with enabled flag to only fetch when searchQuery is set
  const {
    data: searchResults,
    isLoading,
    error,
  } = useQuery<(IForumPost | IReply)[], Error>({
    queryKey: ["searchResults", searchQuery],
    queryFn: () => search(searchQuery),
    enabled: !!searchQuery, // Only run query if searchQuery is not empty
  });

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(keyword); // Set the search query to trigger the fetch
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-[var(--spacing-md)]">
        Search Forum
      </h1>
      <form
        onSubmit={handleSearchSubmit}
        className="flex gap-[var(--spacing-md)] mb-[var(--spacing-lg)]"
      >
        <input
          type="text"
          placeholder="Enter keywords..."
          value={keyword}
          onChange={handleSearchInputChange}
          className="flex-grow" // Allow input to take available space (global styles provide padding/border)
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!keyword || isLoading}
        >
          {" "}
          {/* Disable while loading */}
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {isLoading && (
        <div className="text-center p-[var(--spacing-md)]">Searching...</div>
      )}
      {error && (
        <div className="text-center text-[color:var(--color-danger)] p-[var(--spacing-md)]">
          Error during search: {error.message}
        </div>
      )}

      {searchQuery && !isLoading && !error && (
        <div className="mt-[var(--spacing-lg)]">
          <h2 className="text-xl font-semibold mb-[var(--spacing-md)]">
            {searchResults?.length || 0} Results for "{searchQuery}"
          </h2>
          <ul>
            {searchResults?.map((result) => (
              <li
                key={result.id}
                className="bg-[color:var(--color-surface)] rounded-[var(--border-radius-md)] shadow-sm p-[var(--spacing-md)] mb-[var(--spacing-md)] border border-[color:var(--color-border)]"
              >
                {"title" in result ? (
                  // It's a thread (IForumPost)
                  <>
                    <Link
                      to={`/thread/${result.id}`}
                      className="text-[color:var(--color-primary)] hover:underline font-semibold"
                    >
                      Thread: {result.title}
                    </Link>
                    <p className="text-sm text-[color:var(--color-text-secondary)] mt-1">
                      by {result.author} - {result.repliesCount} replies -{" "}
                      <RelativeTime dateString={result.createdAt} />
                    </p>
                    {/* Optionally show a snippet of the content */}
                    {/* <div className="text-sm text-[color:var(--color-text-secondary)] mt-2 line-clamp-2">{result.content}</div> */}
                  </>
                ) : (
                  // It's a reply (IReply)
                  <>
                    {/* Link to the thread containing the reply */}
                    <Link
                      to={`/thread/${result.threadId}`}
                      className="text-[color:var(--color-primary)] hover:underline font-semibold"
                    >
                      Reply by {result.author}
                    </Link>
                    <p className="text-sm text-[color:var(--color-text-secondary)] mt-1">
                      in thread {result.threadId} -{" "}
                      <RelativeTime dateString={result.createdAt} />
                    </p>
                    {/* Show reply content - need to handle mode */}
                    {/* Assuming 'embed' mode for mock search results */}
                    <div className="text-sm mt-2 message-content">
                      <MessageContent content={result.content} mode="embed" />
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {searchQuery &&
        !isLoading &&
        !error &&
        (!searchResults || searchResults.length === 0) && (
          <div className="text-center p-[var(--spacing-md)]">
            No results found for "{searchQuery}".
          </div>
        )}
      {/* Add a link back to home or previous page if needed */}
    </div>
  );
};

export default SearchPage;
