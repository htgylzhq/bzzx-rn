import _ from 'lodash';

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
