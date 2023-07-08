import { isEmpty, isNil, omit, omitBy, pickBy } from 'lodash';

// exclude null - undefine - ''
export const filterObject = (data: object) => {
  return omitBy(data, (value) => isNil(value) || isEmpty(value));
};

export const sliceObject = (data: object, propterty: Array<keyof object>) => {
  return omit(data, propterty);
};
