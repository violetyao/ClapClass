class User {
    sid;
    answers;
    classes;
    name;
    preferences;

    constructor(sid, answers, classes, name, preference) {
        this.sid = sid;
        this.classes = classes;
        this.answers = answers;
        this.name = name;
        this.preferences = preference;
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

function test_user_boxing() {
    var sid = document.getElementById("sid").value;
    var answers_text = document.getElementById("answers").value;
    var answers = {};
    var answer_pairs = answers_text.split(" ");
    answer_pairs.forEach(function (pair) {
        pair = pair.split(":");
        answers[pair[0]] = pair[1];
    });
    var classes = {};
    var classes_text = document.getElementById("classes").value.split(";");
    classes_text.forEach(function (_class) {
        _class = _class.split(" ");
        classes[_class[0]] = _class[1];
    })
    var name = document.getElementById("name").value;
    var preference = {"27056890": 2};
    User = new User(sid, answers, classes, name, preference);
}