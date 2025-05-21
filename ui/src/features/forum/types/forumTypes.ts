export interface IUser {
  id: string;
  username: string;
  password?: string; // Password is optional as it shouldn't be sent to the frontend usually
}

export interface IForumPost {
  id: string;
  title: string;
  author: string;
  repliesCount: number;
  createdAt: string; // ISO date string
  goodVotes: number;
  badVotes: number;
}

export interface IReply {
  id: string;
  author: string;
  content: string;
  votes?: number;
  threadId?: string;
  createdAt: string; // ISO date string
  goodVotes: number;
  badVotes: number;
  parentReplyId?: string; // New field to track the target reply
}

export interface IForumThread extends IForumPost {
  content: string;
  replies: IReply[];
  goodVotes: number;
  badVotes: number;
}

export type EditorMode = "embed" | "plain" | "latex";

export interface ICreatePostPayload {
  title: string;
  content: string;
  mode: EditorMode;
  author: string;
  tags?: string[];
}

export interface ICreateReplyPayload {
  threadId: string;
  content: string;
  mode: EditorMode;
  author: string;
  parentReplyId?: string; // New field for creating replies targeting specific replies
}