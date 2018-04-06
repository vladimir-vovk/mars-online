import PropTypes from 'prop-types';
import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  Image,
  Platform,
  ViewPropTypes,
} from 'react-native';
import colors from '../../config/colors';

const Card = props => {
  const {
    title,
    titleStyle,
    overlayText,
    overlayStyle,
    image,
    imageStyle,
    children,
    containerStyle,
    wrapperStyle,
    onPress,
    ...attributes
  } = props;

  const TouchableComponent = onPress ? TouchableOpacity : View;

  return (
    <View
      {...attributes}
      style={[
        styles.container,
        image && { padding: 0 },
        containerStyle && containerStyle,
      ]}
    >
      <TouchableComponent
        style={{ flex: 1 }}
        activeOpacity={0.8}
        onPress={onPress}
      >
        {image &&
          <ImageBackground
            source={image}
            style={[
              { flex: 1 },
              imageStyle && imageStyle,
            ]}
            >
            <View style={[
              styles.wrapper,
              wrapperStyle && wrapperStyle,
            ]}>
              {title &&
                <Text
                  style={[
                    styles.title,
                    titleStyle && titleStyle,
                  ]}
                >
                  {title}
                </Text>
              }
              {overlayText &&
                <View style={[
                  styles.overlay,
                  overlayStyle && overlayStyle,
                ]}>
                  <Text style={styles.overlayText}>
                    {overlayText}
                  </Text>
                </View>
              }
              {children}
            </View>
          </ImageBackground>
        }
        {!image && children}
      </TouchableComponent>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    borderColor: colors.header,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0 ,0, .3)',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 0,
    height: 210,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    color: colors.fontLight,
    fontSize: 24,
    fontWeight: '600',
    margin: 16,
  },
  overlay: {
    backgroundColor: 'white',
    opacity: 0.8,
  },
  overlayText: {
    color: 'black',
    padding: 8,
    fontSize: 12,
    fontWeight: '300',
  },
};

Card.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  titleStyle: ViewPropTypes.style,
  overlayText: PropTypes.string,
  overlayStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  imageStyle: Image.propTypes.style,
  image: Image.propTypes.source,
  onPress: PropTypes.func,
}

export { Card };
