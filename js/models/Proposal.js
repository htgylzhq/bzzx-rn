export default class Proposal {
  id: string;
  title: string;
  content: string;
  createTime: string;
  creatorName: string;
  state: string;
  jieciName: string;
  jiebieName: string;
  proposalUnitName: string;
  formalUnitName: string;
  mobile: string;

  constructor(obj) {
    Object.assign(this, obj);
  }

}
