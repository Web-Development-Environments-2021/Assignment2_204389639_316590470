var context;
var shape = new Object();  // location of the pacman on the board
var board;
var score;
var maxScore;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var up_btn, down_btn, right_btn, left_btn, number_of_balls, five_p_color,
 fifteen_p_color, twentyf_p_color, timer, num_attack;
var prevPress;
// keep trac of gosts 
var ghostArray = new Array();
var begin = true;
var eatable = false;



// setting of the initial board' place food, ghosts and pacman
function Start() {
	board = new Array();
	score = 0;
	maxScore = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = number_of_balls;
	let total = food_remain;
	let foodCounter = 0;
	
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//build all walls according to what we desire
		for (var j = 0; j < 10; j++) {
			if (
				(i == 0 && j == 7)||
				(i == 1 && j == 2)||
				(i == 1 && j == 3)||
				(i == 1 && j == 4)||
				(i == 3 && j == 0)||
				(i == 3 && j == 3)||
				(i == 3 && j == 4)||
				(i == 3 && j == 8)||
				(i == 3 && j == 9)||
				(i == 4 && j == 4)||
				(i == 5 && j == 2)||
				(i == 5 && j == 3)||
				(i == 5 && j == 4)||
				(i == 5 && j == 5)||
				(i == 5 && j == 6)||
				(i == 6 && j == 2)||
				(i == 6 && j == 8)||
				(i == 7 && j == 8)||
				(i == 8 && j == 0)||
				(i == 8 && j == 1)||
				(i == 8 && j == 4)||
				(i == 8 && j == 7)||
				(i == 8 && j == 8)||
				(i == 9 && j == 4)
			) {
				board[i][j] = 4; //4 is a wall
			}else{
				board[i][j] = 1; // nothing
			}
			
		}
	}

   // placing all the food
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		if(foodCounter <= 0.1*total){
				board[emptyCell[0]][emptyCell[1]] = 6; // 6 is best food )
				maxScore += 25;
				foodCounter++;
			}
			else if(foodCounter > 0.1*total && foodCounter <= 0.4*total){
				board[emptyCell[0]][emptyCell[1]] = 5; // 5 is good food 
            maxScore += 15;
				foodCounter++
			}
			else{
				board[emptyCell[0]][emptyCell[1]] = 8; // 8 is regular food 
				maxScore +=5;
			}
		food_remain--;		
	}
   // place the pacman
	var pacLocation = findRandomEmptyCell(board);
	board[pacLocation[0]][pacLocation[1]] = 2;
	shape.i = pacLocation[0];
	shape.j = pacLocation[1];

   // place the ghosts
   ghostCount = 0
   while ( ghostCount < num_attack){
      ghostLocation =  findRandomEmptyCell(board);
      ghostArray[ghostCount]= new Object();
      ghostArray[ghostCount].x = ghostLocation[0];
      ghostArray[ghostCount].y = ghostLocation[1];
      ghostArray[ghostCount].isAlive = true;
      board[ghostLocation[0]][ghostLocation[1]] = 7; // ghost
      ghostCount ++;
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
   //intervalGhost = setInterval(moveAttackers, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 1) {
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

function Draw(dir) {
	canvas.width = canvas.width; //clean board
   canvas.style.backgroundColor = "#008CBA";
	// canvas.style.border = "yellow"
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
            var d1,d2,e1,e2;
            if(dir==1){
               d1= -0.5*(Math.PI); d2=-0.5*(Math.PI); e1=-15; e2=-5;
            }else if(dir==2){
               d1=0.5*(Math.PI); d2=0.5*(Math.PI); e1=15; e2=-5;
            }else if(dir==3){
               d1= (Math.PI); d2=(Math.PI); e1=5; e2=-15;
            }else if(dir==4){
               d1= 0; d2=0; e1=5; e2=-15;
            }
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI + d1 , 1.85 * Math.PI+d2); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //pacman body color
				context.fill();
				context.beginPath();
				context.arc(center.x + e1, center.y +e2, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //pacman eye color
				context.fill();
			} else if (board[i][j] == 8) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = five_p_color; //regular disk color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "yellow"; //wall color
				context.fill();
			} else if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = fifteen_p_color; //disk color
				context.fill();
			}
			else if (board[i][j] == 6) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = twentyf_p_color; //disk color
				context.fill();
			}else if (board[i][j] > 20 || board[i][j] == 7) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "black"; //wall color
				context.fill();
         }

		}
	}
}


