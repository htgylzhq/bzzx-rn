import React, { Component } from 'react';
import { Card, Text, CardItem, Left, Right, ListItem } from 'native-base';
import PropTypes from 'prop-types';
import Proposal from '../../models/Proposal';

export default class ProposalMy extends Component {

  static propTypes = {
    proposal: PropTypes.shape(Proposal),
  };

  render() {
    const { proposal } = this.props;
    return (
      <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Card transparent>
          <CardItem header style={{ paddingTop: 0, paddingBottom: 5 }}>
            <Left>
              <Text numberOfLines={1}>{proposal.title}</Text>
            </Left>
          </CardItem>
          <CardItem style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Left>
              <Text note>{proposal.state}</Text>
            </Left>
            <Right>
              <Text note>{proposal.createTime}</Text>
            </Right>
          </CardItem>
        </Card>
      </ListItem>
    );
  }
}
