import React, { useState, useRef, useCallback } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { pick } from '@react-native-documents/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { TicketApi } from '../../../services/TicketApi';
import { ticketStorage } from '../../../helpers/ticketStorage';
import { attachmentStorage } from '../../../helpers/attachmentStorage';
import { TICKET_CATEGORIES, TICKET_PRIORITIES } from '../../../constants/ticket.constants';
import {
  validateTicketTitle,
  validateTicketDescription,
  validateTicketCategory,
} from '../../../utils/validation.utils';
import { formatFileSize, getFileIcon } from '../../../utils/ticket.utils';
import PickerModal from '../../../components/_fragments/PickerModal';
import {
  Container,
  Content,
  FormCard,
  FormGroup,
  Label,
  InputContainer,
  Input,
  TextAreaContainer,
  TextArea,
  SelectContainer,
  SelectButton,
  SelectText,
  SelectPlaceholder,
  ErrorText,
  ButtonContainer,
  SubmitButton,
  SubmitButtonText,
  LoadingContainer,
  LoadingText,
  AttachmentsContainer,
  AttachmentButton,
  AttachmentButtonText,
  AttachmentsList,
  AttachmentItem,
  AttachmentInfo,
  AttachmentIcon,
  AttachmentDetails,
  AttachmentName,
  AttachmentSize,
  AttachmentRemove,
} from './styles';

import { Ticket, TicketListResponse } from '../../../types/ticket.types';
import { useTheme } from '../../../contexts/ThemeContext';

interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
}

