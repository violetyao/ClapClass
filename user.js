class user {
    name; // name of user
    classes; // the classes this user is taking
    constructor(name, classes, schedule, id) {
        this.name = name;
        this.classes = classes;
        this.schedule = schedule;
        this.id = id;
    }

    get userVector() {
        return this.classes;
    }

}