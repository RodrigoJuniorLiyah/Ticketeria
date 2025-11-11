import React from 'react';

import { formatDate } from '../../../utils/ticket.utils';
import {
  Avatar,
  AvatarText,
  CommentAuthor,
  CommentBubble,
  CommentContainer,
  CommentContent,
  CommentDate,
  CommentHeader,
  CommentText,
} from './styles';

import { Comment } from '../../../types/ticket.types';

interface TicketCommentProps {
  comment: Comment;
}

const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const TicketComment = ({ comment }: TicketCommentProps) => (
  <CommentContainer>
    <Avatar>
      <AvatarText>{getInitials(comment.createdBy.name)}</AvatarText>
    </Avatar>
    <CommentContent>
      <CommentHeader>
        <CommentAuthor>{comment.createdBy.name}</CommentAuthor>
        <CommentDate>{formatDate(comment.createdAt)}</CommentDate>
      </CommentHeader>
      <CommentBubble>
        <CommentText>{comment.text}</CommentText>
      </CommentBubble>
    </CommentContent>
  </CommentContainer>
);

export default TicketComment;
