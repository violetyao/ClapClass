function button_get_first_match(){
    let user_id = fetch_user_id();
    console.log("userid: " + user_id);
    console.log("get_userid_list:");
    console.log(get_userid_list());
    let first_match = rank_users(user_id, get_userid_list());
    console.log("getting the first match ... ");
    console.log(first_match);
}