import React, { Component } from 'react';
import { Image } from 'react-native';
import { View } from 'native-base';
import PropTypes from 'prop-types';

export default class ProposalDiagram extends Component {

  static propTypes = {
    proposalId: PropTypes.string,
  };

  render() {
    const { proposalId } = this.props;
    return (
      <View style={{ paddingTop: 75, flex: 1, alignItems: 'center', alignSelf: 'center' }}>
        <Image
          style={{ width: 429, height: 183, transform: [{ rotate: '90deg' }] }}
          resizeMode="cover"
          source={{ uri: `http://bzzx.tengri.cc/platform/cppcc/proposal/diagram?id=${proposalId}` }}
        />
      </View>
    );
  }
}
