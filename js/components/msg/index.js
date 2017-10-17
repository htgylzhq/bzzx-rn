import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, View, Text, List, ListItem, H3, Card, CardItem } from 'native-base';
import { refresh } from '../../actions/msg';
// import http from '../../commons/http';
import Msg from '../../models/Msg';

class MsgScreen extends Component {

  static propTypes = {
    msgs: PropTypes.arrayOf(PropTypes.object),
    refresh: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      refreshing: false,
    };
  }

  componentWillMount() {
    /* http.get('').then((response) => {
      console.log('response', response);
      if (response.data.code === 0) {
        const msgs = response.data.data.map(obj => new Msg(obj));
        this.props.refresh(msgs);
      } else {
        // 查询留言失败
        // Todo Alert("查询留言失败！");
      }
    }).catch((error) => {
      console.log('Refresh msgs error: ', error);
    });*/
    const msgs = [
      {
        title: '在好的大学里上学是一种什么感觉？',
        content: '复旦大二狗（别人提醒我说这个大学可以直接写出来……）感受如下：1.在教室自习，手机电脑钱包随处乱放，根本不用担心被偷（反而丢车的几率会大很多）；2.大部分老师是很负责的，讲课干货很多，然而讲的有趣的老师就少了。不过可以明显看到，大学老师还是比高中老师有水平很多；3.同学智商情商都很高，撕逼问题很少出现（虽然不是没有）；',
        createTime: '2017-10-13',
      },
      {
        title: '在好的大学里上学是一种什么感觉？',
        content: '复旦大二狗（别人提醒我说这个大学可以直接写出来……）感受如下：1.在教室自习，手机电脑钱包随处乱放，根本不用担心被偷（反而丢车的几率会大很多）；2.大部分老师是很负责的，讲课干货很多，然而讲的有趣的老师就少了。不过可以明显看到，大学老师还是比高中老师有水平很多；3.同学智商情商都很高，撕逼问题很少出现（虽然不是没有）；',
        createTime: '2017-10-13',
      },
      {
        title: '在好的大学里上学是一种什么感觉？',
        content: '复旦大二狗（别人提醒我说这个大学可以直接写出来……）感受如下：1.在教室自习，手机电脑钱包随处乱放，根本不用担心被偷（反而丢车的几率会大很多）；2.大部分老师是很负责的，讲课干货很多，然而讲的有趣的老师就少了。不过可以明显看到，大学老师还是比高中老师有水平很多；3.同学智商情商都很高，撕逼问题很少出现（虽然不是没有）；',
        createTime: '2017-10-13',
      },
    ];
    this.props.refresh(msgs);
  }

  _loadMore() {
    if (this.props.msgs.length === 0) {
      return;
    }
    const msgs = [
      {
        title: '在好的大学里上学',
        content: '复旦大二狗（别人提醒我说这个大学可以直接写出来……）感受如下：1.在教室自习，手机电脑钱包随处乱放，根本不用担心被偷（反而丢车的几率会大很多）；2.大部分老师是很负责的，讲课干货很多，然而讲的有趣的老师就少了。不过可以明显看到，大学老师还是比高中老师有水平很多；3.同学智商情商都很高，撕逼问题很少出现（虽然不是没有）；',
        createTime: '2017-10-14',
      },
      {
        title: '在好的大学里上学',
        content: '复旦大二狗（别人提醒我说这个大学可以直接写出来……）感受如下：1.在教室自习，手机电脑钱包随处乱放，根本不用担心被偷（反而丢车的几率会大很多）；2.大部分老师是很负责的，讲课干货很多，然而讲的有趣的老师就少了。不过可以明显看到，大学老师还是比高中老师有水平很多；3.同学智商情商都很高，撕逼问题很少出现（虽然不是没有）；',
        createTime: '2017-10-14',
      },
      {
        title: '在好的大学里上学',
        content: '复旦大二狗（别人提醒我说这个大学可以直接写出来……）感受如下：1.在教室自习，手机电脑钱包随处乱放，根本不用担心被偷（反而丢车的几率会大很多）；2.大部分老师是很负责的，讲课干货很多，然而讲的有趣的老师就少了。不过可以明显看到，大学老师还是比高中老师有水平很多；3.同学智商情商都很高，撕逼问题很少出现（虽然不是没有）；',
        createTime: '2017-10-14',
      },
    ];
    console.log('End...Load more...');
    this.props.msgs.concat(msgs);
  }

  _renderMsgItem(msg:Msg) {
    return (
      <ListItem>
        <Card transparent>
          <CardItem header>
            <H3 numberOfLines={1} >{msg.title}</H3>
          </CardItem>
          <CardItem>
            <Text numberOfLines={3}>{msg.content}</Text>
          </CardItem>
          <CardItem footer>
            <Text note>{msg.createTime}</Text>
          </CardItem>
        </Card>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <View>
          <List
            dataArray={this.props.msgs}
            renderRow={item => this._renderMsgItem(item)}
            onEndReachedThreshold={20}
            onEndReached={() => { this._loadMore(); }}
            refreshControl={<RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({ refreshing: true });
                console.log('refresh');
                setTimeout(() => {
                  this.setState({ refreshing: false });
                });
              }}
            />}
          />
        </View>
      </Container>
    );
  }

}

const mapStateToProps = state => ({ msgs: state.msgs });

const mapDispatchToProps = dispatch => ({
  refresh: (msgs) => {
    dispatch(refresh(msgs));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MsgScreen);
