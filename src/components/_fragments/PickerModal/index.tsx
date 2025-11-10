import React from 'react';
import { Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalButton,
  ModalButtonText,
} from './styles';

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
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>
            <ModalButton onPress={onClose}>
              <ModalButtonText>Cancelar</ModalButtonText>
            </ModalButton>
            <ModalButton onPress={handleConfirm}>
              <ModalButtonText>Confirmar</ModalButtonText>
            </ModalButton>
          </ModalHeader>
          <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
            <Picker.Item label={placeholder} value="" />
            {items.map((item) => (
              <Picker.Item key={item.value} label={item.label} value={item.value} />
            ))}
          </Picker>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default PickerModal;

