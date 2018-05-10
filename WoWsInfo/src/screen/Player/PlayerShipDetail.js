import React, { Component } from 'react';
import { Text, Image, ScrollView, StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import { Divider } from 'react-native-elements';
import { PersonalRating } from '../../core';
import { Basic8Cell, SimpleBanner } from '../../component';
import language from '../../constant/language';
import { getTheme } from '../../constant/colour';

export default class PlayerShipDetail extends Component {
  render() {
    const { mainViewStyle, scrollViewStyle, shipNameStyle, prTextStyle, imageStyle, ratingStyle, horizontalViewStyle } = styles;
    const { info } = this.props;
    const { index, ship_id } = info;
    let shipColour = PersonalRating.getColour(index);
    let shipComment = PersonalRating.getComment(index);
    let shipInfo = this.getShipInfo(ship_id);
    const pr = data.personal_rating[ship_id];    
    return (
      <View style={mainViewStyle}>
        <ScrollView contentInset={{bottom: 50}}>
          <SimpleBanner />
          <Image source={{uri: shipInfo.image}} style={imageStyle}/>
          <Text style={shipNameStyle}>{shipInfo.name}</Text>
          { pr == null || pr.win_rate == null ? null : <View style={horizontalViewStyle}>
            <Text style={prTextStyle}>{Number(pr.average_damage_dealt).toFixed(0)}</Text>
            <Text style={prTextStyle}>{Number(pr.win_rate).toFixed(2) + '%'}</Text>
            <Text style={prTextStyle}>{Number(pr.average_frags).toFixed(2)}</Text>
          </View>}
          <Text style={[ratingStyle, {color: shipColour}]}>{shipComment}</Text>
          <Basic8Cell info={this.getBasic8CellInfo(info)}/>
          <Divider style={{height: 1.5, backgroundColor: getTheme()}}/>
          { this.renderDetailInfo(info) }
        </ScrollView>
      </View>
    )
  }

  getShipInfo(id) {
    let ship = data.warship[id];
    var shipInfo = {name: language.player_deleted_ship, image: ''};
    if (ship != null) {
      shipInfo.name = ship.name;
      shipInfo.image = ship.icon;
    }
    return shipInfo;
  }

  getBasic8CellInfo(info) {
    const { avg_damage, avg_frag, battles, win_rate } = info;
    const { xp, survived_battles, main_battery, frags } = info.pvp;
    var basicInfo = {battle: battles, winrate: win_rate, damage: avg_damage, frag: avg_frag};
    basicInfo.exp = Math.round(xp / battles);
    basicInfo.hitratio = Math.round(main_battery.hits * 10000 / main_battery.shots) / 100;
    basicInfo.survival = Math.round(survived_battles * 10000 / battles) / 100;
    let death = battles - survived_battles;
    basicInfo.killdeath = Math.round(frags * 100 / death) / 100;
    basicInfo.frag = Math.round(frags * 100 / battles) / 100;
    return basicInfo;
  }

  renderDetailInfo(info) {
    var detailInfo = [];
    const { max_damage_dealt, max_xp, max_frags_battle, max_planes_killed, main_battery, second_battery, torpedoes, ramming, aircraft } =  info.pvp;
    let title = [language.player_max_damage_dealt, language.player_max_xp, language.player_max_kill, language.player_max_plane,
      language.player_max_main_battery, language.player_max_secondary, language.player_max_torpedo, language.player_max_ramming, language.player_max_aircraft];
    let dataList = [max_damage_dealt, max_xp, max_frags_battle, max_planes_killed,
      main_battery, second_battery, torpedoes, ramming, aircraft];  
    for (var i = 0; i < title.length; i++) {
      var curr = dataList[i];
      if (curr.frags != null) curr = curr.frags;
      if (curr > 0) {
        // Ignore it if it is zero!
        detailInfo.push({title: title[i], number: curr});
      }
    } 
    
    const { numberStyle, titleStyle, recordViewStyle } = styles;
    return detailInfo.map((data, i) => {
      return (
        <View style={recordViewStyle} key={i}>
          <Text style={titleStyle}>{data.title}</Text>
          <Text style={numberStyle}>{data.number}</Text>
        </View>
      )
    })
  }
}

const styles = StyleSheet.create({
  mainViewStyle: {
    flex: 1,
  },
  horizontalViewStyle: {
    justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', flex: 1
  },
  prTextStyle: {
    textAlign: 'center', margin: 2, fontWeight: '300', width: '100%', flex: 1
  },
  imageStyle: {
    marginTop: 8,
    width: 192,
    height: 128,
    alignSelf: 'center',
  },
  shipNameStyle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '300',
    margin: 4,
  },
  ratingStyle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 4,
  },
  recordViewStyle: {
    flex: 1,
    margin: 8,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '300',
  },
  numberStyle: {
    textAlign: 'center',
    fontSize: 34,
    fontWeight: '200',
  }
})