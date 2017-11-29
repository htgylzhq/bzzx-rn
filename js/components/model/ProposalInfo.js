import React, { Component } from 'react';
import { Card, H3, CardItem, Left, Text, Right } from 'native-base';
import PropTypes from 'prop-types';
import Proposal from '../../models/Proposal';
import theme from '../../themes/base-theme';

export default class ProposalInfo extends Component {

  static propTypes = {
    proposal: PropTypes.shape(Proposal),
  };

  render() {
    const { proposal } = this.props;
    return (
      <Card>
        <CardItem header style={{ backgroundColor: theme.brandInfo }}>
          <H3 style={{ color: '#FFFFFF' }}>{proposal.title}</H3>
        </CardItem>
        <CardItem bordered>
          <Left>
            <Text>届次</Text>
          </Left>
          <Right>
            <Text>{proposal.jieciName}</Text>
          </Right>
        </CardItem>
        <CardItem bordered>
          <Left>
            <Text>界别</Text>
          </Left>
          <Right>
            <Text>{proposal.jiebieName}</Text>
          </Right>
        </CardItem>
        <CardItem bordered>
          <Left>
            <Text>建议承办单位</Text>
          </Left>
          <Right>
            <Text>{proposal.proposalUnitName}</Text>
          </Right>
        </CardItem>
        <CardItem bordered>
          <Left>
            <Text>正式承办单位</Text>
          </Left>
          <Right>
            <Text>{proposal.formalUnitName}</Text>
          </Right>
        </CardItem>
        <CardItem bordered>
          <Left>
            <Text>提案人</Text>
          </Left>
          <Right>
            <Text>{proposal.creatorName}</Text>
          </Right>
        </CardItem>
        <CardItem bordered>
          <Left>
            <Text>联系电话</Text>
          </Left>
          <Right>
            <Text>{proposal.mobile}</Text>
          </Right>
        </CardItem>
        <CardItem bordered>
          <Left>
            <Text>创建时间</Text>
          </Left>
          <Right>
            <Text>{proposal.createTime}</Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
