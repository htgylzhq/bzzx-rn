import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Text, ListItem, Body, Spinner, View } from 'native-base';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import AtoZList from 'react-native-atoz-list';
import randomcolor from 'randomcolor';
import http from '../../commons/http';
import { onFetchContacts } from '../../actions/contact';

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 25,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class ContactScreen extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    onFetchContacts: PropTypes.func,
    contacts: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.isUnmounted = false;
  }

  async componentWillMount() {
    await this._fetchData();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  navigate(routeName:string, params:Object) {
    this.props.dispatch(NavigationActions.navigate({
      routeName,
      params,
    }));
  }

  _onPressContact(contact) {
    this.navigate('ContactDetailPage', { contact });
  }

  async _fetchData() {
    const res = await http.get('/platform/api/user/list');
    if (res.code === 0 && !this.isUnmounted) {
      this.props.onFetchContacts(res.data);
      this.setState({ loading: false });
    }
  }

  renderSectionHeader = data => (
    <View style={{ height: 60, justifyContent: 'center', backgroundColor: '#eee', paddingLeft: 30 }}>
      <Text style={{ fontSize: 24 }}>{data.sectionId}</Text>
    </View>
    );

  renderRow = item => (
    <ListItem button style={{ height: 75 }} onPress={() => this._onPressContact(item)}>
      <View style={[styles.avatar, { backgroundColor: 'rgb(179,199,249)' }]}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>{item.username.substring(0, 1)}</Text>
      </View>
      <Body>
        <Text>{item.username}</Text>
        <Text note>{item.unitFullName}</Text>
      </Body>
    </ListItem>
    );

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1 }}>
          {
            this.state.loading
            ?
              <Spinner />
              :
              <AtoZList
                data={this.props.contacts}
                renderCell={this.renderRow}
                cellHeight={75}
                renderSection={this.renderSectionHeader}
                sectionHeaderHeight={60}
                sectionListTextStyle={{ fontSize: 16, paddingLeft: 10, paddingRight: 10 }}
                initialListSize={399}
              />
          }
        </Content>
      </Container>
    );
  }

}

const mapStateToProps = state => ({
  contacts: state.contacts.contacts,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  onFetchContacts: (contacts) => {
    dispatch(onFetchContacts(contacts));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen);
