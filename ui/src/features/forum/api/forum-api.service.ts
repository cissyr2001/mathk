import { API_BASE_URL } from "../../../config/api.service";
import { IS_DEVELOPMENT, USE_MOCK_DATA } from "../../../config/app-config.constant";
import type { IForumPost, IForumThread, IReply, ICreatePostPayload, ICreateReplyPayload } from "../types/forum-types.type";
import { getMockPosts, getMockThread, getMockRepliesForThread, searchMock, createMockPost, createMockReply } from "./mock-data.service";


const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchPosts = async (
  page: number,
  pageSize: number
): Promise<{ posts: IForumPost[]; totalCount: number }> => {
  if (USE_MOCK_DATA) {
    console.log(
      `Fetching posts for page ${page} with size ${pageSize} (mock with delay)`
    );
    await delay(500);
    return getMockPosts(page, pageSize);
  }
  
  console.log(
    `Fetching posts for page ${page} with size ${pageSize} from: ${API_BASE_URL}/posts`
  );
  await delay(500);
  throw new Error("Real API not implemented");
};

export const fetchThread = async (
  threadId: string
): Promise<IForumThread | null> => {
  if (USE_MOCK_DATA) {
    console.log(
      `Fetching thread ${threadId} (mock with delay)`
    );
    await delay(500);
    const thread = getMockThread(threadId);
    return thread || null;
  }

  console.log(
    `Fetching thread ${threadId} from: ${API_BASE_URL}/threads/${threadId}`
  );
  await delay(500);
  throw new Error("Real API not implemented");
};

export const fetchRepliesForThread = async (
  threadId: string,
  page: number,
  pageSize: number
): Promise<{ replies: IReply[]; totalCount: number }> => {
  if (USE_MOCK_DATA) {
    console.log(
      `Fetching replies for thread ${threadId}, page ${page}, size ${pageSize} (mock with delay)`
    );
    await delay(500);
    return getMockRepliesForThread(threadId, page, pageSize);
  }

  console.log(
    `Fetching replies for thread ${threadId}, page ${page}, size ${pageSize} from: ${API_BASE_URL}/threads/${threadId}/replies`
  );
  await delay(500);
  throw new Error("Real API not implemented");
};

export const search = async (
  keyword: string
): Promise<(IForumPost | IReply)[]> => {
  if (USE_MOCK_DATA) {
    console.log(`Searching for "${keyword}" (mock with delay)`);
    await delay(500);
    return searchMock(keyword);
  }

  console.log(`Searching for "${keyword}" from: ${API_BASE_URL}/search`);
  await delay(500);
  throw new Error("Real API not implemented");
};

export const createPost = async (
  postData: ICreatePostPayload
): Promise<IForumThread> => {
  if (USE_MOCK_DATA) {
    console.log(`Creating post (mock):`, postData);
    await delay(500);
    return createMockPost(postData);
  }

  console.log(`Creating post via API: ${API_BASE_URL}/posts`, postData);
  await delay(500);
  throw new Error("Real API not implemented");
};

export const createReply = async (
  threadId: string,
  replyData: ICreateReplyPayload
): Promise<IReply> => {
  if (USE_MOCK_DATA) {
    console.log(`Creating reply for thread ${threadId} (mock):`, replyData);
    await delay(500);
    return createMockReply(threadId, replyData);
  }

  console.log(
    `Creating reply via API: ${API_BASE_URL}/threads/${threadId}/replies`,
    replyData
  );
  await delay(500);
  throw new Error("Real API not implemented");
};
