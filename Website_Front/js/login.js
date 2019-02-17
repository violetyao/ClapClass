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
        //window.open("../groupPage.html");
    }

    let name = $("#signupform > input[type=name]").val();
    let email = $("#signupform > input[type=email]").val();
    let password = $("#signupform > input[type=password]").val();
    let studentid = $("#signupform > input[type=SID]").val();
    create_user(email, password, name, studentid, "../groupPage.html");
    console.log("Signing Up");
}

function login() {
    let email = $("#loginform > input[type=email]").val();
    let password = $("#loginform > input[type=password]").val();
    signin_user(email, password, "../groupPage.html");
    console.log("Signing In");
    console.log("User ID: " + fetch_user_id() + " signed in")
}