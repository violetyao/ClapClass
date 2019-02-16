// functions

/*
v1, v2 are two list of numbers
Assume v1, v2 belong to the same course subject
*/
function correlation(v1, v2) {
    sum = 0;
    for (i = 0; i < v2.length; i++) {
        sum += v1[i] * v2[i];
    }
    return sum;
}

function matrix_correlation(m1, m2) {
    cor = 0;
    for (i = 0; i < m1.length; i++) {
        cor += correlation(m1[i], m2[i]);
    }
    return cor;
}


function comp(t1, t2){
	return t1[1] - t2[1];
}
/*
return a list of indices of candidates, from the most correlated to the least correlated
user_list is [[sbj_1], [subj_2], ... ]
candidates is 	[
					[[sbj_11], [subj_12], ... ],
					[[sbj_21], [subj_22], ... ]
				]
*/
function rank_users(user_list, candidates){
	// max = 0;
	// max_index = 0;
	var queue = new PriorityQueue(comp);
	for (i = 0; i < candidates.length; i++) {
		curr_correlation = matrix_correlation(candidates[i], user_list);
		var data_pair = [i, curr_correlation];
		queue.push(data_pair);
	}
	var result = new Array(candidates.length);
	for (i = 0; i < candidates.length; i++) {
		result[n - i - 1] = queue.pop(); 
	}
	return result;
}

/*
return a list of list of indices
for each user in the user_lists, find his preference ranking list (using rank_users())
and then we combine all these ranking lists into a big list and return it
*/

function complete_ranking_users(user_lists) {
    rankings = [];
    for (i = 0; i < user_lists.length; i++) {
        rankings.push(rank_users(user_lists[i], user_lists))
    }
    return rankings

}



const top = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;

class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  peek() {
    return this._heap[top];
  }
  push(...values) {
    values.forEach(value => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this._swap(top, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }
  replace(value) {
    const replacedValue = this.peek();
    this._heap[top] = value;
    this._siftDown();
    return replacedValue;
  }
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  _siftUp() {
    let node = this.size() - 1;
    while (node > top && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }
  _siftDown() {
    let node = top;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
 }

