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

function update(uid, answers, classes, name, preference, sid) {
    firebase.database().ref("AllUsers/" + this.uid).update({
        "Answer": this.answers,
        "Class": this.classes,
        "Name": this.name,
        "Preference": this.preference,
        "SID": this.sid
    })
}

function add_class(uid, _class) {

}