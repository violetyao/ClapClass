class User {
    constructor(sid, answers, classes, name, preference, uid) {
        this.sid = sid;
        this.classes = classes;
        this.answers = answers;
        this.name = name;
        this.preference = preference;
        this.uid = uid;
        this.create();
        console.log("Created User")
    }

    create() {
        firebase.database().ref("AllUsers/" + this.uid).set({
            "Answer": this.answers,
            "Class": this.classes,
            "Name": this.name,
            "Preference": this.preference,
            "SID": this.sid
        })
    }


}

function update_preference(uid, preference) {
    firebase.database().ref("AllUsers/" + uid).update({
        "Preference": preference
    })
}

function add_classes(uid, classes_list) {
    let classes = {};
    classes_list.forEach(function (_class) {
        _class = _class.split(" ");
        if (classes[_class[0]] === undefined) {
            classes[_class[0]] = {0: _class[1]};
        } else {
            let ind = Object.keys(classes[_class[0]]).length;
            classes[_class[0]][ind] = _class[1];
        }
    });
    firebase.database().ref("AllUsers/" + uid).update({
        "Class": classes
    })
}

function set_classes(uid, classes_list) {
    let classes = {};
    classes_list.forEach(function (_class) {
        _class = _class.split(" ");
        if (classes[_class[0]] === undefined) {
            classes[_class[0]] = {0: _class[1]};
        } else {
            let ind = Object.keys(classes[_class[0]]).length;
            classes[_class[0]][ind] = _class[1];
        }
    });
    firebase.database().ref("AllUsers/" + uid).set({
        "Class": classes
    })
}

function drop_classes(uid, classes_list) {
    firebase.database().ref('AllUsers/' + uid + "/Class").on('value', function (snapshot) {
        classes = snapshot.val();
        curr_classes = [];
        subjects = Object.keys(classes);
        subjects.forEach(function (subject) {
            curr_classes.push(classes[subject])
        });
        return curr_classes;

    });
}

function update_answers(uid, answers) {
    firebase.database().ref("AllUsers/" + uid).update({
        "Answer": answers
    })

}