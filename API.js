/**
 get_user_name_uid(userId) // Given a userId, return the corresponding username
 get_stu_id(userId) // return the stuId given a userId
 fetch_user_id(stuId) // return the userId given a stuId
 get_user_name_stuid(stuId) // return the username of corresponding stuId
 get_user_list() // return a dictionary of {studentid: username}
 get_userid_list() // return a list of all uid
 get_subject_list() // return a list of all subjects
 get_classes_list(subject) // return a list of all classes of a certain subject
 get_user_class(userid) // return a dictionary of all classes a certain user is taking {subject:[classnumber]}
 get_class_user(class1) // return all users of a certain class: class should be a dictionary {subject:class number}
 get_same_class(userid1, userid2) // return a list of all the same classes of userid1, userid2
 get_same_user(class1, class2) // return a list of all the same users of two classes
 get_user_preference(uid) // return a dictionary of the preference of certain user {uid：rank}
 get_user_answer(uid) // return answer of the survey
 get_group_by_id(group_id) // return a group object corresponding to the group id
 get_total_number_of_groups() // return total number of groups
 */

var config = {
    apiKey: "AIzaSyAQFwlKzWWjfxtw6-7QSLbcgtkmoXuMiq4",
    authDomain: "treehack-e780a.firebaseapp.com",
    databaseURL: "https://treehack-e780a.firebaseio.com",
    projectId: "treehack-e780a",
    storageBucket: "treehack-e780a.appspot.com",
    messagingSenderId: "22555346969",
};
firebase.initializeApp(config);

//Global Variable: Id : All id objects
//                 All_users_info: all users objects
//                 All_classes_info: all classes objects
var allId;
var all_users_info;
var all_classes_info;
var all_groups;

function fetch_all_data() {
    firebase.database().ref('AllUsers').on('value', function (snapshot) {
        all_users_info = snapshot.val();
    })
    firebase.database().ref('Classes').on('value', function (snapshot) {
        all_classes_info = snapshot.val();
    })
    firebase.database().ref('UserId').on('value', function (snapshot) {
        allId = snapshot.val();
    })
    firebase.database().ref('Group').on('value', function (snapshot) {
        all_groups = snapshot.val();
    })
}

function check_uid(uid) {
    var flag = false;
    for (var userid in allId) {
        if (userid == uid) {
            flag = true;
        }
    }
    if (!flag) {
        console.log("Incorrect uid");
        throw "Incorrect uid";
    }
}

// return the stuId given a userId
function get_stu_id(uid) {
    check_uid(uid);
    return allId[uid]
}

function get_user_id(stuid) {
    for (var userid in allId) {
        if (get_stu_id(userid) == stuid) {
            return userid;
        }
    }
}

// Given a userId, return the corresponding username
function get_user_name_uid(uid) {
    check_uid(uid);
    return all_users_info[uid]["Name"];
}

// return the username of corresponding stuId
function get_user_name_stuid(stuid) {
    var currentuid;
    for (var userid in allId) {
        if (get_stu_id(userid) == stuid) {
            currentuid = userid;
        }
    }
    return get_user_name_uid(currentuid);
}

// return a dictionary of {studentid: username}
function get_user_list() {
    var userlist = {};
    for (var userid in allId) {
        userlist[get_stu_id(userid)] = get_user_name_uid(userid);
    }
    return userlist;
}

// return a list of all uid
function get_userid_list() {
    var uid_list = [];
    for (var uid in allId) {
        uid_list.push(uid);
    }
    return uid_list;
}

// return a list of all subjects
function get_subject_list() {
    var all_subjects = [];
    for (var subject in all_classes_info) {
        all_subjects.push(subject);
    }
    return all_subjects;
}

// return a list of all classes of a certain subject
function get_classes_list(subject) {
    for (var subj in all_subjects_info) {
        if (subj == subject) {
            return Object.keys(all_subjects_info[subj]);
        }
    }
}

// return a dictionary of all classes a certain user is taking. {subject:[classnumber]}
function get_user_class(userid) {
    check_uid(userid);
    console.log("user: " + userid);
    return all_users_info[userid]["Class"];

}

// return all users of a certain class
function get_class_user(class1) {
    for (var subject in class1) {
        return all_subjects_info[subject][class1[subject]]["students"]
    }
}

// return a list of all the same classes of userid1, userid2
function get_same_class(userid1, userid2) {
    var sameclass = [];
    var classes1 = get_user_class(userid1);
    var classes2 = get_user_class(userid2);
    for (var i = 0; i < classes1.length; i++) {
        for (var j = 0; j < classes2.length; j++) {
            if (classes1[i] == classes2[j]) {
                sameclass.push(classes1[i]);
            }
        }
    }
    return sameclass;
}


// return a list of all the same users of two classes
function get_same_user(class1, class2) {
    var students = [];
    var users1 = get_class_user(class1);
    var users2 = get_class_user(class2);
    for (var i = 0; i < users1.length; i++) {
        for (var j = 0; j < users2.length; j++) {
            if (users1[i] == users2[j]) {
                students.push(users1[i]);
            }
        }
    }
    return students;
}

// return a dictionary of the preference of certain user {uid：rank}
function get_user_preference(uid) {
    check_uid(uid);
    return all_users_preference[uid]["Preference"];
}

// return answer of the survey
function get_user_answer(uid) {
    check_uid(uid);
    var answers = [];
    for (var index in all_users_info[uid]["Answer"]) {
        answers.push(all_users_info[uid]["Answer"][index]);
    }
    return answers;
}

function get_group_by_id(group_id) {
    return all_groups[group_id];
}

function get_total_number_of_groups() {
    return all_groups.length;
}

function get_all_group_ids() {
    var groups = [];
    for (var index in all_groups) {
    	groups.push(index);
    }
    return groups;
}

// Creates a group
function create_group() {
	//Get user id for creating group
	var uid = fetch_user_id();
	//Get 
	var courses = [];
	var course1 = {};
	course1[document.getElementById('subject1').value] = document.getElementById('classnumber1').value;
	var course2 = {};
	course2[document.getElementById('subject2').value] = document.getElementById('classnumber2').value;
	courses.push(course1, course2);
    let groupRef = firebase.database().ref("Group");
    let groupId = groupRef.push().key;
    let name = document.getElementById('new_name').value;
    let group = {
        "classes": courses,
        "students": [uid],
        "name": name,
    };
    groupRef.child(groupId).set(group);
}

// Join a group
function join_group(groupId) {
	var uid = fetch_user_id();
    let ref = firebase.database().ref("/Group/" + groupId + "/students");
    ref.once("value").then(function (snapshot) {
        currentStudents = snapshot.val();
        if (!(uid in currentStudents)) {
            currentStudents.push(uid);
            snapshot.ref.set(currentStudents);
        }
    });

    // Add group to student
    ref = firebase.database().ref("/AllUsers/" + uid + "/MyGroups");
    ref.once("value").then(function (snapshot) {
        currentGroups = snapshot.val();
        if (!(groupId in currentStudents)) {
            currentGroups.push(groupId);
            snapshot.ref.set(currentGroups);
        }
    });
}
