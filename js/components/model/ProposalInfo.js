import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Card, H3, CardItem, Left, Text, Right } from 'native-base';
import PropTypes from 'prop-types';
import Proposal from '../../models/Proposal';

const deviceWidth = Dimensions.get('window').width;
export default class ProposalInfo extends Component {

  static propTypes = {
    proposal: PropTypes.shape(Proposal),
  };

  render() {
    const { proposal } = this.props;
    return (
      <Card style={{ paddingLeft: 10, paddingRight: 10, marginLeft: 0 }}>
        <CardItem header style={{ width: deviceWidth * 0.95, marginLeft: 'auto', marginRight: 'auto', borderBottomWidth: 2, borderBottomColor: '#921001', paddingTop: 0, paddingBottom: 0 }}>
          <H3 style={{ fontWeight: '700', fontSize: 20, paddingTop: 17, paddingBottom: 17 }}>{proposal.title}</H3>
        </CardItem>
        <CardItem bordered>
          <Left>
            <Text style={{ fontSize: 13 }}>届次</Text>
          </Left>
          <Right style={{ flex: 3 }}>
            <Text note style={{ fontSize: 12 }}>{proposal.jieciName}</Text>
          </Right>
        </CardItem>
        <CardItem bordered>
          <Left>
            <Text style={{ fontSize: 13 }}>界别</Text>
          </Left>
          <Right style={{ flex: 3 }}>
            <Text note style={{ fontSize: 12 }}>{proposal.jiebieName}</Text>
          </Right>
        </CardItem>
        <CardItem bordered>
          <Left>
            <Text style={{ fontSize: 13 }}>建议承办单位</Text>
          </Left>
          <Right>
            <Text note style={{ fontSize: 12 }}>{proposal.proposalUnitName}</Text>
          </Right>
        </CardItem>
        <CardItem bordered>
          <Left>
            <Text style={{ fontSize: 13 }}>正式承办单位</Text>
          </Left>
          <Right>
            <Text note style={{ fontSize: 12 }}>{proposal.formalUnitName}</Text>
          </Right>
        </CardItem>
        <CardItem bordered>
          <Left>
            <Text style={{ fontSize: 13 }}>提案人</Text>
          </Left>
          <Right style={{ flex: 3 }}>
            <Text note style={{ fontSize: 12 }}>{proposal.creatorName}</Text>
          </Right>
        </CardItem>
        <CardItem bordered>
          <Left>
            <Text style={{ fontSize: 13 }}>联系电话</Text>
          </Left>
          <Right style={{ flex: 3 }}>
            <Text note style={{ fontSize: 12 }}>{proposal.mobile}</Text>
          </Right>
        </CardItem>
        <CardItem bordered>
          <Left>
            <Text style={{ fontSize: 13 }}>创建时间</Text>
          </Left>
          <Right style={{ flex: 3 }}>
            <Text note style={{ fontSize: 12 }}>{proposal.createTime}</Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
