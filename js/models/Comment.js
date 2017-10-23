export default class Comment {
  id: string;
  content: string;
  createTime: string;
  creatorName: string;

  constructor(obj) {
    Object.assign(this, obj);
  }

}
