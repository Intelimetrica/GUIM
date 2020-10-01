import Node from './Node';

export default class Tree {
  constructor() {
    this.root = null;
  }

  add(id, show, label, idFather) {
    const newNode = new Node(id, show, label, idFather);
    if (this.root !== null) {
      console.log(label);
    } else {
      this.root = newNode;
    }
  }
}