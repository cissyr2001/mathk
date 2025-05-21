import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TextEditor from "../components/TextEditor/TextEditor";
import type { EditorMode } from "../types/forumTypes";
import { createPost } from "../api/forumApi";
import useAuthStore from "../../auth/hooks/useAuthStore";

const NewPostPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mode, setMode] = useState<EditorMode>("embed");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate posts query to refresh homepage
      queryClient.invalidateQueries({ queryKey: ["forumPosts"] });
      navigate("/");
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });

  const handleTextChange = (value: string, newMode: EditorMode) => {
    setContent(value);
    setMode(newMode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      console.error("User not authenticated");
      return;
    }
    const postData = {
      title,
      content,
      mode,
      author: user.username,
      tags: tags.split(",").map((tag) => tag.trim()).filter((tag) => tag),
    };
    mutation.mutate(postData);
  };

  return (
    <div className="p-[var(--spacing-lg)]">
      <h1 className="text-2xl font-bold mb-[var(--spacing-md)]">Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-[var(--spacing-md)]">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-[color:var(--color-text-primary)] mb-[var(--spacing-xs)]"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
            placeholder="Enter post title..."
            required
          />
        </div>
        <div className="mb-[var(--spacing-md)]">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-[color:var(--color-text-primary)] mb-[var(--spacing-xs)]"
          >
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full"
            placeholder="e.g., calculus, algebra, geometry"
          />
        </div>
        <TextEditor value={content} onChange={handleTextChange} />
        <div className="flex gap-[var(--spacing-md)]">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={mutation.isPending || !user}
          >
            {mutation.isPending ? "Publishing..." : "Publish Post"}
          </button>
          <button
            type="button"
            className="btn btn-default"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
        {mutation.isError && (
          <p className="text-[color:var(--color-danger)] mt-[var(--spacing-md)]">
            Error creating post: {mutation.error.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default NewPostPage;