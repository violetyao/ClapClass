class user {
    sid;
    answers;
    classes;
    name;
    preferences;

    constructor(sid, answers, classes, name, preferences) {
        this.sid = sid;
        this.classes = classes;
        this.answers = answers;
        this.name = name;
        this.preferences = preferences;
        this.write();
    }

    write() {
        firebase.database().ref("AllUsers").set({
            sid: {
                "Answer": this.answers,
                "Class": this.classes,
                "Name": this.name,
                "Preference": this.preferences
            }
        })
    }

}