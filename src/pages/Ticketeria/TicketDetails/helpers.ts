import { Ticket, Comment } from '../../../types/ticket.types';

export const mergeTicketComments = (
  prevTicket: Ticket,
  fetchedTicket: Ticket
): Ticket => {
  if (prevTicket.id !== fetchedTicket.id) {
    return fetchedTicket;
  }

  const existingCommentIds = new Set((prevTicket.comments || []).map(c => String(c.id)));
  const fetchedCommentIds = new Set((fetchedTicket.comments || []).map(c => String(c.id)));

  if (
    existingCommentIds.size === fetchedCommentIds.size &&
    Array.from(existingCommentIds).every(id => fetchedCommentIds.has(id))
  ) {
    return {
      ...fetchedTicket,
      comments: prevTicket.comments,
    };
  }

  const newComments = (fetchedTicket.comments || []).filter(
    c => !existingCommentIds.has(String(c.id))
  );

  if (newComments.length > 0) {
    return {
      ...fetchedTicket,
      comments: [...(prevTicket.comments || []), ...newComments],
    };
  }

  return {
    ...fetchedTicket,
    comments: prevTicket.comments || fetchedTicket.comments || [],
  };
};

export const hasDuplicateComment = (
  comments: Comment[] | undefined,
  commentId: string | number
): boolean => {
  if (!comments) return false;
  return comments.some(c => String(c.id) === String(commentId));
};

