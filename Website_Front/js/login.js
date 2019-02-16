$(document).ready(function(){
	$("#signup_btn").click(function(){
		$("#main").animate({left:"22.5%"},400);
		$("#main").animate({left:"30%"},500);
		$("#loginform").css("visibility","hidden");
		$("#loginform").animate({left:"12%"},400);


		$("#signupform").animate({left:"20%"},400);
				$("#signupform").animate({left:"15%"},400);
						$("#signupform").css("visibility","visible");

	});

	$("#login_btn").click(function(){
		$("#main").animate({left:"77.5%"},400);
		$("#main").animate({left:"70%"},500);
		$("#signupform").css("visibility","hidden");
		$("#signupform").animate({left:"75%"},400);

		$("#loginform").animate({left:"60%"},400);
				$("#loginform").animate({left:"55%"},400);
						$("#loginform").css("visibility","visible");




});
	});