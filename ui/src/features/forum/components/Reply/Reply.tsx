import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IReply, EditorMode } from "../../types/forumTypes";
import MessageContent from "../MessageContent/MessageContent";
import TextEditor from "../TextEditor/TextEditor";
import RelativeTime from "../RelativeTime/RelativeTime";
import useAuthStore from "../../../auth/hooks/useAuthStore";
import { createReply } from "../../api/forumApi";
import { getMockRepliesForThread } from "../../api/mockData";

interface ReplyProps {
  reply: IReply;
  replyNumber: number;
  threadId: string;
}

const Reply: React.FC<ReplyProps> = ({ reply, replyNumber, threadId }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [newReplyContent, setNewReplyContent] = useState("");
  const [newReplyMode, setNewReplyMode] = useState<EditorMode>("embed");
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const replyMode: EditorMode = "embed";

  const mutation = useMutation({
    mutationFn: ({
      threadId,
      replyData,
    }: {
      threadId: string;
      replyData: {
        content: string;
        mode: EditorMode;
        author: string;
        parentReplyId?: string;
      };
    }) => createReply(threadId, replyData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threadReplies", threadId] });
      setNewReplyContent("");
      setNewReplyMode("embed");
      setShowReplyForm(false);
    },
    onError: (error) => {
      console.error("Error creating nested reply:", error);
    },
  });

  const handleReplyChange = (value: string, mode: EditorMode) => {
    setNewReplyContent(value);
    setNewReplyMode(mode);
  };

  const handleSubmitNestedReply = () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }
    const replyData = {
      threadId,
      content: newReplyContent,
      mode: newReplyMode,
      author: user.username,
      parentReplyId: reply.id, // Set this reply as the parent for the new reply
    };
    mutation.mutate({ threadId, replyData });
  };

  // Determine if this reply is targeting another reply and find its number
  const getParentReplyNumber = () => {
    if (!reply.parentReplyId) return null;
    const allReplies = getMockRepliesForThread(
      threadId,
      1,
      Number.MAX_SAFE_INTEGER
    ).replies;
    const parentIndex = allReplies.findIndex(
      (r) => r.id === reply.parentReplyId
    );
    return parentIndex >= 0 ? parentIndex + 1 : null;
  };

  const parentReplyNumber = getParentReplyNumber();

  return (
    <div className="bg-[color:var(--color-surface)] rounded-[var(--border-radius-md)] shadow-sm p-[var(--spacing-md)] mb-[var(--spacing-md)] border border-[color:var(--color-border)]">
      <div className="flex items-center mb-[var(--spacing-xs)] gap-[var(--spacing-sm)] flex-wrap">
        <span className="text-gray-500 italic font-normal text-sm mr-[var(--spacing-xs)]">
          #{replyNumber}
          {parentReplyNumber && (
            <span className="ml-2 text-gray-500 italic text-sm">
              &nbsp;replies to #{parentReplyNumber}
            </span>
          )}
        </span>
        <span className="text-sm font-semibold text-[color:var(--color-primary)]">
          @{reply.author}
        </span>
        <button className="btn-text text-[color:var(--color-secondary)]">
          👍 {reply.goodVotes}
        </button>
        <button className="btn-text text-[color:var(--color-danger)]">
          👎 {reply.badVotes}
        </button>
        <button
          className="btn-text text-[color:var(--color-primary)]"
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          Reply
        </button>
        <span className="text-xs text-[color:var(--color-text-secondary)] ml-auto">
          <RelativeTime dateString={reply.createdAt} />
        </span>
      </div>

      <MessageContent content={reply.content} mode={replyMode} />

      {showReplyForm && (
        <div className="mt-[var(--spacing-md)] pt-[var(--spacing-md)] border-t border-[color:var(--color-border)]">
          <h4 className="text-md font-semibold mb-[var(--spacing-md)]">
            Reply to #{replyNumber}
          </h4>
          <TextEditor value={newReplyContent} onChange={handleReplyChange} />
          <button
            className="mt-[var(--spacing-md)] btn btn-primary btn-sm"
            onClick={handleSubmitNestedReply}
            disabled={mutation.isPending || !user}
          >
            {mutation.isPending
              ? "Submitting..."
              : `Submit Reply to #${replyNumber}`}
          </button>
          <button
            className="mt-[var(--spacing-md)] ml-[var(--spacing-sm)] btn btn-default btn-sm"
            onClick={() => setShowReplyForm(false)}
          >
            Cancel
          </button>
          {mutation.isError && (
            <p className="text-[color:var(--color-danger)] mt-[var(--spacing-md)]">
              Error submitting reply: {mutation.error.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Reply;
