import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react"; // Import useState
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { fetchThread, fetchRepliesForThread } from "../api/forumApi"; // Import fetchRepliesForThread
import MessageContent from "../components/MessageContent/MessageContent";
import Reply from "../components/Reply/Reply";
import type { EditorMode, IForumThread, IReply } from "../types/forumTypes"; // Use new interface name
import TextEditor from "../components/TextEditor/TextEditor"; // Import TextEditor
import RelativeTime from "../components/RelativeTime/RelativeTime";

const ThreadPage: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const navigate = useNavigate(); // Get navigate function

  // State for the main thread reply form
  const [showMainReplyForm, setShowMainReplyForm] = useState(false);
  const [mainReplyContent, setMainReplyContent] = useState("");
  const [mainReplyMode, setMainReplyMode] = useState<EditorMode>("embed");

  // Fetch Thread Details (without replies)
  const {
    data: thread,
    isLoading: isLoadingThread,
    error: threadError,
  } = useQuery<IForumThread | null, Error>({
    queryKey: ["forumThread", threadId],
    queryFn: () => fetchThread(threadId!),
    enabled: !!threadId,
  });

  // --- Fetch Replies with Pagination ---
  const repliesPerPage = 10; // Default page size for replies
  const [currentReplyPage, setCurrentReplyPage] = useState(1);

  const {
    data: repliesData,
    isLoading: isLoadingReplies,
    error: repliesError,
  } = useQuery<{ replies: IReply[]; totalCount: number }, Error>({
    queryKey: ["threadReplies", threadId, currentReplyPage, repliesPerPage], // Include pagination in query key
    queryFn: () =>
      fetchRepliesForThread(threadId!, currentReplyPage, repliesPerPage), // Fetch paginated replies
    enabled: !!threadId, // Only fetch if threadId is available
    placeholderData: (previousData) => previousData, // Keep previous data while fetching next page
    // keepPreviousData: true, // Optional: prevents flash when changing pages
  });

  const replies = repliesData?.replies;
  const totalReplyCount = repliesData?.totalCount || 0;
  const totalReplyPages = Math.ceil(totalReplyCount / repliesPerPage);

  const handlePreviousReplyPage = () => {
    setCurrentReplyPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextReplyPage = () => {
    setCurrentReplyPage((prev) => Math.min(prev + 1, totalReplyPages));
  };
  // --- End Fetch Replies with Pagination ---

  // Handlers for the main thread reply form
  const handleMainReplyChange = (value: string, mode: EditorMode) => {
    setMainReplyContent(value);
    setMainReplyMode(mode);
  };

  const handleSubmitMainReply = () => {
    console.log("Submitting Main Reply to Thread:", {
      threadId: threadId,
      content: mainReplyContent,
      mode: mainReplyMode,
    });
    // You will implement the actual API call here later
    // using a mutation from TanStack Query
    setMainReplyContent("");
    setMainReplyMode("embed");
    setShowMainReplyForm(false); // Hide form after submit (or on success in real app)
  };

  // Handle back button click
  const handleGoBack = () => {
    navigate(-1); // Go back one step in history
  };

  if (isLoadingThread) {
    return (
      <div className="text-center p-[var(--spacing-lg)]">Loading thread...</div>
    );
  }

  if (threadError) {
    return (
      <div className="text-center text-[color:var(--color-danger)] p-[var(--spacing-lg)]">
        Error loading thread: {threadError.message}
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="text-center p-[var(--spacing-lg)]">Thread not found.</div>
    );
  }

  // Determine the mode for the main post content (assuming 'embed' for now, or add a mode property to IForumThread)
  const mainPostMode: EditorMode = "embed"; // Or thread.mode if you add it to the type

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{thread.title}</h1>
      <p className="text-sm text-[color:var(--color-text-secondary)] mb-[var(--spacing-md)]">
        <RelativeTime dateString={thread.createdAt} />
      </p>

      {/* Main Post Content */}
      <div className="bg-[color:var(--color-surface)] rounded-[var(--border-radius-md)] shadow-sm p-[var(--spacing-md)] mb-[var(--spacing-md)] border border-[color:var(--color-border)]">
        {/* Display main post indicator, author, and buttons */}
        {/* Use flex to align items and gap for spacing */}
        <div className="flex items-center mb-[var(--spacing-xs)] gap-[var(--spacing-sm)] flex-wrap">
          {" "}
          {/* Added flex-wrap */}
          {/* Removed order-badge class - Apply grey italic text */}
          {/* <span className="text-gray-500 italic font-normal text-sm mr-[var(--spacing-xs)]">#0</span> */}
          <span className="text-sm font-semibold text-[color:var(--color-primary)]">
            @{thread.author} {/* Removed colon */}
          </span>
          {/* Add voting buttons for the main post here */}
          {/* Use the new btn-text classes and emojis */}
          <button className="btn-text text-[color:var(--color-secondary)]">
            👍 {thread.goodVotes}
          </button>
          <button className="btn-text text-[color:var(--color-danger)]">
            👎 {thread.badVotes}
          </button>
          {/* Add a 'Reply' button for the main post */}
          <button
            className="btn-text text-[color:var(--color-primary)]"
            onClick={() => setShowMainReplyForm(!showMainReplyForm)} // Toggle main reply form
          >
            Reply
          </button>
        </div>

        {/* Use MessageContent for main post */}
        <MessageContent content={thread.content} mode={mainPostMode} />

        {/* Main Reply Form (conditionally rendered INSIDE the main post container) */}
        {showMainReplyForm && (
          <div className="mt-[var(--spacing-md)] pt-[var(--spacing-md)] border-t border-[color:var(--color-border)]">
            {" "}
            {/* Keep border/padding for visual separation */}
            <h3 className="text-lg font-semibold mb-[var(--spacing-md)]">
              Reply to Thread
            </h3>
            <TextEditor
              value={mainReplyContent}
              onChange={handleMainReplyChange}
            />
            {/* Submit button for main reply */}
            <button
              className="mt-[var(--spacing-md)] btn btn-primary"
              onClick={handleSubmitMainReply}
            >
              Submit Reply
            </button>
            {/* Optional: Cancel button */}
            <button
              className="mt-[var(--spacing-md)] ml-[var(--spacing-sm)] btn btn-default"
              onClick={() => setShowMainReplyForm(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-[var(--spacing-md)]">
        {totalReplyCount} Replies
      </h2>

      {/* List of Replies */}
      {isLoadingReplies && (
        <div className="text-center p-[var(--spacing-sm)]">
          Loading replies...
        </div>
      )}
      {repliesError && (
        <div className="text-center text-[color:var(--color-danger)] p-[var(--spacing-sm)]">
          Error loading replies: {repliesError.message}
        </div>
      )}
      {replies && replies.length > 0 ? (
        <div>
          {/* Pass the index+1 as replyNumber and the threadId */}
          {replies.map((reply, index) => (
            <Reply
              key={reply.id}
              reply={reply}
              // Calculate the global reply number
              replyNumber={(currentReplyPage - 1) * repliesPerPage + index + 1}
              threadId={
                thread.id
              } /* Pass threadId */ /* onNewReplySubmit={handleNestedReplySubmit} */
            />
          ))}
        </div>
      ) : (
        !isLoadingReplies && (
          <div className="text-center p-[var(--spacing-sm)]">
            No replies yet.
          </div>
        )
      )}

      {/* Reply Pagination Controls (Basic Previous/Next) */}
      {totalReplyPages > 1 && (
        <div className="flex justify-center items-center gap-[var(--spacing-md)] mt-[var(--spacing-md)]">
          <button
            className="btn btn-default btn-sm"
            onClick={handlePreviousReplyPage}
            disabled={currentReplyPage === 1 || isLoadingReplies}
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentReplyPage} of {totalReplyPages}
          </span>
          <button
            className="btn btn-default btn-sm"
            onClick={handleNextReplyPage}
            disabled={currentReplyPage === totalReplyPages || isLoadingReplies}
          >
            Next
          </button>
        </div>
      )}

      {/* Back button */}
      <div className="mt-[var(--spacing-lg)] text-center">
        <button onClick={handleGoBack} className="btn btn-default">
          Back
        </button>
        {isLoadingReplies && (
          <span className="ml-[var(--spacing-md)] text-sm text-gray-500">
            Loading replies...
          </span>
        )}
      </div>
    </div>
  );
};

export default ThreadPage;
