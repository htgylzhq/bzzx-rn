import React, { Component } from 'react';
import { Linking } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Card, CardItem, Left, Right, Body, Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import { Toaster } from '../../commons/util';

class FieldItem extends Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
  };

  render() {
    return (
      <CardItem>
        <Left>
          <Text>{this.props.label}</Text>
        </Left>
        <Right>
          <Text note>{this.props.value}</Text>
        </Right>
      </CardItem>
    );
  }
}

class ContactDetailPage extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.object,
    }),
  };

  callNumber = (mobile) => {
    const url = `tel:${mobile}`;
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        Toaster.warn('调用系统拨号失败');
        return null;
      }

      return Linking.openURL(url);
    }).catch(() => Toaster.warn('调用系统拨号失败')
  );
  };

  render() {
    const { contact } = this.props.navigation.state.params;

    return (
      <Container>
        <Content>
          <Card>
            <FieldItem label={'姓名'} value={contact.username} />
            <FieldItem label={'部门'} value={contact.unitName} />
            <FieldItem label={'界别'} value={contact.jiebieName} />
            <FieldItem label={'性别'} value={contact.sex} />
            <FieldItem label={'民族'} value={contact.ethnicityName} />
            <FieldItem label={'学历'} value={contact.educationName} />
            <FieldItem label={'政治面貌'} value={contact.politicsName} />
            <CardItem>
              <Body>
                <Button block style={{ backgroundColor: '#941001' }} onPress={() => this.callNumber(contact.mobile)}>
                  <Icon name="call" />
                  <Text>{contact.mobile}</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default connect()(ContactDetailPage);
