import React, { Component } from 'react';
import { Card, Text, CardItem, Left, Right, ListItem } from 'native-base';
import PropTypes from 'prop-types';
import Proposal from '../../models/Proposal';

export default class ProposalDone extends Component {

  static propTypes = {
    proposal: PropTypes.shape(Proposal),
    onPress: PropTypes.func,
  };

  render() {
    const { proposal, onPress } = this.props;
    return (
      <ListItem style={{ paddingTop: 0, paddingBottom: 0, marginLeft: 0 }} onPress={onPress}>
        <Card transparent style={{ marginLeft: 0 }}>
          <CardItem header style={{ paddingTop: 0, paddingBottom: 5 }}>
            <Left>
              <Text numberOfLines={1} style={{ fontSize: 12, marginLeft: 0 }} ellipsizeMode={'tail'} >{proposal.title}</Text>
            </Left>
          </CardItem>
          <CardItem style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Left>
              <Text note style={{ fontSize: 10, marginLeft: 0 }}>{proposal.creatorName}</Text>
            </Left>
            <Right>
              <Text note style={{ fontSize: 10 }}>{proposal.createTime}</Text>
            </Right>
          </CardItem>
        </Card>
      </ListItem>
    );
  }
}
