import React, { Component } from 'react';
import { Text, View } from 'native-base';
import PropTypes from 'prop-types';
import Emoji from './Emoji';

export default class CommentContent extends Component {
  static propTypes = {
    content: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  dealContent(content) {
    const box = {};
    box.content = content;
    const reg = new RegExp('<img class="emoji_icon" src=".*?">', 'g');
    const check = box.content.match(reg);
    if (!check) {
      return <Text note style={{ fontSize: 12 }}>{box.content}</Text>;
    }
    const contentAry = [];
    const lastContent = check.map((v, i) => {
      const end = box.content.indexOf(v);
      const start = ((i - 1) >= 0) ? check[i - 1].length : 0;
      contentAry.push(box.content.slice(start, end));
      const checkSlice = check[i].slice(1, -1).split('src=')[1].split('/');
      const imgType = checkSlice[checkSlice.length - 2];
      const img = checkSlice[checkSlice.length - 1].slice(0, -1).split('.')[0];
      contentAry.push({ type: imgType, imgNum: Number(img) });
      box.content = box.content.slice(end);
      if (i === check.length - 1) {
        const boxEnd = box.content.slice(check[i].length);
        box.content = boxEnd;
      }
      return box.content;
    });
    contentAry.push(lastContent);
    return contentAry.map((item, index) => this.contentType(item, index));
  }
  contentType(item, index) {
    if (typeof item === 'object' && item.type && item.type !== '') {
      return <Emoji key={index} type={item.type} imgNum={item.imgNum} />;
    }
    return <Text note style={{ fontSize: 12 }} key={index}>{item}</Text>;
  }
  render() {
    const { content } = this.props;
    return (
      <View>
        {this.dealContent(content)}
      </View>
    );
  }
}
