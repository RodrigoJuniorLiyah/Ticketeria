import React, { useState, useCallback } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TicketStatusBadge from '../../../components/_fragments/TicketStatusBadge';
import TicketComment from '../../../components/_fragments/TicketComment';
import { TicketApi } from '../../../services/TicketApi';
import { formatDate, getPriorityLabel } from '../../../utils/ticket.utils';
import {
  Container,
  Content,
  HeaderCard,
  Title,
  HeaderMeta,
  InfoCard,
  InfoTitle,
  InfoRow,
  InfoLabel,
  InfoValue,
  DescriptionCard,
  DescriptionText,
  CommentsCard,
  CommentsList,
  ActionButtons,
  ActionButton,
  ActionButtonText,
  CommentInputContainer,
  CommentInputWrapper,
  CommentInput,
  SendButton,
  EmptyComments,
  EmptyCommentsText,
} from './styles';

import { Ticket, Comment } from '../../../types/ticket.types';
import { useTheme } from '../../../contexts/ThemeContext';

const TicketDetails = () => {
  const { theme } = useTheme();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const [ticket, setTicket] = useState<Ticket>(route.params?.ticket);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddComment = useCallback(async () => {
    if (!commentText.trim()) {
      return;
    }

    setLoading(true);
    try {
      const newComment = await TicketApi.addComment(ticket.id, commentText.trim());
      setTicket((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), newComment],
      }));
      setCommentText('');
    } catch (error) {
      Alert.alert(
        'Erro',
        error instanceof Error ? error.message : 'Erro ao adicionar comentário'
      );
    } finally {
      setLoading(false);
    }
  }, [ticket.id, commentText]);

  const handleStatusChange = useCallback(
    async (newStatus: Ticket['status']) => {
      setLoading(true);
      try {
        const updatedTicket = await TicketApi.update(ticket.id, { status: newStatus });
        setTicket(updatedTicket);
        Alert.alert('Sucesso', 'Status do ticket atualizado com sucesso!');
      } catch (error) {
        Alert.alert(
          'Erro',
          error instanceof Error ? error.message : 'Erro ao atualizar status'
        );
      } finally {
        setLoading(false);
      }
    },
    [ticket.id]
  );

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <Content>
          <HeaderCard>
            <Title>{ticket.title}</Title>
            <HeaderMeta>
              <TicketStatusBadge status={ticket.status} />
            </HeaderMeta>
          </HeaderCard>

          <InfoCard>
            <InfoTitle>Informações</InfoTitle>
            <InfoRow>
              <InfoLabel>Categoria:</InfoLabel>
              <InfoValue>{ticket.category}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Prioridade:</InfoLabel>
              <InfoValue>{getPriorityLabel(ticket.priority)}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Criado em:</InfoLabel>
              <InfoValue>{formatDate(ticket.createdAt)}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Atualizado em:</InfoLabel>
              <InfoValue>{formatDate(ticket.updatedAt)}</InfoValue>
            </InfoRow>
            {ticket.createdBy && (
              <InfoRow>
                <InfoLabel>Criado por:</InfoLabel>
                <InfoValue>{ticket.createdBy.name}</InfoValue>
              </InfoRow>
            )}
          </InfoCard>

          <DescriptionCard>
            <InfoTitle>Descrição</InfoTitle>
            <DescriptionText>{ticket.description}</DescriptionText>
          </DescriptionCard>

          <CommentsCard>
            <InfoTitle>Comentários</InfoTitle>
            <CommentsList>
              {ticket.comments && ticket.comments.length > 0 ? (
                ticket.comments.map((comment) => (
                  <TicketComment key={comment.id} comment={comment} />
                ))
              ) : (
                <EmptyComments>
                  <EmptyCommentsText>Nenhum comentário ainda</EmptyCommentsText>
                </EmptyComments>
              )}
            </CommentsList>
          </CommentsCard>
        </Content>

        <ActionButtons>
          {ticket.status !== 'resolved' && (
            <ActionButton onPress={() => handleStatusChange('resolved')} disabled={loading}>
              <ActionButtonText>Marcar como Resolvido</ActionButtonText>
            </ActionButton>
          )}
          {ticket.status !== 'closed' && (
            <ActionButton onPress={() => handleStatusChange('closed')} disabled={loading}>
              <ActionButtonText>Fechar Ticket</ActionButtonText>
            </ActionButton>
          )}
        </ActionButtons>

        <CommentInputContainer>
          <CommentInputWrapper>
            <CommentInput
              placeholder="Adicione um comentário..."
              value={commentText}
              onChangeText={setCommentText}
              multiline
              placeholderTextColor={theme.colors.textSecondary}
            />
          </CommentInputWrapper>
          <SendButton
            disabled={!commentText.trim() || loading}
            onPress={handleAddComment}
          >
            <Ionicons
              name="send"
              size={20}
              color={commentText.trim() && !loading ? theme.colors.surface : theme.colors.textSecondary}
            />
          </SendButton>
        </CommentInputContainer>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default TicketDetails;
