import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { IconButton, Text, Colors, Surface } from 'react-native-paper';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { FloatingButton } from '../../component';
import { Actions } from 'react-native-router-flux';
import { GREY } from 'react-native-material-color';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      // there are three tabs (statistics, friends and rs)
      routes: [
        { key: 'stat', title: 'Statistics' },
        { key: 'friend', title: 'Friends' },
        { key: 'rs', title: 'RS Beta' },
      ],
    }
  }

  render() {
    const { container, playerLabel, header } = styles;
    return (
      <Surface theme={{colors: {background: GREY[800]}}} style={container}>
        <SafeAreaView style={{height: '100%'}}>
          <Surface style={header}>
            <Text numberOfLines={1} style={playerLabel}>HenryQuan</Text>
            <IconButton icon='settings' size={24} color={Colors.grey500}
              onPress={() => Actions.Settings()}/>
          </Surface>
          <TabView
            renderTabBar={props =>
              <TabBar {...props} renderLabel={r => <Text style={{fontWeight: '300', fontSize: 17}}>{r.route.title}</Text>}
                style={{ backgroundColor: 'transparent' }}
                indicatorStyle={{ backgroundColor: 'transparent' }}
              />
            }
            navigationState={this.state}
            renderScene={SceneMap({
              stat: () => this.renderStatistics(),
              friend: () => this.renderFriends(),
              rs: () => this.renderFriends()
            })}
            onIndexChange={index => this.setState({index})}
            initialLayout={{width: Dimensions.get('window').width}}
          />
          <FloatingButton />
        </SafeAreaView>
      </Surface>
    );
  }

  /**
   * This is the stats part and it is basically a player stat screen
   */
  renderStatistics() {
    return <Text>Stat</Text>;
  }

  /**
   * A simple list with friends
   */
  renderFriends() {
    return <Text>Friends</Text>;
  }

  /**
   * This is the beta version of real stat
   */
  renderRS() {
    return <Text>RS</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8
  },
  playerLabel: {
    fontSize: 32,
    padding: 8,
    width: '80%',
    fontWeight: 'bold'
  }
});

export { Home };