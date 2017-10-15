export default class User {
  id: string;
  loginname: string;
  username: string;
  jiguan: boolean;
  weiyuan: boolean;
  educationName: string;
  ethnicityName: string;
  jiebieName: string;
  mobile: string;
  politicsName: string;
  sex: string;
  unitName: string;
  topUnitId: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
