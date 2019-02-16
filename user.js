class user {
    name; // name of user
    classes; // the classes this user is taking
    schedule;
    id;
    preference;
    answers;
    constructor(name, classes, schedule, id, answers) {
        this.name = name;
        this.classes = classes;
        this.schedule = schedule;
        this.id = id;
        this.answers = answers;
    }

    // get userVector() {
    //     return this.classes;
    // }

}