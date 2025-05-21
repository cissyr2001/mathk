import { subDays, subHours, subMinutes } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import type {
  IForumPost,
  IForumThread,
  IReply,
  IUser,
  ICreatePostPayload,
  ICreateReplyPayload,
} from "../types/forumTypes";

export const mockUsers: IUser[] = [
  { id: "user1", username: "MathGuru", password: "password123" },
  { id: "user2", username: "AlgebraFan", password: "password456" },
  { id: "user3", username: "CalcKid", password: "password789" },
  { id: "user4", username: "LimitLover", password: "securepassword" },
  { id: "user5", username: "MatrixMaster", password: "mysecret" },
  { id: "user6", username: "GeoGeek", password: "geometrypass" },
  { id: "user7", username: "StatSage", password: "statistics" },
  { id: "user8", username: "LogicLover", password: "boolean" },
  { id: "user9", username: "PhysicsFan", password: "einstein" },
  { id: "user10", username: "ChemWhiz", password: "periodic" },
  { id: "user11", username: "BioStudent", password: "dna" },
  { id: "user12", username: "EcoAnalyst", password: "supplydemand" },
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
    "`p => q <=> !q or q`",
    "`sigma^2 = 1/N sum_(i=1)^N (x_i - bar(x))^2`",
    "`oint_C vec(F) * d vec(r) = int int_S (nabla xx vec(F)) * d vec(S)`",
    "`partial^2 f / partial x partial y = partial^2 f / partial y partial x`",
    "`prod_(i=1)^n a_i`",
    "`abs(x)`",
    "`ceil(x)`",
    "`floor(x)`",
    "`vec(a) * (vec(b) xx vec(c))`",
    "`A nn B = {x | x in A and x in B}`",
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
    if (Math.random() > 0.4) {
      content +=
        mathExamples[Math.floor(Math.random() * mathExamples.length)] + ". ";
    }
  }
  if (content.length > 80 && !content.includes("`")) {
    content +=
      " Consider the formula: " +
      mathExamples[Math.floor(Math.random() * mathExamples.length)] +
      ".";
  }

  return content.trim();
};

const generateMockReply = (
  threadId: string,
  content?: string,
  mode?: string,
  parentReplyId?: string
): IReply => {
  const id = uuidv4();
  const author = getRandomUser().username;
  const replyContent =
    content || generateLoremMath(Math.random() > 0.3 ? 2 : 1);
  const createdAt = generateRandomDate(48);

  return {
    id,
    author,
    content: replyContent,
    votes: 0,
    goodVotes: Math.floor(Math.random() * 30),
    badVotes: Math.floor(Math.random() * 8),
    createdAt,
    threadId,
    parentReplyId, // Include parentReplyId
  };
};

const generateMockThread = (postData?: ICreatePostPayload): IForumThread => {
  const id = uuidv4();
  const author = postData?.author || getRandomUser().username;
  const title =
    postData?.title ||
    `Thread ${uuidv4().slice(0, 4)}: ${generateLoremMath(1)
      .slice(0, 60)
      .replace(/\.$/, "")}...`;
  const content =
    postData?.content || generateLoremMath(Math.random() > 0.2 ? 5 : 3);
  const createdAt = generateRandomDate(60 * 24);

  return {
    id,
    title,
    author,
    content,
    replies: [],
    createdAt,
    repliesCount: 0,
    goodVotes: Math.floor(Math.random() * 100),
    badVotes: Math.floor(Math.random() * 20),
  };
};

const initialMockThreads: IForumThread[] = [
  {
    id: "1",
    title: "Introduction to Calculus",
    author: "MathGuru",
    content:
      "Discussing the fundamentals of calculus, including limits, derivatives, and integrals. Ask your basic questions here!\n\nFor example, what is the integral of `x^n`? It's `int x^n dx = x^(n+1)/(n+1) + C` (for `n != -1`). We can also look at related concepts like sequences and series. A common series is the geometric series: `sum_(n=0)^oo r^n = 1/(1-r)` for `|r| < 1`. This is a great example of an infinite sum converging to a finite value.",
    replies: [],
    createdAt: subDays(new Date(), 3).toISOString(),
    repliesCount: 0,
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
    createdAt: subDays(new Date(), 2).toISOString(),
    repliesCount: 0,
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
    createdAt: subDays(new Date(), 1).toISOString(),
    repliesCount: 0,
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
    createdAt: subHours(new Date(), 10).toISOString(),
    repliesCount: 0,
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
    createdAt: subHours(new Date(), 5).toISOString(),
    repliesCount: 0,
    goodVotes: 7,
    badVotes: 0,
  },
];

