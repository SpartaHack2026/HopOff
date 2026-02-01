// ChooseAppScreen.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';

type HopOffOption =
  | 'TikTok'
  | 'Instagram'
  | 'Snapchat'
  | 'Facebook'
  | 'YouTube';

const OPTIONS: HopOffOption[] = [
  'TikTok',
  'Instagram',
  'Snapchat',
  'Facebook',
  'YouTube',
];

// Palette (Bubblegum Beach Sunset)
const COLORS = {
  pinkHot: '#FF5883',
  pinkSoft: '#FF91AD',
  pinkLight: '#FEC9D7',
  mintLight: '#B9EEE1',
  mint: '#79D3BE',
  mintDeep: '#39B89A',
  white: '#FFFFFF',
  text: '#1F2937',
  textMuted: '#4B5563',
};

function RadioRow({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.radioRow,
        selected && styles.radioRowSelected,
        pressed && { opacity: 0.9 },
      ]}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected ? <View style={styles.radioInner} /> : null}
      </View>

      <Text style={styles.radioLabel}>{label}</Text>
    </Pressable>
  );
}

export default function ChooseAppScreen() {
  const [selected, setSelected] = useState<HopOffOption | null>(null);

  const onMoveOn = () => {
    // TODO: hook into navigation or next step
    // Example:
    // if (!selected) return
    // navigation.navigate('NextScreen', { hopOff: selected })
    console.log('Selected:', selected);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Page Title */}
        <Text style={styles.title}>What are you trying to HopOFF?</Text>
        <Text style={styles.subtitle}>Pick one to focus on first.</Text>

        {/* Card */}
        <View style={styles.card} accessibilityRole="radiogroup">
          {OPTIONS.map(opt => (
            <RadioRow
              key={opt}
              label={opt}
              selected={selected === opt}
              onPress={() => setSelected(opt)}
            />
          ))}

          {/* Action */}
          <Pressable
            onPress={onMoveOn}
            disabled={!selected}
            style={({ pressed }) => [
              styles.primaryBtn,
              !selected && styles.primaryBtnDisabled,
              pressed && selected && { transform: [{ scale: 0.99 }] },
            ]}
            accessibilityRole="button"
            accessibilityState={{ disabled: !selected }}
          >
            <Text style={styles.primaryBtnText}>Move On</Text>
          </Pressable>
        </View>

        {/* Optional helper text */}
        {!selected ? (
          <Text style={styles.helperText}>Select an option to continue.</Text>
        ) : (
          <Text style={styles.helperText}>You chose: {selected}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.pinkLight,
  },
  container: {
    padding: 16,
    paddingTop: 28,
    gap: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: -6,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.pinkSoft,
    gap: 10,
    shadowColor: '#000', // Android uses elevation; iOS uses shadow props
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },

  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.pinkLight,
    backgroundColor: '#FFF',
    gap: 12,
  },
  radioRowSelected: {
    borderColor: COLORS.mintDeep,
    backgroundColor: COLORS.mintLight,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: COLORS.pinkHot,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  radioOuterSelected: {
    borderColor: COLORS.mintDeep,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: COLORS.mintDeep,
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },

  primaryBtn: {
    marginTop: 6,
    backgroundColor: COLORS.pinkHot,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
  },
  primaryBtnDisabled: {
    backgroundColor: COLORS.pinkSoft,
  },
  primaryBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.2,
  },

  helperText: {
    fontSize: 13,
    color: COLORS.textMuted,
    paddingHorizontal: 4,
  },
});
