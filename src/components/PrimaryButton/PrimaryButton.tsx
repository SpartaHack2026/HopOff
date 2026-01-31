import React from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from './styles';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
}

const PrimaryButton = ({ children, onPress }: PrimaryButtonProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

export default PrimaryButton;
