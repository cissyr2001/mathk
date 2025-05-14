// src/features/forum/components/Reply/Reply.tsx
import React from 'react';
import type { IReply, EditorMode } from '../../types/forumTypes'; // Use new interface name and import EditorMode
import MessageContent from '../MessageContent/MessageContent'; // Import MessageContent

interface ReplyProps {
  reply: IReply; // Use new interface name
  // Add vote handlers later
  // onVoteGood: (replyId: string) => void;
  // onVoteBad: (replyId: string) => void;
}

const Reply: React.FC<ReplyProps> = ({ reply }) => {
    // Determine the mode for the reply content (assuming 'embed' for now, or add a mode property to IReply)
    const replyMode: EditorMode = 'embed'; // Or reply.mode if you add it to the type

  return (
    <div className="bg-[color:var(--color-surface)] rounded-[var(--border-radius-md)] shadow-sm p-[var(--spacing-md)] mb-[var(--spacing-md)] border border-[color:var(--color-border)]">
      {/* Reply Content (Use MessageContent component here) */}
      <MessageContent content={reply.content} mode={replyMode} />

      <p className="text-xs text-[color:var(--color-text-secondary)] mt-1">
        Replied by {reply.author} - {reply.votes} votes
        {/* Add date formatting later */}
        {/* - {new Date(reply.createdAt).toLocaleString()} */}
      </p>
       {/* Add voting buttons here */}
       <div className="flex items-center mt-2 space-x-[var(--spacing-sm)]"> {/* Added space-x for button spacing */}
           {/* Placeholder buttons - Added padding and white text */}
           <button className="bg-[color:var(--color-secondary)] text-white text-xs px-[var(--spacing-sm)] py-[var(--spacing-xs)] rounded-[var(--border-radius-md)] hover:bg-[color:var(--color-secondary-dark)] transition-colors">Good</button>
           <button className="bg-[color:var(--color-danger)] text-white text-xs px-[var(--spacing-sm)] py-[var(--spacing-xs)] rounded-[var(--border-radius-md)] hover:bg-[color:var(--color-danger-dark)] transition-colors">Bad</button>
       </div>
    </div>
  );
};

export default Reply;
