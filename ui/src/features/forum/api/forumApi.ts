import { API_BASE_URL } from "../../../config/api";
import type { IForumPost, IForumThread } from "../types/forumTypes"; // Use new interface names
import { getMockPosts, getMockThread } from "./mockData";

// Helper function to add a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Placeholder function to fetch a list of posts
export const fetchPosts = async (): Promise<IForumPost[]> => {
  // Use new interface name
  console.log(`Fetching posts from: ${API_BASE_URL}/posts (mock with delay)`);
  await delay(500); // Add 0.5 second delay
  return getMockPosts(); // Return mock posts
};

// Placeholder function to fetch a specific thread
export const fetchThread = async (
  threadId: string
): Promise<IForumThread | null> => {
  // Use new interface name
  console.log(
    `Fetching thread ${threadId} from: <span class="math-inline">${API_BASE_URL}/threads/</span>{threadId} (mock with delay)`
  );
  await delay(500); // Add 0.5 second delay
  const thread = getMockThread(threadId); // Get mock thread by ID
  // Simulate a 404 if thread is not found
  if (thread) {
    return thread;
  } else {
    return null; // Return null for not found
  }
};

// Define placeholder functions for voting, creating posts/replies later
// export const votePost = async (postId: string, type: 'good' | 'bad') => { ... }
// export const createPost = async (postData: { title: string; content: string; mode: EditorMode }) => { ... }
// export const createReply = async (threadId: string, replyData: { content: string; mode: EditorMode }) => { ... }
