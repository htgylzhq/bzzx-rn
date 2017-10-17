export default class Msg {
  id: string;
  title: string;
  content: string;
  createTime: string;

  constructor(obj) {
    Object.assign(this, obj);
  }

}
