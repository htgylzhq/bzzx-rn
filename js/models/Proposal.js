export default class Proposal {
  id: string;
  title: string;
  content: string;
  createTime: string;
  creatorName: string;
  state: string;

  constructor(obj) {
    Object.assign(this, obj);
  }

}