const CreateTicket = () => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<Ticket['priority']>('medium');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showPriorityPicker, setShowPriorityPicker] = useState(false);
  const [attachments, setAttachments] = useState<Array<{ name: string; uri: string; type: string; size: number }>>([]);
  const isPickingDocument = useRef(false);

  const handleFieldChange = (field: keyof FormErrors, value: string) => {
    let error: string | undefined;

    switch (field) {
      case 'title':
        setTitle(value);
        error = validateTicketTitle(value).error;
        break;
      case 'description':
        setDescription(value);
        error = validateTicketDescription(value).error;
        break;
      case 'category':
        setCategory(value);
        error = validateTicketCategory(value).error;
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handlePickDocument = useCallback(async () => {
    if (isPickingDocument.current) {
      return;
    }

    isPickingDocument.current = true;

    try {
      const results = await pick({
        allowMultiSelection: true,
      });

      if (results && Array.isArray(results) && results.length > 0) {
        const files = results
          .filter((file) => file && file.uri)
          .map((file) => ({
            name: file.name || 'arquivo',
            uri: file.uri,
            type: file.type || 'application/octet-stream',
            size: file.size || 0,
          }));

        if (files.length > 0) {
          setAttachments((prev) => [...prev, ...files]);
        }
      }
    } catch (err: any) {
      if (err?.code === 'DOCUMENT_PICKER_CANCELED' || err?.message?.includes('cancel')) {
        isPickingDocument.current = false;
        return;
      }
      
      console.error('Erro ao selecionar arquivo:', err);
      Alert.alert('Erro', 'Erro ao selecionar arquivo. Tente novamente.');
    } finally {
      isPickingDocument.current = false;
    }
  }, []);

  const handleRemoveAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const titleValidation = validateTicketTitle(title);
    if (!titleValidation.isValid) {
      newErrors.title = titleValidation.error;
    }

    const descriptionValidation = validateTicketDescription(description);
    if (!descriptionValidation.isValid) {
      newErrors.description = descriptionValidation.error;
    }

    const categoryValidation = validateTicketCategory(category);
    if (!categoryValidation.isValid) {
      newErrors.category = categoryValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const ticketData: Partial<Ticket> = {
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        priority,
        status: 'open',
      };

      const createdTicket = await TicketApi.create(ticketData);

      if (attachments.length > 0) {
        const uploadedAttachments: Array<{ attachment: unknown; localUri: string }> = [];
        const failedAttachments: Array<{ name: string; uri: string }> = [];

        for (const attachment of attachments) {
          try {
            const uploadedAttachment = await TicketApi.uploadAttachment(createdTicket.id, {
              uri: attachment.uri,
              type: attachment.type,
              name: attachment.name,
            });

            await attachmentStorage.saveAttachmentMetadata(
              createdTicket.id,
              uploadedAttachment as any,
              attachment.uri
            );

            uploadedAttachments.push({
              attachment: uploadedAttachment,
              localUri: attachment.uri,
            });
          } catch {
            await attachmentStorage.savePendingAttachment(createdTicket.id, {
              ticketId: createdTicket.id,
              uri: attachment.uri,
              name: attachment.name,
              type: attachment.type,
              size: attachment.size,
              createdAt: new Date().toISOString(),
            });

            failedAttachments.push({
              name: attachment.name,
              uri: attachment.uri,
            });
          }
        }

        if (failedAttachments.length > 0) {
          Alert.alert(
            'Aviso',
            `Ticket criado com sucesso, mas ${failedAttachments.length} anexo(s) não puderam ser enviados. Eles serão sincronizados quando você voltar online.`
          );
        }
      }

      await ticketStorage.saveTicketDetails(createdTicket.id, createdTicket);

      const cachedList = await ticketStorage.getTicketsList();
      if (cachedList) {
        const updatedList: TicketListResponse = {
          ...cachedList,
          data: [createdTicket, ...cachedList.data],
          total: cachedList.total + 1,
        };
        await ticketStorage.saveTicketsList(updatedList);
      } else {
        const newList: TicketListResponse = {
          data: [createdTicket],
          total: 1,
          page: 1,
          limit: 20,
          totalPages: 1,
        };
        await ticketStorage.saveTicketsList(newList);
      }

      Alert.alert('Sucesso', 'Ticket criado com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      const isNetworkError = error instanceof Error && (error as any).isNetworkError;
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Erro ao criar ticket. Tente novamente.';
      
      Alert.alert(
        isNetworkError ? 'Sem conexão' : 'Erro',
        isNetworkError 
          ? 'Você está offline. Conecte-se à internet para criar um ticket.'
          : errorMessage
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = title.trim().length >= 5 && description.trim().length >= 10 && category.trim().length > 0;

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <LoadingText>Criando ticket...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <FormCard>
          <FormGroup>
            <Label>Título *</Label>
            <InputContainer>
              <Input
                placeholder="Digite o título do ticket"
                value={title}
                onChangeText={(value) => handleFieldChange('title', value)}
                placeholderTextColor={theme.colors.textSecondary}
              />
            </InputContainer>
            {errors.title && <ErrorText>{errors.title}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>Descrição *</Label>
            <TextAreaContainer>
              <TextArea
                placeholder="Descreva o problema ou solicitação (mínimo 10 caracteres)"
                value={description}
                onChangeText={(value) => handleFieldChange('description', value)}
                multiline
                numberOfLines={6}
                placeholderTextColor={theme.colors.textSecondary}
              />
            </TextAreaContainer>
            {errors.description && <ErrorText>{errors.description}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>Categoria *</Label>
            <SelectContainer>
              <SelectButton onPress={() => setShowCategoryPicker(true)}>
                {category ? (
                  <SelectText>{category}</SelectText>
                ) : (
                  <SelectPlaceholder>Selecione uma categoria</SelectPlaceholder>
                )}
              </SelectButton>
            </SelectContainer>
            {errors.category && <ErrorText>{errors.category}</ErrorText>}

            <PickerModal
              visible={showCategoryPicker}
              selectedValue={category}
              items={TICKET_CATEGORIES.map((cat) => ({ label: cat, value: cat }))}
              placeholder="Selecione uma categoria"
              onValueChange={(value) => {
                setCategory(value);
                handleFieldChange('category', value);
              }}
              onClose={() => setShowCategoryPicker(false)}
              onConfirm={() => {
                if (!category) {
                  setErrors((prev) => ({ ...prev, category: 'Categoria é obrigatória' }));
                }
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label>Prioridade</Label>
            <SelectContainer>
              <SelectButton onPress={() => setShowPriorityPicker(true)}>
                <SelectText>
                  {TICKET_PRIORITIES.find((p) => p.value === priority)?.label || 'Média'}
                </SelectText>
              </SelectButton>
            </SelectContainer>

            <PickerModal
              visible={showPriorityPicker}
              selectedValue={priority}
              items={TICKET_PRIORITIES.map((p) => ({ label: p.label, value: p.value }))}
              placeholder="Selecione uma prioridade"
              onValueChange={(value) => setPriority(value as Ticket['priority'])}
              onClose={() => setShowPriorityPicker(false)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Anexos (opcional)</Label>
            <AttachmentsContainer>
              <AttachmentButton onPress={handlePickDocument} activeOpacity={0.7}>
                <Ionicons name="attach-outline" size={20} color={theme.colors.primary} />
                <AttachmentButtonText>Selecionar arquivos</AttachmentButtonText>
              </AttachmentButton>

              {attachments.length > 0 && (
                <AttachmentsList>
                  {attachments.map((attachment, index) => {
                    const fileType = attachment.type || 'application/octet-stream';
                    const fileSize = attachment.size || 0;

                    return (
                      <AttachmentItem key={index}>
                        <AttachmentInfo>
                          <AttachmentIcon>
                            <Ionicons
                              name={getFileIcon(fileType)}
                              size={18}
                              color={theme.colors.surface}
                            />
                          </AttachmentIcon>
                          <AttachmentDetails>
                            <AttachmentName numberOfLines={1}>
                              {attachment.name || 'Arquivo sem nome'}
                            </AttachmentName>
                            <AttachmentSize>{formatFileSize(fileSize)}</AttachmentSize>
                          </AttachmentDetails>
                        </AttachmentInfo>
                        <AttachmentRemove
                          onPress={() => handleRemoveAttachment(index)}
                          activeOpacity={0.7}
                        >
                          <Ionicons name="close" size={16} color={theme.colors.surface} />
                        </AttachmentRemove>
                      </AttachmentItem>
                    );
                  })}
                </AttachmentsList>
              )}
            </AttachmentsContainer>
          </FormGroup>
        </FormCard>

        <ButtonContainer>
          <SubmitButton disabled={!isFormValid || loading} onPress={handleSubmit}>
            <SubmitButtonText>Criar Ticket</SubmitButtonText>
          </SubmitButton>
        </ButtonContainer>
      </Content>
    </Container>
  );
};

export default CreateTicket;


