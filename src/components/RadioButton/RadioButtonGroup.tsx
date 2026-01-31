import React from 'react';
import './RadioButtonGroup.css';

interface RadioButtonProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton = ({ label, value, checked, onChange }: RadioButtonProps) => {
  return (
    <label className="radio-button">
      <input type="radio" value={value} checked={checked} onChange={onChange} />
      {label}
    </label>
  );
};

interface RadioButtonGroupProps {
  options: Array<{ label: string; value: string }>;
  selectedValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButtonGroup = ({
  options,
  selectedValue,
  onChange,
}: RadioButtonGroupProps) => {
  return (
    <div className="radio-button-group">
      {options.map(option => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          checked={selectedValue === option.value}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export { RadioButton, RadioButtonGroup };
