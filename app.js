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
var up_btn, down_btn, right_btn, left_btn, number_of_balls, five_p_color, fifteen_p_color, twentyf_p_color, timer, num_attack;

$(document).ready(function() {
	openPage('Welcome', this, 'red');


});




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
		window.alert("no such username. please Sign up");
		openPage('Register', element, 'green');
	}
	else if(users_passes[username]!=password){
		window.alert("wrong password. Please try again");
		openPage('Login', element, 'blue');
	}
	else{
		modalSettingGame();
		openPage('Game', element, 'grey');
	}
	return false;
}

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
$(function(){
 $(".registerbtn").click(function(e){
		
		 let fullName = $("#rfullName").val();
			//let fullName = $(this).closest('div').find('.rfullName').text().value;
		 let username = $("#ruserName").val();
		let email = $("#remail").val();
		let password = $("#rpsw").val();
		let confirm = $("#rpsw-repeat").val();
		let flag = 0;
		
		
		//check for numeric values in the username
		if(isNumeric(username)){
			alert("username cannot include numeric values");
		}
		// check that username isnt already in use
		for(var user in users_passes){
			if (user==username){
				flag=1;
			}
		}
		if(flag==1){
			alert("usermane already taken - please choose a different one");
			return false;
		}
		// check email
		if(validateEmail(email)==false){
			alert("invalid email");
			return false;
		}
		//check that password and confirmation is equal
		if(password != confirm){
			alert("password confirmation dosent match");
			return false;
		}
		users_passes[username] = password;
		console.log(users_passes);
		
	});
return false;
});
