// functions

const suggestionMax = 100;
/*
* v1, v2 are two list of numbers
* Assume v1, v2 belong to the same course subject
*/

function correlation(v1, v2) {
    sum = 0;
    for (i = 0; i < v2.length; i++) {
        sum += v1[i] * v2[i];
    }
    return sum;
}

/*
* @deprecated
*/
function matrix_correlation(m1, m2) {
    cor = 0;
    for (i = 0; i < m1.length; i++) {
        cor += correlation(m1[i], m2[i]);
    }
    return cor;
}


function computeUserCorrelation(id1, id2){
	// TODO: basically get_same_classes(id1, di2).length

}

function comp(t1, t2){
	return t1[1] - t2[1];
}

/*
* @param u: user class
* @param candidates: a list of candidates
* return a list of preferences [[id, val], [id, val], ...]
*/
function rank_users(u, candidates){
	var queue = new PriorityQueue(comp);
	for (i = 0; i < candidates.length; i++) {
		var cand = candidates[i];
		var curr_correlation = computeUserCorrelation(u, cand);
		var data_pair = [cand.uid, curr_correlation];
		queue.push(data_pair);
	}
	var result = new Array(candidates.length);
	for (i = 0; i < Math.min(candidates.length, suggestionMax) ; i++) {
		result[n - i - 1] = queue.pop()[0]; 
	}
	return result;
}

// function delete_preference(u, index){
// 	// TODO: pList = getPreference(u.id);
// 	pList.splice(index, 1);
// 	u.preference = pList;
// 	// TODO: store back!!
// }



/*
return a list of list of indices
for each user in the user_lists, find his preference ranking list (using rank_users())
and then we combine all these ranking lists into a big list and return it
*/

function complete_ranking_users(users) {
    for (i = 0; i < users.length; i++) {
        pList = rank_users(users[i], users);
        pList.shift(); // delte the first entry, which is itself
        users[i].preference = pList;
		users[i].write();        
    }
}

/*
* u: user type
* Further improve the preference lists for u
* Return the list, does not update directly to user
*/

function further_improve_ranking(u, users){
	pList = u.preference;
	var newList = new Array(pList.length);
	var queue = new PriorityQueue(comp);

	for (i = 0; i < pList.length; i ++){

		var origin_corr = pList[i][1];
		var other_id = pList[i][0];

		var ux = users[other_id];

		var answer_corr = correlation(u.answers, ux.answers);
		var new_corr = answer_corr * origin_corr;
		queue.push([other_id, new_corr]);
	}
	for (i = 0; i < Math.min(candidates.length, suggestionMax) ; i++) {
		newList[n - i - 1] = queue.pop()[0]; 
	}
	return newList;
}

/*
* Use f_i_r to improve everyone
*/

function further_improve_everyone(users){
	for (i =0; i < users.length; i ++){
		var u = users[i];
		var new_list = further_improve_ranking(u, users);
		u.preference = new_list;
		u.write();
	}
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
