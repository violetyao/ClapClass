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

function update_classes(uid, classes_list) {
    classes = {};
    classes_list.forEach(function (_class) {
        _class = _class.split(" ");
        if (classes[_class[0]] === undefined) {
            classes[_class[0]] = {0: _class[1]};
        } else {
            let ind = classes[_class[0]].length;
            classes[_class[0]][ind] = _class[1];
        }
    });
    return classes;
    /*
    firebase.database().ref("AllUsers/" + uid).update({
        "Class": classes
    })*/
}

function update_answers(uid, answers) {
    firebase.database().ref("AllUsers/" + uid).update({
        "Answer": answers
    })

}

function add_class(uid, _class) {

}