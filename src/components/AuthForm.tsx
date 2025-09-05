import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, KeyboardTypeOptions } from 'react-native';

interface Field {
  placeholder: string;
  secure?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

interface Props {
  fields: Field[];
  buttonText: string;
  onSubmit: (values: Record<string, string>) => void;
}

const AuthForm: React.FC<Props> = ({ fields, onSubmit, buttonText }) => {
  const [values, setValues] = useState<Record<string, string>>({});

  return (
    <View style={styles.container}>
      {fields.map((f, i) => (
        <TextInput
          key={i}
          placeholder={f.placeholder}
          secureTextEntry={f.secure}
          keyboardType={f.keyboardType}
          value={values[f.placeholder] || ''}
          onChangeText={text => setValues(prev => ({ ...prev, [f.placeholder]: text }))}
          style={styles.input}
        />
      ))}

      <Button title={buttonText} onPress={() => onSubmit(values)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
});

export default AuthForm;
