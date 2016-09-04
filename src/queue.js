const MaxHeap = require('./max-heap.js');

class PriorityQueue {

	constructor(maxSize) {
		
		this.queueSize = 0;
		
		if (maxSize) {
			if (maxSize <= 0) {
				return;
			}
			this.maxSize = maxSize;

		} else {
			this.maxSize = 30;
		}

		this.heap = new MaxHeap();
	}

	push(data, priority) {

		if (this.queueSize === this.maxSize){
			throw new Error();
		}
		this.heap.push(data, priority);
		this.queueSize++;
	}

	shift() {

		if (this.isEmpty()) {
			throw new Error();
		}

		this.queueSize--;
		return this.heap.pop();
	}

	size() {

		return this.queueSize;
	}

	isEmpty() {

		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
