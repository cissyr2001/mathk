// src/features/forum/pages/HomePage.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/forumApi';
import type { IForumPost } from '../types/forumTypes'; // Use new interface name
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { data: posts, isLoading, error } = useQuery<IForumPost[], Error>({ // Use new interface name
    queryKey: ['forumPosts'],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <div className="text-center p-[var(--spacing-lg)]">Loading forum posts...</div>;
  }

  if (error) {
    return <div className="text-center text-[color:var(--color-danger)] p-[var(--spacing-lg)]">Error loading posts: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-[var(--spacing-md)]">Latest Forum Posts</h1>
      <ul>
        {posts?.map((post) => (
          // Use flexbox for layout and apply spacing
          <li key={post.id} className="flex flex-col bg-[color:var(--color-surface)] rounded-[var(--border-radius-md)] shadow-sm p-[var(--spacing-md)] mb-[var(--spacing-md)] border border-[color:var(--color-border)]">
            <Link to={`/thread/${post.id}`} className="text-[color:var(--color-primary)] hover:underline text-lg font-semibold">
              {post.title}
            </Link>
            <p className="text-sm text-[color:var(--color-text-secondary)] mt-1">
              Posted by {post.author} - {post.repliesCount} replies {/* Use repliesCount */}
              {/* - {new Date(post.createdAt).toLocaleDateString()} */}
            </p>
          </li>
        ))}
      </ul>
      {/* Add a button to create a new post later */}
      {/* <Link to="/new-post" className="mt-4 inline-block bg-[color:var(--color-secondary)] text-white py-2 px-4 rounded-[var(--border-radius-md)] hover:bg-[color:var(--color-secondary-dark)] transition-colors">
        Create New Post
      </Link> */}
    </div>
  );
};

export default HomePage;
