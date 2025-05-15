import { subDays, subHours, subMinutes } from "date-fns"; // For generating dates
import { v4 as uuidv4 } from "uuid"; // Need a UUID generator for new mock data

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
  { id: "user7", username: "StatSage", password: "statistics" }, // Added user
  { id: "user8", username: "LogicLover", password: "boolean" }, // Added user
  { id: "user9", username: "PhysicsFan", password: "einstein" }, // Added user
  { id: "user10", username: "ChemWhiz", password: "periodic" }, // Added user
  { id: "user11", username: "BioStudent", password: "dna" }, // Added user
  { id: "user12", username: "EcoAnalyst", password: "supplydemand" }, // Added user
];

const getRandomUser = () =>
  mockUsers[Math.floor(Math.random() * mockUsers.length)];

const generateRandomDate = (recentHours = 24 * 30) => {
  const now = new Date();
  const randomMinutes = Math.random() * recentHours * 60;
  return subMinutes(now, randomMinutes).toISOString();
};

const generateLoremMath = (sentences = 1) => {
  const mathExamples = [
    "`x = (-b pm sqrt(b^2 - 4ac)) / (2a)`",
    "`int_a^b f(x) dx = F(b) - F(a)`",
    "`sum_(n=1)^oo 1/n^2 = pi^2/6`",
    "`[[a, b], [c, d]]`",
    "`lim_(x->0) sin(x)/x`",
    "`e^(i pi) + 1 = 0`",
    "`nabla * vec(E) = rho / epsilon_0`",
    "`forall x in RR, exists y in RR such that y > x`",
    "`A uu (B nn C) = (A uu B) nn (A uu C)`",
    "`d/(dx) (x^n) = nx^(n-1)`",
    "`int int_R f(x,y) dA`",
    "`vec(F) = q(vec(E) + vec(v) xx vec(B))`",
    "`C(n, k) = n! / (k! (n-k)!)`",
    "`|vec(v)| = sqrt(v_x^2 + v_y^2 + v_z^2)`",
    "`phi = (1 + sqrt(5))/2`",
    "`[[cos(theta), -sin(theta)], [sin(theta), cos(theta)]]`",
    "`p => q <=> !q or q`", // Corrected logical equivalence
    "`sigma^2 = 1/N sum_(i=1)^N (x_i - bar(x))^2`",
    "`oint_C vec(F) * d vec(r) = int int_S (nabla xx vec(F)) * d vec(S)`", // Stokes' Theorem
    "`partial^2 f / partial x partial y = partial^2 f / partial y partial x`", // Clairaut's Theorem
    "`prod_(i=1)^n a_i`", // Product notation
    "`abs(x)`", // Absolute value
    "`ceil(x)`", // Ceiling
    "`floor(x)`", // Floor
    "`vec(a) * (vec(b) xx vec(c))`", // Scalar triple product
    "`A nn B = {x | x in A and x in B}`", // Set intersection definition
  ];
  const textSnippets = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
    "Let's consider a simple case. ",
    "According to the theorem, this should hold true. ",
    "Can anyone verify this result? ",
    "I'm having trouble with this step. ",
    "Here is a related problem. ",
  ];

  let content = "";
  for (let i = 0; i < sentences; i++) {
    content += textSnippets[Math.floor(Math.random() * textSnippets.length)];
    // Occasionally insert a math example
    if (Math.random() > 0.4) {
      // Increased chance of math
      content +=
        mathExamples[Math.floor(Math.random() * mathExamples.length)] + ". ";
    }
  }
  // Ensure at least one math example if content is reasonably long and doesn't have one
  if (content.length > 80 && !content.includes("`")) {
    content +=
      " Consider the formula: " +
      mathExamples[Math.floor(Math.random() * mathExamples.length)] +
      ".";
  }

  return content.trim();
};

const generateMockReply = (threadId: string): IReply => {
  const id = uuidv4();
  const author = getRandomUser().username;
  const content = generateLoremMath(Math.random() > 0.3 ? 2 : 1); // 1 or 2 sentences, slightly higher chance of 2
  const createdAt = generateRandomDate(48); // Replies are usually more recent, max 2 days old

  return {
    id,
    author,
    content,
    votes: 0, // Simple votes, not used in UI currently
    goodVotes: Math.floor(Math.random() * 30), // Increased max votes
    badVotes: Math.floor(Math.random() * 8), // Increased max votes
    createdAt,
    threadId, // Add threadId to reply
  };
};

