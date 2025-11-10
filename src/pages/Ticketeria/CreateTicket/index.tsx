import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { TicketApi } from '../../../services/TicketApi';
import { TICKET_CATEGORIES, TICKET_PRIORITIES } from '../../../constants/ticket.constants';
import {
  validateTicketTitle,
  validateTicketDescription,
  validateTicketCategory,
} from '../../../utils/validation.utils';
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
} from './styles';

import { Ticket } from '../../../types/ticket.types';
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

      Alert.alert('Sucesso', 'Ticket criado com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      Alert.alert(
        'Erro',
        error instanceof Error ? error.message : 'Erro ao criar ticket. Tente novamente.'
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


