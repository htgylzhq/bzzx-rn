
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export default {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
    overflow: 'hidden',
  },
  shadow: {
    flex: 1,
    height: deviceHeight - 25,
  },
  logo: {
    width: deviceWidth * 0.85,
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'absolute',
    left: (deviceWidth * 0.15) / 2,
    top: -50,
  },
  bg: {
    width: deviceWidth * 0.8,
    position: 'absolute',
    top: deviceHeight * 0.4,
    left: (deviceWidth * 0.2) / 2,
    height: 200,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
    bottom: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
    width: deviceWidth * 0.5,
    backgroundColor: 'rgb(148,16,1)',
  },
};
