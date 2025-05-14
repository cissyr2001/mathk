// src/features/forum/pages/ThreadPage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchThread } from '../api/forumApi';
import type { IForumThread, EditorMode } from '../types/forumTypes'; // Use new interface name
import Reply from '../components/Reply/Reply';
import TextEditor from '../components/TextEditor/TextEditor';
import MessageContent from '../components/MessageContent/MessageContent';


const ThreadPage: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>();

  const [newReplyContent, setNewReplyContent] = useState('');
  const [newReplyMode, setNewReplyMode] = useState<EditorMode>('embed');

  const { data: thread, isLoading, error } = useQuery<IForumThread | null, Error>({ // Use new interface name
    queryKey: ['forumThread', threadId],
    queryFn: () => fetchThread(threadId!),
    enabled: !!threadId,
  });

  const handleReplyChange = (value: string, mode: EditorMode) => {
    setNewReplyContent(value);
    setNewReplyMode(mode);
  };

  const handleSubmitReply = () => {
      console.log('Submitting Reply:', {
          threadId: threadId,
          content: newReplyContent,
          mode: newReplyMode
      });
      // You will implement the actual API call here later
      // using a mutation from TanStack Query
      setNewReplyContent('');
      setNewReplyMode('embed');
  };


  if (isLoading) {
    return <div className="text-center p-[var(--spacing-lg)]">Loading thread...</div>;
  }

  if (error) {
    return <div className="text-center text-[color:var(--color-danger)] p-[var(--spacing-lg)]">Error loading thread: {error.message}</div>;
  }

  if (!thread) {
      return <div className="text-center p-[var(--spacing-lg)]">Thread not found.</div>;
  }

  // Determine the mode for the main post content (assuming 'embed' for now, or add a mode property to IForumThread)
  const mainPostMode: EditorMode = 'embed'; // Or thread.mode if you add it to the type

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{thread.title}</h1>
      <p className="text-sm text-[color:var(--color-text-secondary)] mb-[var(--spacing-md)]">Posted by {thread.author} on {new Date(thread.createdAt).toLocaleDateString()}</p>

      {/* Main Post Content */}
      <div className="bg-[color:var(--color-surface)] rounded-[var(--border-radius-md)] shadow-sm p-[var(--spacing-md)] mb-[var(--spacing-md)] border border-[color:var(--color-border)]">
          {/* Use MessageContent for main post */}
          <MessageContent content={thread.content} mode={mainPostMode} />

           {/* Add voting buttons for the main post here later */}
          {/* <div className="flex items-center mt-2 space-x-[var(--spacing-sm)]">
              <button className="bg-[color:var(--color-secondary)] text-white text-xs px-[var(--spacing-sm)] py-[var(--spacing-xs)] rounded-[var(--border-radius-md)] hover:bg-[color:var(--color-secondary-dark)] transition-colors">Good ({thread.goodVotes})</button>
              <button className="bg-[color:var(--color-danger)] text-white text-xs px-[var(--spacing-sm)] py-[var(--spacing-xs)] rounded-[var(--border-radius-md)] hover:bg-[color:var(--color-danger-dark)] transition-colors">Bad ({thread.badVotes})</button>
          </div> */}
      </div>


      <h2 className="text-xl font-semibold mb-[var(--spacing-md)]">{thread.replies.length} Replies</h2>

      {/* List of Replies */}
      <div>
          {thread.replies.map(reply => (
              <Reply key={reply.id} reply={reply} />
          ))}
      </div>

       {/* Reply Form */}
       <div className="mt-[var(--spacing-lg)] pt-[var(--spacing-md)] border-t border-[color:var(--color-border)]">
           <h3 className="text-lg font-semibold mb-[var(--spacing-md)]">Add a Reply</h3>
           <TextEditor
             value={newReplyContent}
             onChange={handleReplyChange}
           />
           <button
               className="mt-[var(--spacing-md)] bg-[color:var(--color-primary)] text-white py-2 px-4 rounded-[var(--border-radius-md)] hover:bg-[color:var(--color-primary-dark)] transition-colors"
               onClick={handleSubmitReply}
           >
               Submit Reply
           </button>
       </div>
    </div>
  );
};

export default ThreadPage;
