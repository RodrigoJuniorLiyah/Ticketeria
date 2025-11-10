import React, { useState, useCallback, useRef } from 'react';
import { Alert, Platform, Linking, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TicketStatusBadge from '../../../components/_fragments/TicketStatusBadge';
import TicketComment from '../../../components/_fragments/TicketComment';
import { TicketApi } from '../../../services/TicketApi';
import { ticketStorage } from '../../../helpers/ticketStorage';
import { attachmentStorage } from '../../../helpers/attachmentStorage';
import { attachmentSync } from '../../../helpers/attachmentSync';
import { useNetwork } from '../../../contexts/NetworkContext';
import { formatDate, getPriorityLabel, formatFileSize, getFileIcon } from '../../../utils/ticket.utils';
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
  AttachmentsCard,
  AttachmentsList,
  AttachmentItem,
  AttachmentLeft,
  AttachmentIcon,
  AttachmentInfo,
  AttachmentName,
  AttachmentMeta,
  AttachmentDownload,
  OfflineBanner,
  OfflineBannerText,
  KeyboardAvoidingWrapper,
} from './styles';

import { Ticket, Attachment } from '../../../types/ticket.types';
import { useTheme } from '../../../contexts/ThemeContext';
import { mergeTicketComments, hasDuplicateComment } from './helpers';

