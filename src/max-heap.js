const Node = require('./node');

class MaxHeap {

	constructor() {

		this.parentNodes = [];
		this.root = null;
		this.heapSize = 0;
	}

	push(data, priority) {

		let node  = new Node (data, priority);

		this.insertNode(node);
		this.shiftNodeUp(node);
		this.heapSize++;
	}

	pop() {
		
		if (this.isEmpty()) {
			return;
		}

		let detRoot = this.detachRoot();
		this.restoreRootFromLastInsertedNode(detRoot);
		if (this.root) {
			this.shiftNodeDown(this.root);
		}
		this.heapSize--;
		return detRoot.data;
		
	}

	detachRoot() {
		
		let heapRoot = this.root;

		if (this.parentNodes[0] === this.root) {
			this.parentNodes.shift();
		}

		this.root = null;
		return heapRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		
		let lastNode = this.parentNodes.pop();

		if (!lastNode) {
			return;
		}

		if (lastNode.parent && lastNode.parent.right && lastNode.parent !== detached) {
			this.parentNodes.unshift(lastNode.parent);
		}

		lastNode.remove();

		if (detached.left) {
			lastNode.appendChild(detached.left);
			if (detached.right) {
				lastNode.appendChild(detached.right); 
			}
		}

		if (!lastNode.right) {
			this.parentNodes.unshift(lastNode); 
		}
		
		this.root = lastNode;
	}

	size() {

		return this.heapSize;		
	}

	isEmpty() {

		return this.root === null;
	}

	clear() {
		
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	insertNode(node) {

		if (this.isEmpty()) {
			this.root = node;
			this.parentNodes.push(node);
			return;
		}

		this.parentNodes.push(node);
		this.parentNodes[0].appendChild(node);

		if (this.parentNodes[0].right) {
			this.parentNodes.shift();
		}
	}

	shiftNodeUp(node) {

		if (!node.parent || node.parent.priority >= node.priority) {
			return;
		}

		let index = this.parentNodes.indexOf(node);
		let parentIndex = this.parentNodes.indexOf(node.parent);
		
		if (index < 0) {
			node.swapWithParent();
			return;
		}		

		if (node.parent === this.root) {
			let temporary = this.root;
			this.root = this.parentNodes[index];
			this.parentNodes[index] = this.root;
		}

		if (parentIndex === -1) {
			this.parentNodes[index] = node.parent;
		
		} else {
			this.parentNodes[index] = node.parent;
			this.parentNodes[parentIndex] = node;
		}

		node.swapWithParent();
		this.shiftNodeUp(node);
	}

	shiftNodeDown(node) {
		
		if (!node.left) {
			return;

		} else if (node.left && !node.right) {

			if (node.priority >= node.left.priority) {
				return;
			}

			let index = this.parentNodes.indexOf(node);
			let leftChildIndex = this.parentNodes.indexOf(node.left);

			if (this.root === node) {
				this.root = node.left;
			}

			this.parentNodes[leftChildIndex] = node;
			this.parentNodes[index] = node.left;
			node.left.swapWithParent();

		} else if (node.left && node.right) {

			let child = node.left.priority >= node.right.priority ? node.left : node.right;
			let childIndex = this.parentNodes.indexOf(child);

			if (child.priority < node.priority) {
				return;
			}

			if (this.root === node) {
				this.root = child;
			}

			if (childIndex >= 0) {
				this.parentNodes[childIndex] = node;
			}
			child.swapWithParent();
		}

		this.shiftNodeDown(node);
	}
}

module.exports = MaxHeap;
