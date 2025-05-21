import { API_BASE_URL } from "../../../config/api";
import type {
  IForumPost,
  IForumThread,
  IReply,
  ICreatePostPayload,
  ICreateReplyPayload,
} from "../types/forumTypes";
import {
  getMockPosts,
  getMockThread,
  getMockRepliesForThread,
  searchMock,
  createMockPost,
  createMockReply,
} from "./mockData";
import { IS_DEVELOPMENT } from "../../../config/appConfig";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchPosts = async (
  page: number,
  pageSize: number
): Promise<{ posts: IForumPost[]; totalCount: number }> => {
  console.log(
    `Fetching posts for page ${page} with size ${pageSize} from: ${API_BASE_URL}/posts (mock with delay)`
  );
  await delay(500);
  return getMockPosts(page, pageSize);
};

export const fetchThread = async (
  threadId: string
): Promise<IForumThread | null> => {
  console.log(
    `Fetching thread ${threadId} from: ${API_BASE_URL}/threads/${threadId} (mock with delay)`
  );
  await delay(500);
  const thread = getMockThread(threadId);

  if (thread) {
    return thread;
  } else {
    return null;
  }
};

export const fetchRepliesForThread = async (
  threadId: string,
  page: number,
  pageSize: number
): Promise<{ replies: IReply[]; totalCount: number }> => {
  console.log(
    `Fetching replies for thread ${threadId}, page ${page}, size ${pageSize} (mock with delay)`
  );
  await delay(500);
  return getMockRepliesForThread(threadId, page, pageSize);
};

export const search = async (
  keyword: string
): Promise<(IForumPost | IReply)[]> => {
  console.log(`Searching for "${keyword}" (mock with delay)`);
  await delay(500);
  return searchMock(keyword);
};

export const createPost = async (
  postData: ICreatePostPayload
): Promise<IForumThread> => {
  if (IS_DEVELOPMENT) {
    console.log(`Creating post (mock):`, postData);
    await delay(500);
    return createMockPost(postData);
  } else {
    console.log(`Creating post via API: ${API_BASE_URL}/posts`, postData);
    await delay(500);
    throw new Error("Real API not implemented");
  }
};

export const createReply = async (
  threadId: string,
  replyData: ICreateReplyPayload
): Promise<IReply> => {
  if (IS_DEVELOPMENT) {
    console.log(`Creating reply for thread ${threadId} (mock):`, replyData);
    await delay(500);
    return createMockReply(threadId, replyData);
  } else {
    console.log(
      `Creating reply via API: ${API_BASE_URL}/threads/${threadId}/replies`,
      replyData
    );
    await delay(500);
    throw new Error("Real API not implemented");
  }
};
