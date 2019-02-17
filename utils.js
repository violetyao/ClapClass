// functions

const suggestionMax = 100;
const improvedSuggestionMax = 20;




/*
* v1, v2 are two list of numbers
* Assume v1, v2 belong to the same course subject
*/
function correlation(v1, v2) {
    let sum = 0;
    for (i = 0; i < v2.length; i++) {
        sum += v1[i] * v2[i];
    }
    return sum;
}

/*
* @deprecated
*/
function matrix_correlation(m1, m2) {
    let cor = 0;
    for (let i = 0; i < m1.length; i++) {
        cor += correlation(m1[i], m2[i]);
    }
    return cor;
}


/*
 * return a number representing correlation
 */
function computeUserCorrelation(uid1, uid2){
	// TODO: basically get_same_classes(id1, di2).length
    return get_same_class(uid1, uid2).length;
}

function comp(t1, t2){
	return t1[1] - t2[1];
}

/*
* @param uid: a user id
* @param all_user_id: a list of user_id
* return a list of preferences [[id, val], [id, val], ...]
*/
function rank_users(uid, all_user_id){
    // console.log("object: "+uid);
    // console.log("all other users: ");
    // console.log(all_user_id);
	let queue = new PriorityQueue(comp);
    let l = Math.min(all_user_id.length, suggestionMax);
    for (i = 0; i < all_user_id.length; i++) {
		let cand_id = all_user_id[i];

		if (cand_id !== uid) { // avoid compareing to itself
            let curr_correlation = computeUserCorrelation(uid, cand_id);
            let data_pair = [get_stu_id(cand_id), curr_correlation];
            queue.push(data_pair);
            l --;
        }
	}
	// let result = new Array(candidates.length);
	let result = new Array(l);
	for (i = 0; i < l ; i++) {
		result[l - i - 1] = queue.pop();
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
function complete_ranking_users(all_user_id) {
    for (i = 0; i < all_user_id.length; i++) {
        let uid = all_user_id[i];
        let pList = rank_users(uid, all_user_id);
        // all_user_id[i].preference = pList;
		// all_user_id[i].write();
        update_preference(uid, all_user_id)
    }
}

function firstWaveSuggestion(){
    let user_ids = get_userid_list();
    complete_ranking_users(user_ids);
}

/*
* u: user type
* Further improve the preference lists for u
* Return the list, does not update directly to user
*/

function further_improve_ranking(uid){
	let pList = u.preference;
	let l = Math.min(pList.length, improvedSuggestionMax);

	let newList = new Array(l);
	let queue = new PriorityQueue(comp);

	for (i = 0; i < pList.length; i ++){

		let origin_corr = pList[i][1];
		let other_stu_id = pList[i][0];
        let other_uid = fetch_user_id(other_stu_id);

		let answer_corr = correlation(get_user_answer(uid), get_user_answer(other_uid));
		let new_corr = answer_corr * origin_corr;
		queue.push([other_stu_id, new_corr]);
	}
	for (i = 0; i < l ; i++) {
		newList[l - i - 1] = queue.pop();
	}
	return newList;
}



/*
* Use f_i_r to improve everyone
*/

function further_improve_everyone(users){
	for (i =0; i < users.length; i ++){
		let uid = users[i];
		let new_list = further_improve_ranking(uid);
		// u.preference = further_improve_ranking(u, users);
		// u.write();
        update_preference(uid, new_list);
	}
}

function secondWaveSuggestion() {
    let user_ids = get_userid_list();
    further_improve_everyone(user_ids);
}


/************************ Priority Queue ****************************/

const topp = 0;
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
        return this._heap[topp];
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
        if (bottom > topp) {
            this._swap(topp, bottom);
        }
        this._heap.pop();
        this._siftDown();
        return poppedValue;
    }
    replace(value) {
        const replacedValue = this.peek();
        this._heap[topp] = value;
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
        while (node > topp && this._greater(node, parent(node))) {
            this._swap(node, parent(node));
            node = parent(node);
        }
    }
    _siftDown() {
        let node = topp;
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


/************************ group match by class *********************/

/**
 * Class Structure: {subject: <String>, courseNumber: <String>}
 * Group Structure: {name: <String>, students: [user_id_1, user_id_2, ...], classes: [class_1, class_2, ...]}
 */

const groupSuggestionLength = 2;

function class_match(c1, c2){
    return (c1["subject"] === c2["subject"]) && (c1["courseNumber"] === c2["courseNumber"]);
}

function group_corr(user_id, group, classes){
    let group_classes = group["classes"];
    for (let c in classes){
        if (! group_classes.some(e => class_match(e, c))){ // if my class is not contained in the group, stop
            return 0;
        }
    }
    let group_students = group['students']; // list of id
    let corr = 0; // The final corr should be > 0 since the students should have common classes to join
    for (let sid in group_students){
        // if (sid != null){
        corr += computeUserCorrelation(sid, user_id)
        // }
    }
    return corr / group_students.length;
}


function match_groups(user_id, classes){
    // let group_num = get_total_number_of_groups();
    let all_group_ids = get_all_group_ids();
    if (all_group_ids.length === 0){
        return null;
    }
    let l = Math.min(groupSuggestionLength, all_group_ids.length); // final length of the returned array
    let groups = new Array(l);
    let fringe = new PriorityQueue(comp);
    for (let i = 0; i < all_group_ids.length; i ++){
        let id = all_group_ids[i];
        let group = get_group_by_id(id);
        let g_corr = group_corr(user_id, group, classes);
        if (g_corr !== 0){ // ignoring groups that don't fit
            group["id"] = id;
            fringe.push([group, g_corr]);
        }
    }
    for (let i = 0; i < l; i ++){
        groups[l - i - 1] = fringe.pop()[0];
    }
    return groups;
}









