import React, { Component } from 'react';
import { TouchableOpacity, View, SectionList, Text, StyleSheet, RefreshControl, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { galleryFetchLast, galleryFetchPrevious, galleryUpdate } from '../actions';
import { GridTile, Spinner } from './common';
import Preview from './Preview';
import colors from '../config/colors';
import images from 'app/assets/images';

const numColumns = 2;

class Gallery extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    return {
      title: `${title}`,
    };
  };

  onRefresh = () => {
    const { missionKey, missionSols } = this.props;
    this.props.galleryUpdate({ prop: 'refreshing', value: true })
    this.props.galleryFetchLast({ missionKey, missionSols });
  };

  componentWillMount() {
    /* If we have no data yet */
    if (!this.props.missionSols.length) {
      this.onRefresh();
    }
  }

  onItemPress(uri) {
    this.props.galleryUpdate({ prop: 'previewUri', value: uri });
    this.props.galleryUpdate({ prop: 'preview', value: true });
  }

  onClosePreview = () => {
    this.props.galleryUpdate({ prop: 'preview', value: false });
    this.props.galleryUpdate({ prop: 'previewUri', value: '' });
  };

  renderItem = ({ item }) => {
    /* Each item is an array of photos */
    return (
      <View style={styles.itemContainer}>
        {item.map(photo => (
          <GridTile
            key={photo.id}
            imageStyle={styles.item}
            uri={photo.imgSrc}
            preview={images.nasa}
            onPress={this.onItemPress.bind(this, photo.imgSrc)}
          />)
        )}
      </View>
    );
  };

  renderFooter = () => {
    const { refreshingFooter } = this.props;
    if (refreshingFooter) {
      return (
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Spinner size="small" />
        </View>
      );
    }

    return null;
  };

  onEndReached = () => {
    if (this.props.refreshingFooter) {
      return;
    }

    const { missionKey, missionSols } = this.props;
    this.props.galleryUpdate({ prop: 'refreshingFooter', value: true })
    this.props.galleryFetchPrevious({ missionKey, missionSols });
  };

  render() {
    const { refreshing, sections, preview, previewUri } = this.props;

    return (
      <View style={styles.container}>
        <SectionList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
          renderItem={this.renderItem}
          renderSectionHeader={({ section }) => <Text style={styles.header}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
          sections={sections}
          onEndReached={this.onEndReached}
          ListFooterComponent={this.renderFooter}
        />

      <Preview
        visible={preview}
        uri={previewUri}
        onClose={this.onClosePreview}
      />
      </View>
    );
  }
}

const itemWidth = (Dimensions.get('window').width - 10 - 10 - 2 - 2) / numColumns;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    marginBottom: 15,
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
    padding: 10,
    color: 'black',
    backgroundColor: colors.background,
  },
  itemContainer: {
    backgroundColor: colors.background,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  item: {
    width: itemWidth,
    height: itemWidth,
    margin: 2,
  },
})

;

const mapStateToProps = (state, ownProps) => {
  const { gallery } = state;
  const { missionKey } = ownProps.navigation.state.params;
  const { refreshing, refreshingFooter, preview, previewUri } = gallery;

  const solKeys = Object.keys(gallery[missionKey]).sort((a, b) => {
    // Get all keys from gallery -> rover object, each key is a Mars day number - sol
    return Number(b) > Number(a);  // descending order
  });

  const missionGallery = gallery[missionKey];
  const sections = solKeys
    .map(solKey => {
      /* Split photos into chunks */
      const photos = missionGallery[solKey].photos;
      const data = [];

      for (let i = 0; i < photos.length; i += numColumns) {
        data.push(photos.slice(i, i + numColumns));
      }

      return {
        title: missionGallery[solKey].title,
        data,
      }
    })
    .filter(item => item.data.length);

  return { missionKey, refreshing, refreshingFooter, preview, previewUri, sections, missionSols: solKeys };
};

export default connect(mapStateToProps,
  { galleryFetchPrevious, galleryFetchLast, galleryUpdate })(Gallery);
