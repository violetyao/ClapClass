$(document).ready(function () {
    $("#signup_btn").click(function () {
        $("#main").animate({left: "22.5%"}, 400);
        $("#main").animate({left: "30%"}, 500);
        $("#loginform").css("visibility", "hidden");
        $("#loginform").animate({left: "12%"}, 400);
        $("#signupform").animate({left: "20%"}, 400);
        $("#signupform").animate({left: "15%"}, 400);
        $("#signupform").css("visibility", "visible");
    });

    $("#login_btn").click(function () {
        $("#main").animate({left: "77.5%"}, 400);
        $("#main").animate({left: "70%"}, 500);
        $("#signupform").css("visibility", "hidden");
        $("#signupform").animate({left: "75%"}, 400);
        $("#loginform").animate({left: "60%"}, 400);
        $("#loginform").animate({left: "55%"}, 400);
        $("#loginform").css("visibility", "visible");
    });

    $("#user_signup_button").click(function () {
        signup();
    });

    $("#user_login_button").click(function () {
        login();
    })
});

function signup() {
    if (fetch_user_id() != null) {
        //window.open("./groupPage.html");
    }

    let name = $("#signupform > input[type=name]").val();
    let email = $("#signupform > input[type=email]").val();
    let password = $("#signupform > input[type=password]").val();
    let studentid = $("#signupform > input[type=SID]").val();
    create_user(email, password, name, studentid, "./groupPage.html");
    console.log("Signing Up");
}

function login() {
    let email = $("#loginform > input[type=email]").val();
    let password = $("#loginform > input[type=password]").val();
    signin_user(email, password, "./groupPage.html");
    console.log("Signing In");
    console.log("User ID: " + fetch_user_id() + " signed in")
}


function print_user_token() {
    console.log(get_user_info());

}

function test_user_boxing() {
    let sid = document.getElementById("sid").value;
    let answers_text = document.getElementById("answers").value;
    let answers = {};
    let answer_pairs = answers_text.split(" ");
    answer_pairs.forEach(function (pair) {
        pair = pair.split(":");
        answers[pair[0]] = pair[1];
    });
    let classes = {};
    let classes_text = document.getElementById("classes").value.split(";");
    classes_text.forEach(function (_class) {
        _class = _class.split(" ");
        classes[_class[0]] = _class[1];
    });
    let name = document.getElementById("name").value;
    let preference = {"27056890": 1};
    let uid = fetch_user_id();
    u = new git
    User(sid, answers, classes, name, preference, uid);
    preference = {"27056890": 1};
    update_preference(uid, preference);
}

function get_sid() {
    let user_token = get_user_info()[3];
    return user_token_to_sid(user_token);
}

function user_token_to_sid(token) {
    firebase.database().ref('UserId').on('value', function (snapshot) {
        data = snapshot.val();
    });
    return data[token]
}

function fetch_user_id() {
    if (get_user_info() != null) {
        return get_user_info()[3];
    }
    return null;
}

function get_user_info() {
    let user = firebase.auth().currentUser;
    let name, email, photoUrl, uid, userToken, emailVerified;

    if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        userToken = user.getIdToken();
        uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                         // this value to authenticate with your backend server, if
                         // you have one. Use User.getToken() instead.
        return [name, email, userToken, uid];
    }
    console.log("User not found");
    return null;

}

function create_user(email, password, name, studentid, url = null) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
        var uid = fetch_user_id();
        console.log(uid);
        firebase.database().ref("AllUsers/" + uid).set({
            "Name": name,
            "SID": studentid
        });
        console.log("writing database");
        firebase.database().ref("UserId/" + uid).set(
            studentid);
        if (url != null) {
            //window.open(url);
        }
    }).catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
}

function button_signup() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    create_user(email, password);
    console.log("Signing Up")
}

function button_signin() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    signin_user(email, password);
    console.log("Logging In")
}

function signin_user(email, password, url = null) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        if (url != null) {
            window.open(url);
        }
    }).catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorMessage)
    });
}

function signout_user() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("Sign out successful");
        //window.open("./Website_Front/login.html")
    }).catch(function (error) {
        // An error happened.
        console.log(error)
    });
}