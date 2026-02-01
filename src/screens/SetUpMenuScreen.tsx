import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'SetupMenu'>;

export default function SetupMenuScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: '800' }}>Set Up Menu</Text>

      <Button
        title="Continue"
        onPress={() => navigation.navigate('ChooseApp')}
      />
    </View>
  );
}
