export default class Node {
    constructor(id, show, label) {
      this.id = id;
      this.show = show;
      this.label = label;
      this.childs = [];
    }
  }