const TicketDetails = () => {
  const { theme } = useTheme();
  const { isOnline } = useNetwork();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const [ticket, setTicket] = useState<Ticket>(route.params?.ticket);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const isSubmittingRef = useRef(false);
  const commentTextRef = useRef(commentText);
  const isInitialLoadRef = useRef(true);
  const scrollViewRef = useRef<ScrollView>(null);

  React.useEffect(() => {
    commentTextRef.current = commentText;
  }, [commentText]);

  React.useEffect(() => {
    const loadTicketDetails = async () => {
      const initialTicket = route.params?.ticket;
      if (!initialTicket?.id) return;

      const isFirstLoad = isInitialLoadRef.current;
      if (isFirstLoad) {
        isInitialLoadRef.current = false;
      } else if (!isOnline) {
        return;
      }

      const cachedTicket = await ticketStorage.getTicketDetails(initialTicket.id);
      if (cachedTicket && isFirstLoad) {
        const cachedAttachments = await attachmentStorage.getAllAttachmentsMetadata(initialTicket.id);
        const pendingAttachments = await attachmentStorage.getPendingAttachments(initialTicket.id);

        if (cachedAttachments.length > 0 || pendingAttachments.length > 0) {
          const allAttachments = [
            ...cachedAttachments.map((meta) => ({
              id: meta.attachmentId,
              name: meta.name,
              url: meta.url || meta.localUri || '',
              type: meta.type,
              size: meta.size,
            })),
            ...pendingAttachments.map((pending, index) => ({
              id: `pending-${index}`,
              name: pending.name,
              url: pending.uri,
              type: pending.type,
              size: pending.size,
            })),
          ];

          setTicket({
            ...cachedTicket,
            attachments: allAttachments as any,
          });
        } else {
          setTicket(cachedTicket);
        }
      }

      if (!isOnline) {
        setIsOffline(true);
        if (!cachedTicket) {
          Alert.alert(
            'Sem conexão',
            'Você está offline e não há dados salvos deste ticket. Conecte-se à internet para visualizar os detalhes.'
          );
        }
        return;
      }

      setIsOffline(false);

      try {
        await attachmentSync.syncPendingAttachments(initialTicket.id);

        const fetchedTicket = await TicketApi.getById(initialTicket.id);

        if (fetchedTicket.attachments && fetchedTicket.attachments.length > 0) {
          for (const attachment of fetchedTicket.attachments) {
            await attachmentStorage.saveAttachmentMetadata(
              fetchedTicket.id,
              attachment
            );
          }
        }

        setTicket((prevTicket) => {
          const mergedTicket = mergeTicketComments(prevTicket, fetchedTicket);
          ticketStorage.saveTicketDetails(mergedTicket.id, mergedTicket);
          return mergedTicket;
        });
      } catch (error) {
        const isNetworkError = error instanceof Error && (error as any).isNetworkError;
        if (isNetworkError) {
          setIsOffline(true);
          if (!cachedTicket) {
            Alert.alert(
              'Sem conexão',
              'Você está offline e não há dados salvos deste ticket. Conecte-se à internet para visualizar os detalhes.'
            );
          }
        } else {
          Alert.alert(
            'Erro',
            error instanceof Error ? error.message : 'Erro ao carregar detalhes do ticket'
          );
        }
      }
    };

    loadTicketDetails();
  }, [route.params?.ticket?.id, isOnline, route.params?.ticket]);

  const ticketIdRef = useRef(ticket.id);

  React.useEffect(() => {
    ticketIdRef.current = ticket.id;
  }, [ticket.id]);

  const handleAddComment = useCallback(async () => {
    if (isSubmittingRef.current) {
      return;
    }

    const currentText = commentTextRef.current.trim();

    if (!currentText) {
      return;
    }

    isSubmittingRef.current = true;
    setLoading(true);
    setCommentText('');

    try {
      const ticketId = ticketIdRef.current;
      const newComment = await TicketApi.addComment(ticketId, currentText);

      setTicket((prevTicket) => {
        if (hasDuplicateComment(prevTicket.comments, newComment.id)) {
          return prevTicket;
        }

        const updatedTicket = {
          ...prevTicket,
          comments: [...(prevTicket.comments || []), newComment],
        };
        ticketStorage.saveTicketDetails(updatedTicket.id, updatedTicket);
        return updatedTicket;
      });
    } catch (error) {
      setCommentText(currentText);
      Alert.alert(
        'Erro',
        error instanceof Error ? error.message : 'Erro ao adicionar comentário'
      );
    } finally {
      setLoading(false);
      isSubmittingRef.current = false;
    }
  }, []);

  const handleStatusChange = useCallback(
    async (newStatus: Ticket['status']) => {
      setLoading(true);
      try {
        const updatedTicket = await TicketApi.update(ticket.id, { status: newStatus });
        setTicket(updatedTicket);
        await ticketStorage.saveTicketDetails(updatedTicket.id, updatedTicket);
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

  const handleCommentInputFocus = useCallback(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, Platform.OS === 'ios' ? 250 : 100);
  }, []);

  const handleAttachmentPress = useCallback(async (attachment: Attachment) => {
    try {
      const url = attachment.url;

      if (!url) {
        Alert.alert('Erro', 'URL do anexo não disponível.');
        return;
      }

      const isMockUrl = url.includes('example.com') || url.includes('mock');
      const isLocalUri = url.startsWith('file://') || url.startsWith('content://');

      if (isMockUrl) {
        Alert.alert(
          'Anexo de Demonstração',
          'Este é um anexo de exemplo usado para demonstração. Em produção, este anexo estaria disponível para download.',
          [{ text: 'OK' }]
        );
        return;
      }

      if (isLocalUri) {
        try {
          if (Platform.OS === 'android') {
            try {
              const supported = await Linking.canOpenURL(url);
              if (supported) {
                await Linking.openURL(url);
              } else {
                Alert.alert(
                  'Aviso',
                  'Não foi possível abrir o arquivo. A URI pode ter expirado ou o arquivo não está mais disponível. Isso é comum em emuladores quando a URI temporária expira.\n\nEm produção, os arquivos seriam salvos no servidor e estariam sempre disponíveis.',
                  [{ text: 'OK' }]
                );
              }
            } catch (canOpenError: any) {
              const errorMsg = canOpenError?.message || '';
              if (errorMsg.includes('not found') || errorMsg.includes('Media not found')) {
                Alert.alert(
                  'Aviso',
                  'O arquivo não foi encontrado. A URI pode ter expirado, o que é comum em emuladores.\n\nEm produção, os arquivos seriam salvos no servidor e estariam sempre disponíveis.',
                  [{ text: 'OK' }]
                );
              } else {
                throw canOpenError;
              }
            }
          } else {
            await Linking.openURL(url);
          }
        } catch (error: any) {
          const errorMessage = error?.message || '';
          console.error('Erro ao abrir anexo local:', error);

          if (errorMessage.includes('not found') || errorMessage.includes('Media not found')) {
            Alert.alert(
              'Aviso',
              'O arquivo não foi encontrado. A URI pode ter expirado, o que é comum em emuladores quando a URI temporária expira.\n\nEm produção, os arquivos seriam salvos no servidor e estariam sempre disponíveis.',
              [{ text: 'OK' }]
            );
          } else {
            Alert.alert(
              'Info',
              'Não foi possível abrir o arquivo automaticamente. Tente usar um aplicativo de visualização de arquivos instalado no dispositivo.'
            );
          }
        }
        return;
      }

      if (url.startsWith('http://') || url.startsWith('https://')) {
        try {
          const supported = await Linking.canOpenURL(url);
          if (supported) {
            await Linking.openURL(url);
          } else {
            Alert.alert(
              'Erro',
              'Não foi possível abrir este tipo de URL. Verifique se a URL está correta.'
            );
          }
        } catch (error: any) {
          const errorMessage = error?.message || '';
          if (errorMessage.includes('not found') || errorMessage.includes('Media not found')) {
            Alert.alert(
              'Aviso',
              'Este anexo não está mais disponível. Pode ter sido removido ou a URL expirou.'
            );
          } else {
            Alert.alert(
              'Erro',
              'Não foi possível abrir o anexo. Verifique sua conexão com a internet ou se a URL está acessível.'
            );
          }
        }
        return;
      }

      Alert.alert('Erro', `Tipo de URL não suportado: ${url.substring(0, 20)}...`);
    } catch (error: any) {
      const errorMessage = error?.message || 'Erro desconhecido';
      console.error('Erro ao abrir anexo:', error);

      if (errorMessage.includes('not found') || errorMessage.includes('Media not found')) {
        Alert.alert(
          'Aviso',
          'O arquivo não foi encontrado. A URI pode ter expirado, o que é comum em emuladores quando a URI temporária expira.\n\nEm produção, os arquivos seriam salvos no servidor e estariam sempre disponíveis.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert('Erro', `Não foi possível abrir o anexo: ${errorMessage}`);
      }
    }
  }, []);

  return (
    <Container>
      <KeyboardAvoidingWrapper
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <Content ref={scrollViewRef}>
          {isOffline && (
            <OfflineBanner>
              <OfflineBannerText>
                ⚠️ Modo offline - Exibindo dados salvos
              </OfflineBannerText>
            </OfflineBanner>
          )}
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
              <InfoRow isLast>
                <InfoLabel>Criado por:</InfoLabel>
                <InfoValue>{ticket.createdBy.name}</InfoValue>
              </InfoRow>
            )}
          </InfoCard>

          <DescriptionCard>
            <InfoTitle>Descrição</InfoTitle>
            <DescriptionText>{ticket.description}</DescriptionText>
          </DescriptionCard>

          {ticket.attachments && ticket.attachments.length > 0 && (
            <AttachmentsCard>
              <InfoTitle>Anexos</InfoTitle>
              <AttachmentsList>
                {ticket.attachments.map((attachment) => (
                  <AttachmentItem
                    key={attachment.id}
                    onPress={() => handleAttachmentPress(attachment)}
                    activeOpacity={0.7}
                  >
                    <AttachmentLeft>
                      <AttachmentIcon>
                        <Ionicons
                          name={getFileIcon(attachment.type)}
                          size={20}
                          color={theme.colors.surface}
                        />
                      </AttachmentIcon>
                      <AttachmentInfo>
                        <AttachmentName numberOfLines={1}>{attachment.name}</AttachmentName>
                        <AttachmentMeta>
                          {formatFileSize(attachment.size)} • {attachment.type.split('/')[1]?.toUpperCase() || 'Arquivo'}
                        </AttachmentMeta>
                      </AttachmentInfo>
                    </AttachmentLeft>
                    <AttachmentDownload
                      onPress={() => handleAttachmentPress(attachment)}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name="download-outline"
                        size={20}
                        color={theme.colors.surface}
                      />
                    </AttachmentDownload>
                  </AttachmentItem>
                ))}
              </AttachmentsList>
            </AttachmentsCard>
          )}

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

          <ActionButtons>
            {ticket.status !== 'resolved' && (
              <ActionButton onPress={() => handleStatusChange('resolved')} disabled={loading}>
                {loading ? (
                  <ActivityIndicator size="small" color={theme.colors.surface} />
                ) : (
                  <ActionButtonText disabled={loading}>Marcar como Resolvido</ActionButtonText>
                )}
              </ActionButton>
            )}
            {ticket.status !== 'closed' && (
              <ActionButton onPress={() => handleStatusChange('closed')} disabled={loading}>
                {loading ? (
                  <ActivityIndicator size="small" color={theme.colors.surface} />
                ) : (
                  <ActionButtonText disabled={loading}>Fechar Ticket</ActionButtonText>
                )}
              </ActionButton>
            )}
          </ActionButtons>
        </Content>

        <CommentInputContainer bottomInset={insets.bottom}>
          <CommentInputWrapper>
            <CommentInput
              placeholder="Adicione um comentário..."
              value={commentText}
              onChangeText={setCommentText}
              onFocus={handleCommentInputFocus}
              multiline
              placeholderTextColor={theme.colors.textSecondary}
              returnKeyType="default"
              blurOnSubmit={false}
              editable={!loading}
            />
          </CommentInputWrapper>
          <SendButton
            disabled={!commentText.trim() || loading}
            onPress={handleAddComment}
          >
            {loading ? (
              <ActivityIndicator size="small" color={theme.colors.surface} />
            ) : (
              <Ionicons
                name="send"
                size={20}
                color={commentText.trim() && !loading ? theme.colors.surface : theme.colors.textSecondary}
              />
            )}
          </SendButton>
        </CommentInputContainer>
      </KeyboardAvoidingWrapper>
    </Container>
  );
};

export default TicketDetails;
