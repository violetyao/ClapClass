function button_get_first_match(){
    let user_id = get_user_id();
    let first_match = rank_users(user_id, get_userid_list());
    console.log("getting the first match ... ");
    console.log(first_match);
}