const generateMockThread = (): IForumThread => {
  const id = uuidv4();
  const author = getRandomUser().username;
  const title = `Thread ${uuidv4().slice(0, 4)}: ${generateLoremMath(1)
    .slice(0, 60)
    .replace(/\.$/, "")}...`; // Generate title from first sentence of lorem math, max 60 chars
  const content = generateLoremMath(Math.random() > 0.2 ? 5 : 3); // 3 to 5 sentences, higher chance of more
  const createdAt = generateRandomDate(60 * 24); // Threads can be older, max 60 days old

  // Replies will be generated and associated separately
  const repliesCount = Math.floor(Math.random() * 25); // Up to 25 replies per generated thread

  return {
    id,
    title,
    author,
    content,
    replies: [], // replies are stored in allMockReplies
    createdAt,
    repliesCount: repliesCount, // Store the generated count
    goodVotes: Math.floor(Math.random() * 100), // Increased max votes
    badVotes: Math.floor(Math.random() * 20), // Increased max votes
  };
};

// Initial hand-crafted mock data (keep a few specific ones)
const initialMockThreads: IForumThread[] = [
  {
    id: "1",
    title: "Introduction to Calculus",
    author: "MathGuru",
    content:
      "Discussing the fundamentals of calculus, including limits, derivatives, and integrals. Ask your basic questions here!\n\nFor example, what is the integral of `x^n`? It's `int x^n dx = x^(n+1)/(n+1) + C` (for `n != -1`). We can also look at related concepts like sequences and series. A common series is the geometric series: `sum_(n=0)^oo r^n = 1/(1-r)` for `|r| < 1`. This is a great example of an infinite sum converging to a finite value.",
    replies: [], // replies are stored in allMockReplies
    createdAt: subDays(new Date(), 3).toISOString(), // 3 days ago
    repliesCount: 0, // Will be updated later
    goodVotes: 15,
    badVotes: 1,
  },
  {
    id: "2",
    title: "Linear Algebra Basics",
    author: "AlgebraFan",
    content:
      "A place to discuss basic concepts in linear algebra, such as vectors, matrices, and linear transformations.\n\nIf `v = [[v_1], [v_2]]` and `w = [[w_1], [w_2]]`, their dot product is `v * w = v_1 w_1 + v_2 w_2`. How do we represent transformations? A linear transformation T can often be represented by a matrix A such that `T(vec(x)) = A vec(x)`. For example, a rotation matrix might be `R(theta) = [[cos(theta), -sin(theta)], [sin(theta), cos(theta)]]`.",
    replies: [],
    createdAt: subDays(new Date(), 2).toISOString(), // 2 days ago
    repliesCount: 0, // Will be updated later
    goodVotes: 12,
    badVotes: 0,
  },
  {
    id: "3",
    title: "Geometry Exploration",
    author: "GeoGeek",
    content:
      "Share interesting geometric problems or concepts! Like the Pythagorean theorem: `a^2 + b^2 = c^2`. What about areas and volumes? The area of a circle is `A = pi r^2`, and the volume of a sphere is `V = 4/3 pi r^3`. We can use integrals to derive these formulas, for instance, the area of a circle can be found using `int_0^(2pi) int_0^r rho d rho d theta`.",
    replies: [],
    createdAt: subDays(new Date(), 1).toISOString(), // 1 day ago
    repliesCount: 0, // Will be updated later
    goodVotes: 8,
    badVotes: 0,
  },
  {
    id: "4",
    title: "Probability and Statistics Fundamentals",
    author: "StatSage",
    content:
      "Let's discuss basic probability and statistics. What's the difference between mean, median, and mode? The mean of a dataset `{x_1, x_2, ..., x_n}` is `bar(x) = (sum_(i=1)^n x_i)/n`. We can also talk about concepts like variance `sigma^2` and standard deviation `sigma`. The binomial probability formula is `P(X=k) = C(n, k) p^k (1-p)^(n-k)`.",
    replies: [],
    createdAt: subHours(new Date(), 10).toISOString(), // 10 hours ago
    repliesCount: 0, // Will be updated later
    goodVotes: 10,
    badVotes: 0,
  },
  {
    id: "5",
    title: "Introduction to Logic",
    author: "LogicLover",
    content:
      "Exploring fundamental concepts in mathematical logic. We can discuss truth tables, connectives (`and`, `or`, `not`, `=>`, `iff`), and quantifiers (`forall`, `exists`). A simple tautology is `p or !p`. A common logical equivalence is De Morgan's Law: `!(p and q) <=> !p or !q`. This is a great place to practice writing logical expressions.",
    replies: [],
    createdAt: subHours(new Date(), 5).toISOString(), // 5 hours ago
    repliesCount: 0, // Will be updated later
    goodVotes: 7,
    badVotes: 0,
  },
];

