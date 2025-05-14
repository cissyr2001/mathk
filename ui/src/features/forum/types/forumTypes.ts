// Interface for a User
export interface IUser {
    id: string;
    username: string;
    password?: string; // Password is optional as it shouldn't be sent to the frontend usually
}

// Renamed from ForumPost, replies changed to repliesCount
export interface IForumPost {
  id: string;
  title: string;
  author: string;
  repliesCount: number; // Renamed from 'replies'
  createdAt: string; // ISO date string
  // Optional: Add vote counts if you want to display them on the post list
  // goodVotes?: number;
  // badVotes?: number;
}

// Renamed from Reply
export interface IReply {
  id: string;
  author: string;
  content: string;
  votes: number; // Simple combined vote count for now
  createdAt: string; // ISO date string
  // Add good/bad votes later if needed
  // goodVotes?: number;
  // badVotes?: number;
}

// Renamed from ForumThread, extends IForumPost
export interface IForumThread extends IForumPost {
  content: string; // The main content of the initial post
  replies: IReply[]; // For a specific thread, we fetch the actual replies (using the new IReply type)
   // Optional: Include vote counts for the main post on the thread page
  // goodVotes: number;
  // badVotes: number;
}

// Define type for text editor modes
export type EditorMode = 'embed' | 'plain' | 'latex';

// Define payload types for API requests later
// export interface ICreatePostPayload {
//   title: string;
//   content: string;
//   mode: EditorMode;
// }

// export interface ICreateReplyPayload {
//    threadId: string;
//    content: string;
//    mode: EditorMode;
// }
