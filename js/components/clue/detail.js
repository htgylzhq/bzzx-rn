import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Tab, Tabs, Text } from 'native-base';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import ClueInfoPage from './info';

const styles = StyleSheet.create({
  tabText: {
    color: '#000',
  },
  tabActiveText: {
    color: '#941001',
  },
  tab: {
    backgroundColor: '#fff',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  activeTab: {
    backgroundColor: '#fff',
  },
});

class ClueDetailIndex extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.object,
    }),
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      params: this.props.navigation.state.params,
    };
  }

  navigate(routeName:string, params:Object) {
    this.props.dispatch(NavigationActions.navigate({
      routeName,
      params,
    }));
  }

  render() {
    return (
      <Container>
        <Tabs locked tabBarUnderlineStyle={{ backgroundColor: '#941001' }}>
          <Tab
            heading={'基础信息'}
            textStyle={styles.tabText}
            activeTextStyle={styles.tabActiveText}
            tabStyle={styles.tab}
            activeTabStyle={styles.activeTab}
          >
            <ClueInfoPage id={this.state.params.id} />
          </Tab>
          <Tab
            heading={'评论'}
            textStyle={styles.tabText}
            activeTextStyle={styles.tabActiveText}
            tabStyle={styles.tab}
            activeTabStyle={styles.activeTab}
          >
            <Text>评论</Text>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  nothing: state.nothing,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ClueDetailIndex);
