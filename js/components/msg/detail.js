import React, { Component } from 'react';
import { Container, Content, Text, Card, CardItem } from 'native-base';
import { connect } from 'react-redux';

class MsgDetailPage extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.navigation.state.params.id);
  }

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem button>
              <Text>Hello</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(MsgDetailPage);
