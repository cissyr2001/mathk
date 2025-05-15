// src/features/forum/api/forumApi.ts
import { API_BASE_URL } from "../../../config/api";
import type { IForumPost, IForumThread, IReply } from "../types/forumTypes"; // Use new interface names
import {
  getMockPosts,
  getMockThread,
  getMockRepliesForThread,
  searchMock, // Import searchMock
} from "./mockData";

// Helper function to add a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetches a paginated list of forum posts (threads for the homepage).
 * @param page The page number (1-indexed).
 * @param pageSize The number of posts per page.
 * @returns A promise resolving to an object containing the paginated posts and the total count.
 */
export const fetchPosts = async (
  page: number,
  pageSize: number
): Promise<{ posts: IForumPost[]; totalCount: number }> => {
  console.log(
    `Workspaceing posts for page ${page} with size ${pageSize} from: ${API_BASE_URL}/posts (mock with delay)`
  );
  await delay(500); // Add 0.5 second delay
  // Call the mock data function with pagination parameters
  return getMockPosts(page, pageSize);
};

/**
 * Fetches details for a specific forum thread (excluding its replies).
 * Replies are fetched separately via fetchRepliesForThread for pagination.
 * @param threadId The ID of the thread to fetch.
 * @returns A promise resolving to the thread object or null if not found.
 */
export const fetchThread = async (
  threadId: string
): Promise<IForumThread | null> => {
  console.log(
    `Workspaceing thread ${threadId} from: ${API_BASE_URL}/threads/${threadId} (mock with delay)`
  );
  await delay(500); // Add 0.5 second delay
  // Call the mock data function to get the thread details
  const thread = getMockThread(threadId);

  if (thread) {
    return thread;
  } else {
    return null; // Simulate not found
  }
};

/**
 * Fetches a paginated list of replies for a specific thread.
 * @param threadId The ID of the thread whose replies to fetch.
 * @param page The page number (1-indexed).
 * @param pageSize The number of replies per page.
 * @returns A promise resolving to an object containing the paginated replies and the total count.
 */
export const fetchRepliesForThread = async (
  threadId: string,
  page: number,
  pageSize: number
): Promise<{ replies: IReply[]; totalCount: number }> => {
  console.log(
    `Workspaceing replies for thread ${threadId}, page ${page}, size ${pageSize} (mock with delay)`
  );
  await delay(500); // Add 0.5 second delay
  // Call the mock data function with threadId and pagination parameters
  return getMockRepliesForThread(threadId, page, pageSize);
};

/**
 * Performs a search across forum content.
 * @param keyword The search keyword.
 * @returns A promise resolving to an array of matching threads and replies.
 */
export const search = async (
  keyword: string
): Promise<(IForumPost | IReply)[]> => {
  console.log(`Searching for "${keyword}" (mock with delay)`);
  await delay(500); // Add 0.5 second delay
  // Call the mock search function
  return searchMock(keyword);
};

// Define placeholder functions for voting, creating posts/replies later
// export const votePost = async (postId: string, type: 'good' | 'bad') => { ... }
// export const createPost = async (postData: { title: string; content: string; mode: EditorMode }) => { ... }
// export const createReply = async (threadId: string, replyData: { content: string; mode: EditorMode }) => { ... }
