var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var users_passes = {"k":"k"};
var logged_in_users = []
var up_btn, down_btn, right_btn, left_btn, number_of_balls, five_p_color, fifteen_p_color, twentyf_p_color, timer, num_attack;

$(document).ready(function() {
	openPage('Welcome', this, 'red');
});


function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "yellow"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
	
}

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
		logged_in_users.push(username);
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

function start_game(){
	up_btn = document.getElementById("up").value;
	down_btn = document.getElementById("down").value;
	right_btn = document.getElementById("right").value;
	left_btn = document.getElementById("left").value;
	number_of_balls = document.getElementById("circleNum").value;
	five_p_color = randomize("five_p");
	fifteen_p_color = randomize("fifteen_p");
	twentyf_p_color = randomize("twentyf_p");
	timer = randomize("timer");
	num_attack = randomize("num_attack");
	
	modalClose("SettingModal");
	buildMiniSetting(up_btn, down_btn, right_btn, left_btn, number_of_balls, five_p_color, fifteen_p_color, twentyf_p_color, timer, num_attack);
	context = canvas.getContext("2d");
	Start();
}

function buildMiniSetting(up_btn, down_btn, right_btn, left_btn, number_of_balls, five_p_color, fifteen_p_color, twentyf_p_color, timer, num_attack){
	let mini_settings_list = document.getElementById("mini_settings").getElementsByTagName("p");
	mini_settings_list[0].innerHTML+= up_btn;
	mini_settings_list[1].innerHTML+= down_btn;
	mini_settings_list[2].innerHTML+= right_btn;
	mini_settings_list[3].innerHTML+= left_btn;
	mini_settings_list[4].innerHTML+= number_of_balls;
	mini_settings_list[5].innerHTML+= five_p_color;
	mini_settings_list[6].innerHTML+= fifteen_p_color;
	mini_settings_list[7].innerHTML+= twentyf_p_color;
	mini_settings_list[8].innerHTML+= timer;
	mini_settings_list[9].innerHTML+= num_attack;
}

function get_checked(tag_name){
	let input_ele = document.getElementById(tag_name).getElementsByTagName("input");
	for(i = 0; i < input_ele.length; i++) {
                  
		if(input_ele[i].type="radio") {
		  
			if(input_ele[i].checked)
				return input_ele[i].value;
		}
	}
}

function randomize(element_name){
	let picked_opt = get_checked(element_name);
	if(picked_opt!="random"){
		return picked_opt;
	}
	else{
		let inputs = document.getElementById(element_name).getElementsByTagName("input");
		let random_index = Math.floor(Math.random() * (inputs.length-1));
		return inputs[random_index].value;
	}
}
function isNumeric(n) {
	return !isNaN(parseFloat(n));
}

// function validateEmail(email) {
// 	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// 	return re.test(String(email).toLowerCase());
// }

$(function(){
 $(".registerbtn").click(function(e){
		let fullName = $("#fullName").value;
		let username = $("#userName").value;
		var email = $("#email").value;
		let password = $("#rpsw").value;
		let confirm = $("#rpsw-repeat").value;
		let flag = 0;
		
		
		//check for numeric values in the username
		//if(isNumeric(username)){alert("username cannot include numeric values")}
		
		// check that username isnt already in use
		for(var user in users_passes){
			if (user==username){
				flag=1;
			}
		}
		if(flag==1){
			alert("usermane already taken - please choose a different one");
		}

		//check email
		//if(validateEmail(email)==false){alert("invalid email")}
		
		if(password != confirm){
			alert("password confirmation dosent match")
		}
		return false;
	})
return false;
})