// Generate 20 additional threads
const additionalMockThreads: IForumThread[] = Array.from({ length: 20 }).map(
  () => generateMockThread()
);

// Combine initial and additional threads
export const allMockThreads: IForumThread[] = [
  ...initialMockThreads,
  ...additionalMockThreads,
].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
); // Sort threads by creation date (newest first)

// Generate 30 additional replies + initial replies (9 total)
const totalAdditionalRepliesNeeded = 30 - 9; // 30 more than the initial hand-coded ones
const generatedReplies: IReply[] = Array.from({
  length: totalAdditionalRepliesNeeded,
}).map(() => {
  // Assign these replies to any of the mock threads (initial or additional)
  const randomThread =
    allMockThreads[Math.floor(Math.random() * allMockThreads.length)];
  return generateMockReply(randomThread.id);
});

// Hand-coded initial replies with threadId
const initialMockReplies: IReply[] = [
  {
    id: "r1_thread1",
    author: "CalcKid",
    content:
      "What is a derivative? Like, if you have `f(x) = x^2`, is the derivative `f'(x) = 2x`? What about `g(x) = sin(x)`? Is `g'(x) = cos(x)`?",
    goodVotes: 5,
    badVotes: 3,
    createdAt: subHours(new Date(), 2).toISOString(),
    threadId: "1",
  },
  {
    id: "r2_thread1",
    author: "LimitLover",
    content:
      "Limits are tricky. `lim_(x->0) sin(x)/x = 1` is a classic!\n\nAnother good one is `lim_(n->oo) (1 + 1/n)^n = e`. Also, don't forget L'Hopital's rule for indeterminate forms like `lim_(x->c) f(x)/g(x)` when `lim_(x->c) f(x) = lim_(x->c) g(x) = 0` or `+-oo`. It states that `lim_(x->c) f(x)/g(x) = lim_(x->c) f'(x)/g'(x)`.",
    goodVotes: 15,
    badVotes: 1,
    createdAt: subHours(new Date(), 1.5).toISOString(),
    threadId: "1",
  },
  {
    id: "r3_thread2",
    author: "MatrixMaster",
    content:
      "Eigenvalues are fun! Consider the matrix `A = [[2, 1], [1, 2]]`. The eigenvalues lambda satisfy `det(A - lambda I) = 0`. The characteristic equation is `(2-lambda)^2 - 1 = 0`. What about larger matrices, like a `3x3` matrix `B = [[1, 2, 3], [0, 1, 4], [5, 6, 0]]`? Finding its eigenvalues is more complex.",
    goodVotes: 8,
    badVotes: 0,
    createdAt: subMinutes(new Date(), 30).toISOString(),
    threadId: "2",
  },
  {
    id: "r4_thread3",
    author: "GeoGeek",
    content:
      "Does anyone have good resources for non-Euclidean geometry? I'm particularly interested in the curvature `kappa`. How does it relate to the sum of angles in a triangle? In Euclidean geometry, the sum of angles `alpha + beta + gamma = pi` radians (`180^@`), but this is not true for non-Euclidean spaces.",
    goodVotes: 3,
    badVotes: 2,
    createdAt: subMinutes(new Date(), 10).toISOString(),
    threadId: "3",
  },
  {
    id: "r5_thread1",
    author: "MathGuru",
    content:
      "That limit example is great, @LimitLover! Yes, `lim_(x->0) sin(x)/x = 1` is fundamental. For the derivative, @CalcKid, you are correct! The derivative of `sin(x)` is indeed `cos(x)`. We can prove this using the limit definition: `(d)/(dx)sin(x) = lim_(h->0) (sin(x+h) - sin(x))/h`.",
    goodVotes: 7,
    badVotes: 0,
    createdAt: subMinutes(new Date(), 5).toISOString(),
    threadId: "1",
  },
  {
    id: "r6_thread1",
    author: "AlgebraFan",
    content:
      "What about solving quadratic equations? The formula is `x = (-b pm sqrt(b^2 - 4ac)) / (2a)`. This is derived using completing the square. For example, if `ax^2 + bx + c = 0`, divide by `a` (`a != 0`) to get `x^2 + (b/a)x + (c/a) = 0`.",
    goodVotes: 10,
    badVotes: 0,
    createdAt: subMinutes(new Date(), 1).toISOString(),
    threadId: "1",
  },
  {
    id: "r7_thread4",
    author: "StatSage",
    content:
      "Does anyone work with probability? What is the formula for the probability of the union of two events A and B? It's `P(A uu B) = P(A) + P(B) - P(A nn B)`. And for disjoint events, `P(A nn B) = 0`, so `P(A uu B) = P(A) + P(B)`.",
    goodVotes: 9,
    badVotes: 1,
    createdAt: subMinutes(new Date(), 45).toISOString(),
    threadId: "4",
  },
  {
    id: "r8_thread5",
    author: "LogicLover",
    content:
      "Just started learning about propositional logic. If p and q are propositions, is the statement `p => q` equivalent to `!p or q`? Yes, it is! What about `p iff q`? That's equivalent to `(p => q) and (q => p)`.",
    goodVotes: 6,
    badVotes: 0,
    createdAt: subMinutes(new Date(), 20).toISOString(),
    threadId: "5",
  },
  {
    id: "r9_thread1",
    author: "MathGuru",
    content:
      "Regarding integrals, calculating definite integrals often involves the Fundamental Theorem of Calculus: `int_a^b f(x) dx = F(b) - F(a)`, where F is an antiderivative of f. For example, `int_0^1 x^2 dx = [x^3/3]_0^1 = 1^3/3 - 0^3/3 = 1/3`.",
    goodVotes: 12,
    badVotes: 0,
    createdAt: subMinutes(new Date(), 3).toISOString(),
    threadId: "1",
  },
];

