export default class ProposalLog {
  id: string;
  taskName: string;
  createTime: string;
  userName: string;
  content: string;

  constructor(obj) {
    Object.assign(this, obj);
  }

}
