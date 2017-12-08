import React, { Component } from 'react';
import { Body, Card, CardItem, H3, Left, Right, Spinner, Text } from 'native-base';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import http from '../../commons/http';
import { onFetchClueInfo } from '../../actions/clueDetail';

const deviceWidth = Dimensions.get('window').width;

class ClueInfoPage extends Component {

  static propTypes = {
    onFetchClueInfo: PropTypes.func,
    clue: PropTypes.shape({
      title: PropTypes.string,
      createTime: PropTypes.string,
      creatorName: PropTypes.string,
      content: PropTypes.string,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    this._fetchClue();
  }

  async _fetchClue() {
    const clueId = this.props.id;
    const res = await http.get(`/platform/api/cppcc/clue/${clueId}`);
    if (res.code === 0) {
      const data = res.data;
      this.props.onFetchClueInfo(data.clue);
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      this.state.loading
        ?
          <Spinner />
        :
          <Card style={{ paddingLeft: 10, paddingRight: 10 }}>
            <CardItem header style={{ width: deviceWidth * 0.95, marginLeft: 'auto', marginRight: 'auto', borderBottomWidth: 2, borderBottomColor: '#921001', paddingTop: 0, paddingBottom: 0 }}>
              <H3 style={{ fontWeight: '700', fontSize: 20, paddingTop: 17, paddingBottom: 17 }}>{this.props.clue.title}</H3>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Text style={{ fontSize: 13 }}>标题</Text>
              </Left>
              <Right style={{ flex: 3 }}>
                <Text note style={{ fontSize: 12 }}>{this.props.clue.title}</Text>
              </Right>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Text style={{ fontSize: 13 }}>创建时间</Text>
              </Left>
              <Right style={{ flex: 3 }}>
                <Text note style={{ fontSize: 12 }}>{this.props.clue.createTime}</Text>
              </Right>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Text style={{ fontSize: 13 }}>创建人</Text>
              </Left>
              <Right style={{ flex: 3 }}>
                <Text note style={{ fontSize: 12 }}>{this.props.clue.creatorName}</Text>
              </Right>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text note style={{ fontSize: 12 }}>{`“\n${this.props.clue.content}\n”`}</Text>
              </Body>
            </CardItem>
          </Card>
    );
  }
}

const mapStateToProps = state => ({
  clue: state.clueDetail.clue,
});

const mapDispatchToProps = dispatch => ({
  onFetchClueInfo: clue => dispatch(onFetchClueInfo(clue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClueInfoPage);
