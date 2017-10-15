import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Card, CardItem, Left, Right, Thumbnail } from 'native-base';
import { connect } from 'react-redux';

class ProfileItem extends Component {
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

class ProfileScreen extends Component {

  static propTypes = {
    username: PropTypes.string,
    unitName: PropTypes.string,
    mobile: PropTypes.string,
    jiebieName: PropTypes.string,
    sex: PropTypes.string,
    ethnicityName: PropTypes.string,
    educationName: PropTypes.string,
    politicsName: PropTypes.string,
  };

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Text>头像</Text>
              </Left>
              <Right>
                <Thumbnail source={{ uri: 'http://images2015.cnblogs.com/blog/533679/201606/533679-20160627094224718-806139364.png' }} />
              </Right>
            </CardItem>
            <ProfileItem label={'姓名'} value={this.props.username} />
            <ProfileItem label={'手机号'} value={this.props.mobile} />
            <ProfileItem label={'部门'} value={this.props.unitName} />
            <ProfileItem label={'界别'} value={this.props.jiebieName} />
            <ProfileItem label={'性别'} value={this.props.sex} />
            <ProfileItem label={'民族'} value={this.props.ethnicityName} />
            <ProfileItem label={'学历'} value={this.props.educationName} />
            <ProfileItem label={'政治面貌'} value={this.props.politicsName} />
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { id, unitName, username, jiguan, weiyuan, mobile, sex, jiebieName, ethnicityName, educationName, politicsName } = state.auth.user;
  return { id, unitName, username, jiguan, weiyuan, mobile, sex, jiebieName, ethnicityName, educationName, politicsName };
};

export default connect(mapStateToProps)(ProfileScreen);
