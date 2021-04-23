var context;
var shape = new Object();  // location of the pacman on the board
var board;
var score;
var maxScore;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var users_passes = {"k":"k"};
var logged_in = false;
var up_btn, down_btn, right_btn, left_btn, number_of_balls, five_p_color, fifteen_p_color, twentyf_p_color, timer, num_attack;

$(document).ready(function() {
	openPage('Welcome', this, 'red');
});


//preventing key arrows from pageDown or pageUp
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

function noSuchUser(name){
	for(var user in users_passes){
		if(name==user){
			return false;
		}
	}
	return true;
}

$(function(){

	$.validator.addMethod('noDigitInName', function(value, element){
		return this.optional(element)
		|| /^[a-z\s]+$/i.test(value);
	}, 'Full name must not contain numbers\.')

	$.validator.addMethod('existUser', function(value, element){
		return noSuchUser(value);
	},'Username is already taken, please choose another one\.')

	//checks password validity
	$.validator.addMethod('strongPassword', function(value, element){
		return this.optional(element)
		|| value.length>=6
		&& /\d/.test(value)
		&& /[a-z]/i.test(value);
	},'Password must contain at least 6 characters, both numbers and letters\.')

	$("#register-form").validate({
		errorClass: "my-error-class",
		rules:{
			rfullName:{
				required: true,
				noDigitInName: true
			},
			ruserName:{
				required: true,
				existUser: true
			},
			email:{
				required: true,
				email: true
			},
			psw:{
				required: true,
				strongPassword: true,
				minlength: 6
			},
			psw_repeat:{
				required: true,
				minlength: 6,
				equalTo: "#rpsw"
			},
			date_of_birth_day:{
				required: true
			},
			date_of_birth_mon:{
				required: true
			},
			date_of_birth_year:{
				required: true
			}
		}
		
	});   
    $("#register-form").on('submit', function(e) {
        var isvalid = $("#register-form").valid();
        if (isvalid) {
            e.preventDefault();
			var form=$("#register-form");
			var username='';
			var password = '';
			$("input:not('input:submit')", form).each(function(i){
				if($(this).prop('name')=="ruserName"){
					username = $(this).val();
				}
				else if($(this).prop('name')=="psw"){
					password = $(this).val();
				}
			});
            users_passes[username]=password;
			openPage('Login', this, '#4CAF50');
		}
	})
})

function openPage(pageName, elmnt, color) {
	// Hide all elements with class="tabcontent" by default */
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
	  tabcontent[i].style.display = "none";
	}
  
	// Remove the background color of all tablinks/buttons
	tablinks = document.getElementsByClassName("tablink");
	for (i = 0; i < tablinks.length; i++) {
	  tablinks[i].style.backgroundColor = "";
	}
  
	// Show the specific tab content
	document.getElementById(pageName).style.display = "block";
  
	// Add the specific color to the button used to open the tab content
	elmnt.style.backgroundColor = color; 
  }
  
  // Get the element with id="defaultOpen" and click on it
//   document.getElementById("defaultOpen").click();

function Login(element){
	let username = document.getElementById("user").value;
	let password = document.getElementById("psw").value;
	let flag = 0;
	for(var user in users_passes){
		if (user==username){
			flag=1;
		}
	}
	if(flag==0){
		window.alert("No such username. Please Sign up");
		openPage('Register', element, 'green');
	}
	else if(users_passes[username]!=password){
		window.alert("Wrong password. Please try again");
		openPage('Login', element, 'blue');
	}
	else{
		// let inputs = document.getElementsByClassName("container").getElementsByTagName("input");
		// for(var input_i in inputs){
		// 	input_i.value="";
		// }
		openPage('Game', element, 'grey');
		modalSettingGame();
		logged_in = true;
		document.getElementById("loggedIn").style.display="block";
	}
	return false;
}

$(function(){
	$("#game_btn").click(function(e){
		if(logged_in==false){
			alert("You must login first. Please register or login.")
			openPage('Welcome', this, 'red');
			}
		else{
			modalSettingGame();
			openPage('Game', this, 'grey');
		}
		return false;
	})
	return false;
})

function login_button(element){
	 document.getElementById("login_button").style.backgroundColor = "white";
		document.getElementById("login_tab").style.backgroundColor = "blue";
	 openPage('Login', element, '#4CAF50');
		return false;
}

function modalAbout(modal_name){
	document.getElementById(modal_name).style.display="block";
}

function modalClose(modal_name){
	document.getElementById(modal_name).style.display="none";
}

window.onclick = function(event) {
	if (event.target == document.getElementById("myModal")) {
		modalClose("myModal");
	}
	else if(event.target == document.getElementById("SettingModal")){
		modalClose("SettingModal");
	}
}

$(document).keyup(function(e) {
	if (e.key === "Escape") {
		modalClose("myModal");
		modalClose("SettingModal");
   }
});

function modalSettingGame(){
	modalAbout("SettingModal");
}

function isNumeric(n) {
	return !isNaN(parseFloat(n));
}

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}


// this function manages the registration process, validated all inputs and adds to the users dictionary.
// $(function(){
//  $(".registerbtn").click(function(e){
// 	 	$("#register-form").validate();
// 		let fullName = $("#rfullName").val();
// 		let username = $("#ruserName").val();
// 		let email = $("#remail").val();
// 		let password = $("#rpsw").val();
// 		// let confirm = $("#rpsw-repeat").val();
// 		// let day_birth = $("#day_birth").val();
// 		// let month_birth = $("#month_birth").val();
// 		// let year_birth = $("#year_birth").val();
		
// 		users_passes[username] = [password, fullName, email];
// 		console.log(users_passes);
// 		openPage('Login', this, '#4CAF50');
// 		return false;
// 	});
// return false;
// });