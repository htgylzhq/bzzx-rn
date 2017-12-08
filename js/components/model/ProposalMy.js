import React, { Component } from 'react';
import { Card, Text, CardItem, Left, Right, ListItem } from 'native-base';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import Proposal from '../../models/Proposal';

export default class ProposalMy extends Component {

  static propTypes = {
    proposal: PropTypes.shape(Proposal),
    dispatch: PropTypes.func,
    onPress: PropTypes.func,
  };

  navigate(routeName:string, params:Object) {
    this.props.dispatch(NavigationActions.navigate({
      routeName,
      params,
    }));
  }

  _onPress = () => {
    if (this.props.onPress) {
      return this.props.onPress();
    }

    if (this.props.dispatch) {
      if (this.props.proposal.state !== '待提交') {
        return this.navigate('ProposalDetailPage', this.props.proposal);
      }

      return this.navigate('ProposalFormPage', this.props.proposal);
    }

    return (() => {})();
  };

  render() {
    const { proposal } = this.props;
    return (
      <ListItem style={{ paddingTop: 0, paddingBottom: 0, marginLeft: 0 }} onPress={this._onPress}>
        <Card transparent style={{ marginLeft: 0 }}>
          <CardItem header style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Left>
              <Text numberOfLines={1} style={{ fontSize: 12, marginLeft: 0 }}>{proposal.title}</Text>
            </Left>
          </CardItem>
          <CardItem style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Left>
              <Text note style={{ fontSize: 10, marginLeft: 0 }}>{proposal.state}</Text>
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
