import React from 'react';
import { Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import {
  ModalButton,
  ModalButtonContainer,
  ModalButtonText,
  ModalContent,
  ModalHandle,
  ModalHeader,
  ModalOverlay,
  PickerContainer,
  StyledPicker,
} from './styles';

import { useTheme } from '../../../contexts/ThemeContext';

interface PickerItem {
  label: string;
  value: string;
}

interface PickerModalProps {
  visible: boolean;
  selectedValue: string;
  items: PickerItem[];
  placeholder?: string;
  onValueChange: (value: string) => void;
  onClose: () => void;
  onConfirm?: () => void;
}

const PickerModal = ({
  visible,
  selectedValue,
  items,
  placeholder = 'Selecione uma opção',
  onValueChange,
  onClose,
  onConfirm,
}: PickerModalProps) => {
  const { theme, themeMode } = useTheme();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const handleOverlayPress = () => {
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <ModalOverlay activeOpacity={1} onPress={handleOverlayPress}>
        <ModalContent>
          <ModalHandle />
          <ModalHeader>
            <ModalButtonContainer>
              <ModalButton onPress={onClose}>
                <ModalButtonText variant="secondary">Cancelar</ModalButtonText>
              </ModalButton>
              <ModalButton onPress={handleConfirm}>
                <ModalButtonText variant="primary">Confirmar</ModalButtonText>
              </ModalButton>
            </ModalButtonContainer>
          </ModalHeader>
          <PickerContainer>
            <StyledPicker
              selectedValue={selectedValue}
              onValueChange={value => onValueChange(value as string)}
              dropdownIconColor={theme.colors.text}
            >
              <Picker.Item
                label={placeholder}
                value=""
                color={themeMode === 'light' ? theme.colors.textLight : theme.colors.textSecondary}
              />
              {items.map(item => (
                <Picker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  color={themeMode === 'light' ? theme.colors.textLight : theme.colors.text}
                />
              ))}
            </StyledPicker>
          </PickerContainer>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default PickerModal;
