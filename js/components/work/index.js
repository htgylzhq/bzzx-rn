import React, { Component } from 'react';
import { Container, Content, Icon, Card, CardItem, Text, H3 } from 'native-base';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import theme from '../../themes/base-theme';

class WorkScreen extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
  };

  navigate(routeName:string, params:Object) {
    this.props.dispatch(NavigationActions.navigate({
      routeName,
      params,
    }));
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header>
              <Icon active name={'paper'} style={{ color: theme.brandPrimary, fontSize: 36 }} />
              <H3> 政协提案</H3>
            </CardItem>
            <CardItem button bordered onPress={() => this.navigate('ProposalIndex', { tab: 'my' })}>
              <Icon active name={'folder'} style={{ color: theme.brandInfo }} />
              <Text>我的提案</Text>
            </CardItem>
            <CardItem button bordered onPress={() => this.navigate('ProposalIndex', { tab: 'todo' })}>
              <Icon active name={'radio-button-off'} style={{ color: theme.brandDanger }} />
              <Text>我的待办</Text>
            </CardItem>
            <CardItem button bordered onPress={() => this.navigate('ProposalIndex', { tab: 'done' })}>
              <Icon active name={'checkbox'} style={{ color: theme.brandSuccess }} />
              <Text>我的已办</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem header button onPress={() => this.navigate('ClueIndex')}>
              <Icon active name={'attach'} style={{ color: theme.brandPrimary, fontSize: 36 }} />
              <H3> 提案线索</H3>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ nothing: state.nothing || '' });

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkScreen);
