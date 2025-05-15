import React, { useState } from "react";
import type { IReply, EditorMode } from "../../types/forumTypes"; // Use new interface name and import EditorMode
import MessageContent from "../MessageContent/MessageContent"; // Import MessageContent
import TextEditor from "../TextEditor/TextEditor"; // Import TextEditor
import RelativeTime from "../RelativeTime/RelativeTime";

interface ReplyProps {
  reply: IReply; // Use new interface name
  replyNumber: number; // Add prop for the reply number
  threadId: string; // Need threadId to submit nested reply
  // Add vote handlers later
  // onVoteGood: (replyId: string) => void;
  // onVoteBad: (replyId: string) => void;
  // onNewReplySubmit: (threadId: string, parentReplyId: string | null, content: string, mode: EditorMode) => void; // Function to handle nested reply submission
}

const Reply: React.FC<ReplyProps> = ({
  reply,
  replyNumber,
  threadId /*, onNewReplySubmit*/,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [newReplyContent, setNewReplyContent] = useState("");
  const [newReplyMode, setNewReplyMode] = useState<EditorMode>("embed");

  // Determine the mode for the reply content (assuming 'embed' for now, or add a mode property to IReply)
  const replyMode: EditorMode = "embed"; // Or reply.mode if you add it to the type

  const handleReplyChange = (value: string, mode: EditorMode) => {
    setNewReplyContent(value);
    setNewReplyMode(mode);
  };

  const handleSubmitNestedReply = () => {
    console.log("Submitting Nested Reply:", {
      threadId: threadId,
      parentReplyId: reply.id,
      content: newReplyContent,
      mode: newReplyMode,
    });
    // Call the parent handler to submit the nested reply
    // onNewReplySubmit(threadId, reply.id, newReplyContent, newReplyMode);
    // Reset form and hide it
    setNewReplyContent("");
    setNewReplyMode("embed");
    setShowReplyForm(false);
  };

  return (
    <div className="bg-[color:var(--color-surface)] rounded-[var(--border-radius-md)] shadow-sm p-[var(--spacing-md)] mb-[var(--spacing-md)] border border-[color:var(--color-border)]">
      {/* Display reply number, author, and buttons */}
      {/* Use flex to align items and gap for spacing */}
      <div className="flex items-center mb-[var(--spacing-xs)] gap-[var(--spacing-sm)] flex-wrap">
        {" "}
        {/* Added flex-wrap for smaller screens */}
        {/* Removed order-badge class - Apply grey italic text */}
        <span className="text-gray-500 italic font-normal text-sm mr-[var(--spacing-xs)]">
          #{replyNumber}
        </span>
        <span className="text-sm font-semibold text-[color:var(--color-primary)]">
          @{reply.author} {/* Removed colon */}
        </span>
        {/* Good and Bad buttons moved next to username, using btn-text style */}
        <button className="btn-text text-[color:var(--color-secondary)]">
          👍 {reply.goodVotes}
        </button>
        <button className="btn-text text-[color:var(--color-danger)]">
          👎 {reply.badVotes}
        </button>
        {/* Reply button - text-based */}
        <button
          className="btn-text text-[color:var(--color-primary)]"
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          Reply
        </button>
        {/* Add date using RelativeTime component */}
        <span className="text-xs text-[color:var(--color-text-secondary)] ml-auto">
          <RelativeTime dateString={reply.createdAt} />
        </span>
      </div>

      {/* Reply Content (Use MessageContent component here) */}
      <MessageContent content={reply.content} mode={replyMode} />

      {/* Date formatting removed here, now above */}
      {/* <p className="text-xs text-[color:var(--color-text-secondary)] mt-1">
    - <RelativeTime dateString={reply.createdAt} />
   </p> */}

      {/* Nested Reply Form (conditionally rendered) */}
      {showReplyForm && (
        <div className="mt-[var(--spacing-md)] pt-[var(--spacing-md)] border-t border-[color:var(--color-border)]">
          <h4 className="text-md font-semibold mb-[var(--spacing-md)]">
            Reply to #{replyNumber}
          </h4>
          <TextEditor value={newReplyContent} onChange={handleReplyChange} />
          {/* Submit button for nested reply */}
          <button
            className="mt-[var(--spacing-md)] btn btn-primary btn-sm"
            onClick={handleSubmitNestedReply}
          >
            Submit Reply to #{replyNumber} {/* Updated button text */}
          </button>
          {/* Optional: Cancel button */}
          <button
            className="mt-[var(--spacing-md)] ml-[var(--spacing-sm)] btn btn-default btn-sm"
            onClick={() => setShowReplyForm(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Reply;
