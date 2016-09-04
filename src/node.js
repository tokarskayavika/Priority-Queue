class Node {
	constructor(data, priority) {

		this.data = data;
		this.priority = priority;
		this.left = null;
		this.right = null;
		this.parent = null;
	}

	appendChild(node) {

		if (this.left === null) {
			this.left = node;
			node.parent = this;

		} else if (this.right === null) {
			this.right = node;
			node.parent = this;
		}
	} 

	removeChild(node) {

		if (this.left === node) {
			this.left = null;
			node.parent = null;

		} else if (this.right === node) {
			this.right = null;
			node.parent = null;

		} else {
			throw new Error();
		}
	}

	remove() {

		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {

		if (!this.parent) {
			return;
		}

		let leftChild = this.left;
		let rightChild = this.right;
		let tempPraParent = this.parent.parent;

		if (leftChild) {
			leftChild.parent = this.parent;
		}

		if (rightChild) {
			rightChild.parent = this.parent;
		}
			
		if (tempPraParent && tempPraParent.left === this.parent) {
			tempPraParent.left = this;

		} else if (tempPraParent && tempPraParent.right === this.parent) {

			tempPraParent.right = this;
		}
		
		if (this.parent.left === this) {
			let tempRight = this.parent.right;

			this.parent.right = rightChild;
			this.parent.left = leftChild;
			this.parent.parent = this;
			this.left = this.parent;
			this.right = tempRight;
			
			if (tempRight) {
				tempRight.parent = this;
			}

		} else if (this.parent.right === this) {
			
			let tempLeft = this.parent.left;
			
			this.parent.right = rightChild;
			this.parent.left = leftChild;
			this.parent.parent = this;
			this.right = this.parent;
			this.left = tempLeft;
			
			if (tempLeft) {
				tempLeft.parent = this;
			}
		}

		this.parent = tempPraParent;
	}
}

module.exports = Node;
