import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';

const styles = {
  container: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },
  input: {
    color: 'black',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
  },
};

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>
      {label}
    </Text>
    <TextInput
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      autoCorrect={false}
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
    />
  </View>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
};

Input.defaultProps = {
  secureTextEntry: false,
};

export { Input };