const additionalMockThreads: IForumThread[] = Array.from({ length: 20 }).map(
  () => generateMockThread()
);

export const allMockThreads: IForumThread[] = [
  ...initialMockThreads,
  ...additionalMockThreads,
].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);

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
    parentReplyId: "r1_thread1", // Targeting r1_thread1
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
    parentReplyId: "r2_thread1", // Targeting r2_thread1
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
    parentReplyId: "r1_thread1", // Targeting r1_thread1
  },
];

const totalAdditionalRepliesNeeded = 30 - 9;
const generatedReplies: IReply[] = Array.from({
  length: totalAdditionalRepliesNeeded,
}).map(() => {
  const randomThread =
    allMockThreads[Math.floor(Math.random() * allMockThreads.length)];
  // Randomly assign parentReplyId to some replies
  const threadReplies = initialMockReplies.filter(
    (r) => r.threadId === randomThread.id
  );
  const parentReplyId =
    Math.random() > 0.7 && threadReplies.length > 0
      ? threadReplies[Math.floor(Math.random() * threadReplies.length)].id
      : undefined;
  return generateMockReply(
    randomThread.id,
    undefined,
    undefined,
    parentReplyId
  );
});

export const allMockReplies: IReply[] = [
  ...initialMockReplies,
  ...generatedReplies,
].sort(
  (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
);

allMockThreads.forEach((thread) => {
  thread.repliesCount = allMockReplies.filter(
    (reply) => reply.threadId === thread.id
  ).length;
});

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

export const getMockThread = (threadId: string): IForumThread | undefined => {
  const thread = allMockThreads.find((thread) => thread.id === threadId);
  if (!thread) return undefined;

  const threadDetails: IForumThread = {
    id: thread.id,
    title: thread.title,
    author: thread.author,
    content: thread.content,
    createdAt: thread.createdAt,
    repliesCount: thread.repliesCount,
    goodVotes: thread.goodVotes,
    badVotes: thread.badVotes,
    replies: [],
  };
  return threadDetails;
};

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

export const searchMock = (keyword: string): (IForumPost | IReply)[] => {
  const lowerKeyword = keyword.toLowerCase();

  const matchedThreads = allMockThreads
    .filter(
      (thread) =>
        thread.title.toLowerCase().includes(lowerKeyword) ||
        thread.content.toLowerCase().includes(lowerKeyword)
    )
    .map((thread) => {
      const { ...postDetails } = thread;
      return {
        ...postDetails,
        repliesCount: thread.repliesCount,
      } as IForumPost;
    });

  const matchedReplies = allMockReplies.filter((reply) =>
    reply.content.toLowerCase().includes(lowerKeyword)
  );

  return [...matchedThreads, ...matchedReplies].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const findMockUser = (
  username: string,
  password: string
): IUser | undefined => {
  return mockUsers.find(
    (user) => user.username === username && user.password === password
  );
};

export const createMockPost = (postData: ICreatePostPayload): IForumThread => {
  const newThread = generateMockThread(postData);
  allMockThreads.unshift(newThread);
  return newThread;
};

export const createMockReply = (
  threadId: string,
  replyData: ICreateReplyPayload
): IReply => {
  const newReply = generateMockReply(
    threadId,
    replyData.content,
    replyData.mode,
    replyData.parentReplyId
  );
  allMockReplies.push(newReply);
  const thread = allMockThreads.find((t) => t.id === threadId);
  if (thread) {
    thread.repliesCount = (thread.repliesCount || 0) + 1;
  }
  return newReply;
};
