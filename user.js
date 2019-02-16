class User {
    constructor(sid, answers, classes, name, preference, uid) {
        this.sid = sid;
        this.classes = classes;
        this.answers = answers;
        this.name = name;
        this.preferences = preference;
        this.uid = uid;
        this.write();
    }

    write() {
        firebase.database().ref("AllUsers/" + this.sid).set({
            "Answer": this.answers,
            "Class": this.classes,
            "Name": this.name,
            "Preference": this.preferences,
            "UID": this.uid
        })
    }

}