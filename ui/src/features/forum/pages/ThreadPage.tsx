import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchThread,
  fetchRepliesForThread,
  createReply,
} from "../api/forumApi";
import MessageContent from "../components/MessageContent/MessageContent";
import Reply from "../components/Reply/Reply";
import type { EditorMode, IForumThread, IReply } from "../types/forumTypes";
import TextEditor from "../components/TextEditor/TextEditor";
import RelativeTime from "../components/RelativeTime/RelativeTime";
import useAuthStore from "../../auth/hooks/useAuthStore";

const ThreadPage: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const [showMainReplyForm, setShowMainReplyForm] = useState(false);
  const [mainReplyContent, setMainReplyContent] = useState("");
  const [mainReplyMode, setMainReplyMode] = useState<EditorMode>("embed");

  const {
    data: thread,
    isLoading: isLoadingThread,
    error: threadError,
  } = useQuery<IForumThread | null, Error>({
    queryKey: ["forumThread", threadId],
    queryFn: () => fetchThread(threadId!),
    enabled: !!threadId,
  });

  const repliesPerPage = 10;
  const [currentReplyPage, setCurrentReplyPage] = useState(1);

  const {
    data: repliesData,
    isLoading: isLoadingReplies,
    error: repliesError,
  } = useQuery<{ replies: IReply[]; totalCount: number }, Error>({
    queryKey: ["threadReplies", threadId, currentReplyPage, repliesPerPage],
    queryFn: () =>
      fetchRepliesForThread(threadId!, currentReplyPage, repliesPerPage),
    enabled: !!threadId,
    placeholderData: (previousData) => previousData,
  });

  const replies = repliesData?.replies;
  const totalReplyCount = repliesData?.totalCount || 0;
  const totalReplyPages = Math.ceil(totalReplyCount / repliesPerPage);

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
      setMainReplyContent("");
      setMainReplyMode("embed");
      setShowMainReplyForm(false);
    },
    onError: (error) => {
      console.error("Error creating reply:", error);
    },
  });

  const handlePreviousReplyPage = () => {
    setCurrentReplyPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextReplyPage = () => {
    setCurrentReplyPage((prev) => Math.min(prev + 1, totalReplyPages));
  };

  const handleMainReplyChange = (value: string, mode: EditorMode) => {
    setMainReplyContent(value);
    setMainReplyMode(mode);
  };

  const handleSubmitMainReply = () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }
    const replyData = {
      threadId: threadId!,
      content: mainReplyContent,
      mode: mainReplyMode,
      author: user.username,
      parentReplyId: undefined, // Main thread replies don't target a specific reply
    };
    mutation.mutate({ threadId: threadId!, replyData });
  };

  const handleGoBack = () => {
    navigate(-1);
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

  const mainPostMode: EditorMode = "embed";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{thread.title}</h1>
      <p className="text-sm text-[color:var(--color-text-secondary)] mb-[var(--spacing-md)]">
        <RelativeTime dateString={thread.createdAt} />
      </p>

      <div className="bg-[color:var(--color-surface)] rounded-[var(--border-radius-md)] shadow-sm p-[var(--spacing-md)] mb-[var(--spacing-md)] border border-[color:var(--color-border)]">
        <div className="flex items-center mb-[var(--spacing-xs)] gap-[var(--spacing-sm)] flex-wrap">
          <span className="text-sm font-semibold text-[color:var(--color-primary)]">
            @{thread.author}
          </span>
          <button className="btn-text text-[color:var(--color-secondary)]">
            👍 {thread.goodVotes}
          </button>
          <button className="btn-text text-[color:var(--color-danger)]">
            👎 {thread.badVotes}
          </button>
          <button
            className="btn-text text-[color:var(--color-primary)]"
            onClick={() => setShowMainReplyForm(!showMainReplyForm)}
          >
            Reply
          </button>
        </div>

        <MessageContent content={thread.content} mode={mainPostMode} />

        {showMainReplyForm && (
          <div className="mt-[var(--spacing-md)] pt-[var(--spacing-md)] border-t border-[color:var(--color-border)]">
            <h3 className="text-lg font-semibold mb-[var(--spacing-md)]">
              Reply to Thread
            </h3>
            <TextEditor
              value={mainReplyContent}
              onChange={handleMainReplyChange}
            />
            <button
              className="mt-[var(--spacing-md)] btn btn-primary"
              onClick={handleSubmitMainReply}
              disabled={mutation.isPending || !user}
            >
              {mutation.isPending ? "Submitting..." : "Submit Reply"}
            </button>
            <button
              className="mt-[var(--spacing-md)] ml-[var(--spacing-sm)] btn btn-default"
              onClick={() => setShowMainReplyForm(false)}
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

      <h2 className="text-xl font-semibold mb-[var(--spacing-md)]">
        {totalReplyCount} Replies
      </h2>

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
          {replies.map((reply, index) => (
            <Reply
              key={reply.id}
              reply={reply}
              replyNumber={(currentReplyPage - 1) * repliesPerPage + index + 1}
              threadId={thread.id}
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
