import _ from 'lodash';
import { Toast } from 'native-base';

export const unshift = (array0, array1) => {
  array1.reverse().forEach((element) => {
    const index = _.findIndex(array0, { id: element.id });
    if (index >= 0) {
      array0.splice(index, 1);
      array0.unshift(element);
    } else {
      array0.unshift(element);
    }
  });
  return array0;
};

export const push = (array0, array1) => {
  array1.forEach((element) => {
    const index = _.findIndex(array0, { id: element.id });
    if (index >= 0) {
      array0.splice(index, 1);
      array0.push(element);
    } else {
      array0.push(element);
    }
  });
  return array0;
};

export const Toaster = {
  success: (text) => {
    Toast.show({
      text,
      buttonText: '确定',
      position: 'bottom',
      type: 'success',
      duration: 3000,
    });
  },
  warn: (text) => {
    Toast.show({
      text,
      buttonText: '确定',
      position: 'bottom',
      type: 'warning',
      duration: 3000,
    });
  },
  error: (text) => {
    Toast.show({
      text,
      buttonText: '确定',
      position: 'bottom',
      type: 'danger',
    });
  },
};

export const delay = time => new Promise(resolve => setTimeout(resolve, time));
