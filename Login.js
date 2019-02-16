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
    var email =document.getElementById("email").value;
    var password = document.getElementById("password").value;
    create_user(email, password);
    console.log("Signing Up")
}

function button_signin() {
    var email =document.getElementById("email").value;
    var password = document.getElementById("password").value;
    signin_user(email,password);
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
    }).catch(function (error) {
        // An error happened.
    });
}