function print_user_token() {
    console.log(get_user_info());

}


function get_user_info() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, userToken, emailVerified;

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
    console.log("User not found")
    return null;

}

function create_user(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
}

function button_signup() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    create_user(email, password);
    console.log("Signing Up")
}

function button_signin() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    signin_user(email, password);
    console.log("Logging In")
}

function signin_user(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
    });
}

function signout_user() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("Sign out successful")
    }).catch(function (error) {
        // An error happened.
        console.log(error)
    });
}