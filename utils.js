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


/*
return a list of indices of candidates, from the most correlated to the least correlated
user_list is [[sbj_1], [subj_2], ... ]
candidates is 	[
					[[sbj_11], [subj_12], ... ],
					[[sbj_21], [subj_22], ... ]
				]
*/
function rank_users(user_list, candidates) {
    max = 0;
    max_index = 0;
    for (i = 0; i < candidates.length; i++) {
        curr_correlation = matrix_correlation(candidates[i], user_list);
        if (max < curr_correlation) {
            max = curr_correlation;
            max_index = i;
        }
    }
    return max_index;
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