function UpdatePosition() {
	board[shape.i][shape.j] = 1;
   
	var x = GetKeyPressed();
   if(begin == true){
      begin = false;
      x= 4;
   }
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
   // check if ther is an attacker or food in new position
	if (board[shape.i][shape.j] == 8) {
		score= score +5;
	}
	else if (board[shape.i][shape.j] == 5) {
		score= score+15;
	}
	else if (board[shape.i][shape.j] == 6) {
		score= score+25;
	}
	else if ( board[shape.i][shape.j] == 7 || board[shape.i][shape.j] > 20 ){
      
      if(eatable == false){
         score -= 10;
         randomizeNewLocation(shape,2);
      }
   }  
   board[shape.i][shape.j] = 2;

   moveAttackers();

	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;

   if(time_elapsed >= timer){
      window.clearInterval(interval);
		window.alert("Out Of Time");
      return false;
   }

	// if (time_elapsed >= timer-10) {
	// 	pac_color = "green";
      
	// }
	else if (score == maxScore) {
		window.clearInterval(interval);
		window.alert("Game completed");
		
		return false;
	} else {
      if (x == undefined && prevPress != undefined){
         x = prevPress;
      }else{prevPress=x;}
		Draw(x);
	}
	
}

// randomize a new move to attackers and change the coordinates
function moveAttackers(){
   ghostArray.forEach(ghost => {
     
      dir = Math.floor(Math.random()*4+1)
      if (dir == 1) {
         // if (board[ghost.x][ghost.y-4] ==2){
         //    if(eatable == false){
         //       score -= 10;
         //       randomizeNewLocation(shape,2);
         //       board[ghost.x][ghost.y-1] =1;
         //    }
         // }
         if (ghost.y > 0 
            && board[ghost.x][ghost.y - 1] != 4
            && board[ghost.x][ghost.y - 1] != 7
            && board[ghost.x][ghost.y - 1] <=20) {
            board[ghost.x][ghost.y] = board[ghost.x][ghost.y]/7;
            ghost.y--;
            board[ghost.x][ghost.y ] = board[ghost.x][ghost.y]*7;
         }
      }
      if (dir == 2) {
         // if (board[ghost.x][ghost.y+1] ==2){
         //    if(eatable == false){
         //       score -= 10;
         //       randomizeNewLocation(shape,2);
         //       board[ghost.x][ghost.y+1]=1;
         //    }
         // }
         if (ghost.y < 9 
            && board[ghost.x][ghost.y + 1] != 4
            && board[ghost.x][ghost.y + 1] != 7
            && board[ghost.x][ghost.y + 1] <=20) {
            board[ghost.x][ghost.y]= board[ghost.x][ghost.y]/7;
            ghost.y++;
            board[ghost.x][ghost.y ]= board[ghost.x][ghost.y]*7;
         }
      }
      if (dir == 3) {
         // if (board[ghost.x-1][ghost.y] ==2){
         //    if(eatable == false){
         //       score -= 10;
         //       randomizeNewLocation(shape,2);
         //       board[ghost.x-1][ghost.y]=1;
         //    }
         // }
         if (ghost.x > 0 
            && board[ghost.x - 1][ghost.y] != 4
            && board[ghost.x - 1][ghost.y] != 7
            && board[ghost.x - 1][ghost.y] <=20) {
            board[ghost.x][ghost.y]= board[ghost.x][ghost.y]/7;
            ghost.x--;
            board[ghost.x ][ghost.y]= board[ghost.x][ghost.y]*7;
         }
      }
      if (dir == 4) {
         // if (board[ghost.x+1][ghost.y] == 2){
         //    if(eatable == false){
         //       score -= 10;
         //       randomizeNewLocation(shape,2);
         //       board[ghost.x+1][ghost.y]=1;
         //    }
         // }
         if (ghost.x < 9 
            && board[ghost.x + 1][ghost.y] != 4
            && board[ghost.x + 1][ghost.y] != 7
            && board[ghost.x + 1][ghost.y] <=20) {
            board[ghost.x][ghost.y]= board[ghost.x][ghost.y]/7;
            ghost.x++;
            board[ghost.x ][ghost.y]= board[ghost.x][ghost.y]*7;
         }
      }
   });
   //Draw(x)
}

//when eaten will find a new spot for either ghost or pacman
function randomizeNewLocation(object,num){
   var newLocation = findRandomEmptyCell(board);
	board[newLocation[0]][newLocation[1]] = num;
	object.i = newLocation[0];
	object.j = newLocation[1];
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

