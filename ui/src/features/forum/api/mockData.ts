import type {
  IForumPost,
  IForumThread,
  IReply,
  IUser,
} from "../types/forumTypes"; // Import IUser

// Sample Users with passwords
export const mockUsers: IUser[] = [
  { id: "user1", username: "MathGuru", password: "password123" },
  { id: "user2", username: "AlgebraFan", password: "password456" },
  { id: "user3", username: "CalcKid", password: "password789" },
  { id: "user4", username: "LimitLover", password: "securepassword" },
  { id: "user5", username: "MatrixMaster", password: "mysecret" },
  { id: "user6", username: "GeoGeek", password: "geometrypass" },
];

// Sample Replies (no change needed here)
export const mockReplies: IReply[] = [
  {
    id: "r1",
    author: "CalcKid",
    content: "What is a derivative?",
    votes: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  }, // 2 hours ago
  {
    id: "r2",
    author: "LimitLover",
    content:
      "Limits are tricky. \\(\\lim_{x\\to 0} \\frac{\\sin x}{x} = 1\\) is a classic!",
    votes: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(),
  }, // 1.5 hours ago
  {
    id: "r3",
    author: "MatrixMaster",
    content: "Eigenvalues are fun! Consider the matrix `[[2, 1], [1, 2]]`.",
    votes: 10,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  }, // 30 minutes ago
  {
    id: "r4",
    author: "GeoGeek",
    content: "Does anyone have good resources for non-Euclidean geometry?",
    votes: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  }, // 10 minutes ago
  {
    id: "r5",
    author: "MathGuru",
    content: "That limit example is great, @LimitLover!",
    votes: 3,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  }, // 5 minutes ago
];

// Sample Threads (use new interface name)
export const mockThreads: IForumThread[] = [
  {
    id: "1",
    title: "Introduction to Calculus",
    author: "MathGuru",
    content:
      "Discussing the fundamentals of calculus, including limits, derivatives, and integrals. Ask your basic questions here!",
    replies: [mockReplies[0], mockReplies[1], mockReplies[4]], // Replies r1, r2, r5
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    repliesCount: 3, // Manually set repliesCount for mock data consistency
    // goodVotes: 15,
    // badVotes: 1,
  },
  {
    id: "2",
    title: "Linear Algebra Basics",
    author: "AlgebraFan",
    content:
      "A place to discuss basic concepts in linear algebra, such as vectors, matrices, and linear transformations.",
    replies: [mockReplies[2]], // Reply r3
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    repliesCount: 1, // Manually set repliesCount
    // goodVotes: 12,
    // badVotes: 0,
  },
  {
    id: "3",
    title: "Geometry Exploration",
    author: "GeoGeek",
    content: "Share interesting geometric problems or concepts!",
    replies: [mockReplies[3]], // Reply r4
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
    repliesCount: 1, // Manually set repliesCount
    // goodVotes: 8,
    // badVotes: 0,
  },
];

// Mock function to get a list of posts for the homepage (use new interface name and property)
export const getMockPosts = (): IForumPost[] => {
  return mockThreads.map((thread) => ({
    id: thread.id,
    title: thread.title,
    author: thread.author,
    repliesCount: thread.replies.length, // Use repliesCount
    createdAt: thread.createdAt,
    // Include vote counts if added to IForumPost type
    // goodVotes: thread.goodVotes,
    // badVotes: thread.badVotes,
  }));
};

// Mock function to get a specific thread (use new interface name)
export const getMockThread = (threadId: string): IForumThread | undefined => {
  return mockThreads.find((thread) => thread.id === threadId);
};

// Mock function to find a user by username and password
export const findMockUser = (
  username: string,
  password: string
): IUser | undefined => {
  return mockUsers.find(
    (user) => user.username === username && user.password === password
  );
};
