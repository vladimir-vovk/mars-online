import React, { Component } from 'react';
import { View, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import { missionsFetch, missionsUpdate } from '../actions';
import { Card } from './common';
import images from '../../assets/images';
import { loadState } from '../utils';

class Missions extends Component {
  static navigationOptions = {
    title: 'Missions',
  };

  state = { isReady: false };

  onMissionPress(missionKey) {
    this.props.navigation.navigate('Gallery', { missionKey });
  }

  renderMission(missionKey) {
    const {name, launchDate, landingDate, maxSol, maxDate, totalPhotos, status } = this.props[missionKey];
    const overlayText = `Was launched on ${launchDate.replace(/-/g, '/')}, landed on Mars ${landingDate.replace(/-/g, '/')}, worked out ${maxSol} Martian days. The last photo was taken on ${maxDate.replace(/-/g, '/')}, total photos are ${totalPhotos}. The current status is ${status}.`;

    return (
      <Card
        key={missionKey}
        image={images[missionKey]}
        title={name}
        overlayText={overlayText}
        onPress={this.onMissionPress.bind(this, missionKey)}
      />
    );
  }

  renderMissions() {
    return this.props.order.map(missionKey => this.renderMission(missionKey));
  }

  onRefresh = () => {
    this.props.missionsFetch(this.props.order);
  }

  _loadState = loadState.bind(this);

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
        startAsync={this._loadState}
        onFinish={() => this.setState({ isReady: true })}
        onError={console.log}
        />
      );
    }

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.props.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        <View style={{ height: 5 }} />
        {this.renderMissions()}
        <View style={{ height: 15 }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  const { missions } = state;
  return { ...missions };
};

export default connect(mapStateToProps, { missionsFetch, missionsUpdate })(Missions);
