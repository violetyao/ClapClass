class user {
    name; // name of user
    classes; // the classes this user is taking
    constructor(name, classes, schedule) {
        this.name = name;
        this.classes = classes;
        this.schedule = schedule;
    }

    get userVector() {
        return this.classes;
    }

}