// functions

/*
v1, v2 are two list of numbers
Assume v1, v2 belong to the same course subject
*/
function correlation(v1, v2){ 
	sum = 0;
	for (i = 0; i < v2.length; i ++){
		sum += v1[i] * v2[i];
	}
	return sum;
}

function user_to_vector(user){

}

function rank_vectors_by_correlation(source, list_of_vectors){

}

function rank_users(object_user, others){

}