import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity, ViewPropTypes } from 'react-native';
import { LinearGradient } from 'expo';
import colors from '../../config/colors';

const Button = props => {
  const {
    onPress,
    children,
    containerStyle,
    textStyle,
    gradient,
    ...attributes
  } = props;

  return (
    <TouchableOpacity
      {...attributes}
      style={[
        styles.container,
        containerStyle && containerStyle,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {gradient &&
        <LinearGradient
          colors={[colors.buttonLight, colors.buttonDark]}
          style={styles.gradient}
          >
          <Text
            style={[
              styles.text,
              textStyle && textStyle,
            ]}
          >
            {children}
          </Text>
        </LinearGradient>
      }
      {!gradient &&
        <Text
          style={[
            styles.text,
            textStyle && textStyle,
          ]}
          >
          {children}
        </Text>
      }
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.button,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: colors.button,
    marginLeft: 0,
    marginRight: 0,
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.button,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: colors.button,
    marginLeft: 0,
    marginRight: 0,
  },
  text: {
    alignSelf: 'center',
    color: colors.fontDark,
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
};

Button.propTypes = {
  children: PropTypes.any,
  containerStyle: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
  onPress: PropTypes.func,
  gradient: PropTypes.bool,
};

export { Button };
