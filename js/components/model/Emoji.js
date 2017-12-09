import React, { Component } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

const emojiObj = {
  tieba: [
    require('../../plugs/jQuery-emoji-master/src/img/tieba/1.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/2.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/3.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/4.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/5.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/6.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/7.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/8.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/9.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/10.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/11.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/12.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/13.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/14.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/15.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/16.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/17.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/18.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/19.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/20.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/21.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/22.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/23.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/24.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/25.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/26.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/27.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/28.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/29.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/30.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/31.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/32.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/33.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/34.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/35.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/36.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/37.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/38.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/39.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/40.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/41.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/42.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/43.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/44.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/45.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/46.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/47.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/48.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/49.jpg'),
    require('../../plugs/jQuery-emoji-master/src/img/tieba/50.jpg'),
  ],
  qq: [
    require('../../plugs/jQuery-emoji-master/src/img/qq/1.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/2.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/3.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/4.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/5.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/6.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/7.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/8.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/9.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/10.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/11.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/12.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/13.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/14.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/15.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/16.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/17.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/18.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/19.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/20.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/21.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/22.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/23.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/24.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/25.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/26.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/27.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/28.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/29.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/30.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/31.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/32.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/33.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/34.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/35.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/36.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/37.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/38.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/39.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/40.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/41.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/42.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/43.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/44.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/45.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/46.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/47.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/48.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/49.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/50.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/51.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/52.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/53.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/54.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/55.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/56.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/57.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/58.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/59.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/60.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/61.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/62.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/63.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/64.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/65.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/66.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/67.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/68.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/69.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/70.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/71.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/72.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/73.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/74.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/75.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/76.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/77.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/78.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/79.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/80.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/81.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/82.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/83.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/84.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/85.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/86.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/87.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/88.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/89.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/90.gif'),
    require('../../plugs/jQuery-emoji-master/src/img/qq/91.gif'),
  ],
};

export default class Emoji extends Component {
  static propTypes = {
    type: PropTypes.string,
    imgNum: PropTypes.number,
  };
  judgeType(type, imgNum) {
    let box = null;
    switch (type) {
      case 'tieba' :
        box = emojiObj.tieba[imgNum - 1];
        break;
      case 'qq' :
        box = emojiObj.qq[imgNum - 1];
        break;
      default:
        break;
    }
    return box;
  }
  render() {
    const { type, imgNum } = this.props;
    const img = this.judgeType(type, imgNum);
    return <Image source={img} />;
  }
}