export const allMockReplies: IReply[] = [
  ...initialMockReplies,
  ...generatedReplies,
].sort(
  (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
); // Sort replies by date (oldest first)

// Update repliesCount for all threads based on the combined reply list
allMockThreads.forEach((thread) => {
  thread.repliesCount = allMockReplies.filter(
    (reply) => reply.threadId === thread.id
  ).length;
});

// Mock function to get a list of posts for the homepage with pagination
export const getMockPosts = (
  page: number,
  pageSize: number
): { posts: IForumPost[]; totalCount: number } => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedPosts = allMockThreads
    .slice(startIndex, endIndex)
    .map((thread) => ({
      id: thread.id,
      title: thread.title,
      author: thread.author,
      repliesCount: thread.repliesCount,
      createdAt: thread.createdAt,
      goodVotes: thread.goodVotes,
      badVotes: thread.badVotes,
    }));

  return {
    posts: paginatedPosts,
    totalCount: allMockThreads.length,
  };
};

// Mock function to get a specific thread (without replies)
export const getMockThread = (threadId: string): IForumThread | undefined => {
  // Find the thread details, but don't include the full replies array here
  const thread = allMockThreads.find((thread) => thread.id === threadId);
  if (!thread) return undefined;

  // Return thread details without the replies array
  // Create a shallow copy to ensure 'replies' is not present
  const threadDetails: IForumThread = {
    id: thread.id,
    title: thread.title,
    author: thread.author,
    content: thread.content,
    createdAt: thread.createdAt,
    repliesCount: thread.repliesCount,
    goodVotes: thread.goodVotes,
    badVotes: thread.badVotes,
    replies: [], // Explicitly set replies to an empty array
  };
  return threadDetails;
};

// Mock function to get replies for a specific thread with pagination
export const getMockRepliesForThread = (
  threadId: string,
  page: number,
  pageSize: number
): { replies: IReply[]; totalCount: number } => {
  const threadReplies = allMockReplies.filter(
    (reply) => reply.threadId === threadId
  );
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedReplies = threadReplies.slice(startIndex, endIndex);

  return {
    replies: paginatedReplies,
    totalCount: threadReplies.length,
  };
};

// Mock search function
export const searchMock = (keyword: string): (IForumPost | IReply)[] => {
  const lowerKeyword = keyword.toLowerCase();

  // Simple search logic: match keyword in title or content (case-insensitive)
  const matchedThreads = allMockThreads
    .filter(
      (thread) =>
        thread.title.toLowerCase().includes(lowerKeyword) ||
        thread.content.toLowerCase().includes(lowerKeyword)
    )
    .map((thread) => {
      // Return as IForumPost for search results
      const { ...postDetails } = thread;
      return {
        ...postDetails,
        repliesCount: thread.repliesCount,
      } as IForumPost;
    });

  const matchedReplies = allMockReplies.filter((reply) =>
    reply.content.toLowerCase().includes(lowerKeyword)
  ); // Replies are already in IReply format

  // Combine results (you might want to sort or group them in a real app)
  // For simplicity, just return a combined array for now
  return [...matchedThreads, ...matchedReplies].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ); // Sort by date newest first
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
