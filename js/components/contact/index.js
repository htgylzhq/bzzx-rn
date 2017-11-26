import React, { Component } from 'react';
import { Container, Content, Text, ListItem, Body, Spinner } from 'native-base';
import { connect } from 'react-redux';
import AtoZListView from 'react-native-atoz-listview';
import { Toaster } from '../../commons/util';
import http from '../../commons/http';

class ContactScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    this._fetchData();
  }

  _fetchData() {
    http.get('/platform/api/user/list')
      .then((response) => {
        if (response.data.code === 0) {
          const data = response.data.data;
          this.setState({ data, loading: false });
        } else {
          Toaster.warn(response.data.msg);
        }
        this.setState({ loading: false });
      })
      .catch((err) => {
        Toaster.error(err);
      });
  }

  renderSectionHeader = (sectionData, sectionId) => (
    <ListItem itemDivider style={{ height: 60 }}>
      <Text style={{ fontSize: 24 }}>{sectionId}</Text>
    </ListItem>
    );

  renderRow = item => (
    <ListItem button style={{ height: 75 }} onPress={() => console.log('item: ', item)}>
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
              <AtoZListView
                data={this.state.data}
                renderRow={this.renderRow}
                rowHeight={75}
                renderSectionHeader={this.renderSectionHeader}
                sectionHeaderHeight={60}
                sectionListTextStyle={{ fontSize: 16, paddingLeft: 10, paddingRight: 10 }}
                initialListSize={999}
              />
          }
        </Content>
      </Container>
    );
  }

}

export default connect()(ContactScreen);
