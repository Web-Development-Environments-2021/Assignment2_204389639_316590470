var context;
var shape = new Object();  // location of the pacman on the board
var board;
var score;
var maxScore;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var interval2;
var up_btn, down_btn, right_btn, left_btn, number_of_balls, five_p_color,
 fifteen_p_color, twentyf_p_color, timer, num_attack;
var prevPress;
// keep trac of gosts 
var ghostArray;
var begin = true;
var eatable = false;
var lifeCount;
var monColor = "black";
var flag ;
var temp_color = 0;

// setting of the initial board' place food, ghosts and pacman
function Start() {
	board = new Array();
	score = 0;
	maxScore = 0;
	pac_color = "yellow";
	lifeCount = 5;
	var cnt = 100;
	var food_remain = number_of_balls;
	let total = food_remain;
	let foodCounter = 0;
	let flag = 0;
	ghostArray = new Array();
	
	
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 17; i++) {
		board[i] = new Array();
		//build all walls according to what we desire
		for (var j = 0; j < 17; j++) {
			if (
				i == 0 || i == 16 || j == 0 || j ==16
				|| (j == 1 && i == 3)
				|| (j == 1 && i == 8)
				|| (j == 1 && i == 13) // i==1
				|| (j == 2 && i == 3)
				|| (j == 2 && i == 8)
				|| (j == 2 && i == 13) // i==2
				|| (j == 3 && i == 6)
				|| (j == 3 && i == 7)
				|| (j == 3 && i == 8) 
				|| (j == 3 && i == 9)
				|| (j == 3 && i == 10)  // i==3
				|| (j == 6 && i == 1)
				|| (j == 6 && i == 2)
				|| (j == 6 && i == 5)
				|| (j == 6 && i == 6)
				|| (j == 6 && i == 10)
				|| (j == 6 && i == 11)
				|| (j == 6 && i == 14)
				|| (j == 6 && i == 15)  // i ==6
				|| (j == 7 && i == 5)
				|| (j == 7 && i == 11)  // i == 7
				|| (j == 8 && i == 1)
				|| (j == 8 && i == 2)
				|| (j == 8 && i == 5)
				|| (j == 8 && i == 11)
				|| (j == 8 && i == 14)
				|| (j == 8 && i == 15) // i == 8
				//|| (j == 9 && i == 2)
				|| (j == 9 && i == 5)
				|| (j == 9 && i == 6)
				|| (j == 9 && i == 7)
				|| (j == 9 && i == 9)
				|| (j == 9 && i == 10)
				|| (j == 9 && i == 11)
				//|| (j == 9 && i == 14)  // i == 9
				|| (j == 12 &&i  == 4)
				|| (j == 12 &&i  == 12)  // i ==12
				|| (j == 13 &&i  == 1)
				|| (j == 13 &&i  == 2)
				|| (j == 13 &&i  == 3)
				|| (j == 13 &&i  == 4)
				|| (j == 13 &&i  == 7)
				|| (j == 13 &&i  == 8)
				|| (j == 13 &&i  == 9)
				|| (j == 13 &&i  == 12)
				|| (j == 13 &&i  == 13)
				|| (j == 13 &&i  == 14)
				|| (j == 13 &&i  == 15)  // i == 13
				|| (j == 14 &&i  == 8)|| (j == 15 && i == 8)
			) {
				board[i][j] = 4; //4 is a wall
			}else{
				board[i][j] = 1; // nothing
			}
			
			
		}
	}
	board[0][7] = 1;
	board[16][7]= 1;

	// delete ghost of previous games and reseting positions
	resetBoard();
	placeAttackers();



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


	// place strawberries
	numBerri = 0;
	while (numBerri <2){
		berriLocation = findRandomEmptyCell(board);
		board[berriLocation[0]][berriLocation[1]] = 9; //9 is strawberry
		numBerri++;
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
	interval2 = setInterval(moveAttackers,500) //attackers need to ba little bit slower that pacman
  
}


// this function places all attackers in their assigned spot at the corners. and reset when pacman is eaten.
function placeAttackers(){
	ghostCount = 0
	while ( ghostCount < num_attack){
		ghostArray[ghostCount]= new Object();	
		if(ghostCount == 0 ){
			ghostArray[ghostCount].x = 1;
			ghostArray[ghostCount].y = 1;
			board[1][1] = 7;
		}else if(ghostCount == 1){
			ghostArray[ghostCount].x = 1;
			ghostArray[ghostCount].y = 15;
			board[1][15] = 7;
		}else if(ghostCount == 2){
			ghostArray[ghostCount].x = 15;
			ghostArray[ghostCount].y = 1;
			board[15][1] = 7;
		}else{
			ghostArray[ghostCount].x = 15;
			ghostArray[ghostCount].y = 15;
			board[15][15] = 7;
		}
		ghostCount ++;
	}
}

function resetBoard(){
	
	for (var i = 0; i < 17; i++) {
		for (var j = 0; j < 17; j++) {
			if (board[i][j] != 4 && board[i][j] != 5 && board[i][j] != 6 &&
				 board[i][j] != 8 && board [i][j] != 9 ){

				board[i][j] = 1;
			}
		}
	}
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 15 + 1);
	var j = Math.floor(Math.random() * 15 + 1);
	while (board[i][j] != 1) {
		i = Math.floor(Math.random() * 15 + 1);
		j = Math.floor(Math.random() * 15 + 1);
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
	lblLife.value = lifeCount;
	for (var i = 0; i < 17; i++) {
		for (var j = 0; j < 17; j++) {
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
				if (flag == 0){
					context.arc(center.x, center.y, 30, 2 * Math.PI  , 0 * Math.PI); // full circle
					flag=1;
				}else{
					context.arc(center.x, center.y, 30, 0.15 * Math.PI + d1 , 1.85 * Math.PI+d2); // half circle
					flag=0;
				}
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
				context.arc(center.x, center.y, 20, 0, 2 * Math.PI); // circle
				context.fillStyle = fifteen_p_color; //disk color
				context.fill();
			}
			else if (board[i][j] == 6) {
				context.beginPath();
				context.arc(center.x, center.y, 25, 0, 2 * Math.PI); // circle
				context.fillStyle = twentyf_p_color; //disk color
				context.fill();
			}else if (board[i][j] > 20 || board[i][j] == 7) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				var source;
				
				// if(temp_color == 0){
				// 	source = "images/red_ghost.png";
				// 	temp_color = 1;
				// }else{
				// 	source = "images/blue_ghost.png";
				// 	temp_color = 0;
				// }
				let img = new Image();
				img.src = (eatable == true) ? "images/blue_ghost.png" : "images/yellow_ghost.png";
				// context.fillStyle = monColor; //attacker
				context.drawImage(img,center.x - 30, center.y - 30,60,60);
         }
			else if (board[i][j] == 9 ) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				let img = new Image();
				img.src =  "images/cherry.png";
				//context.fillStyle = "red"; //straberry
				//context.fill();
				context.drawImage(img,center.x - 30, center.y - 30,60,60);
         }

		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 1;
   
	var x = GetKeyPressed();
   if(begin == true){
      begin = false;
      x= 3;
   }
	if (x == 1) {
		if (shape.j > 1 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 15 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if( shape.i == 1 && shape.j == 7){
			shape.i = 15;
			
		}
		else if (shape.i > 1 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if(shape.i == 15 && shape.j == 7){
			shape.i = 1
		}
		else if (shape.i < 15 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
   // check if there is an attacker or food in new position
	if (board[shape.i][shape.j] == 8) {
		score= score +5;
		//foodCounter--;
	}
	else if (board[shape.i][shape.j] == 5) {
		score= score+15;
		//foodCounter--;
	}
	else if (board[shape.i][shape.j] == 6) {
		score= score+25;
		//foodCounter--;
	}
	else if (board[shape.i][shape.j] == 9) {
		score= score+50;
		monColor = "green";
		eatable = true;
		setTimeout(function(){
			monColor = "black";
			eatable = false;
		}, 6000);
	}
	else if ( board[shape.i][shape.j] == 7 || board[shape.i][shape.j] > 20 ){
      
      if(eatable == false){
         score -= 10;
			lifeCount--;
			board[shape.i][shape.j] = 1 ;
			resetBoard();
         randomizeNewLocation(shape,2);
			placeAttackers();
      }else{
			score += 50;
			board[shape.i][shape.j] = 1;
		}
   }  
   board[shape.i][shape.j] = 2;

	var currentTime = new Date();
	time_elapsed = Math.floor((currentTime - start_time) / 1000);

   if(time_elapsed >= timer){
		window.clearInterval(interval);/////
		window.clearInterval(interval2);
		if(score<100){
			document.getElementById("result_case").innerHTML = "You are better than "+score+" points!";
			document.getElementById("result_case").style.display="block";
		}
		else{
			window.clearInterval(interval);////
			window.clearInterval(interval2);/////
			document.getElementById("result_case").innerHTML = "Winner!!!";
			document.getElementById("result_case").style.display="block";
		}
		let song = document.getElementById("game_song");
		song.pause();
		modalAbout("finished_game");
		// window.alert("Out Of Time");
		// return false;
   }

	if (lifeCount <= 2 ) {
		pac_color = "green";
		if(lifeCount == 0){
			window.clearInterval(interval);///
			window.clearInterval(interval2);///
			document.getElementById("result_case").innerHTML = "Loser!!";
			document.getElementById("result_case").style.display="block";
			modalAbout("finished_game")
		}
	}
	if (score == maxScore) {
		window.clearInterval(interval);/////
		window.clearInterval(interval2);/////
		document.getElementById("result_case").innerHTML = "Winner!!";
		document.getElementById("result_case").style.display="block";
		modalAbout("finished_game")
	}

	else {
      if (x == undefined && prevPress != undefined){
         x = prevPress;
      }else{prevPress=x;}
		Draw(x);
	}
	
}

// this function uses a very simple huristic to determine the best possible move for the attacker
// by calculating the "manhatten distance" of the ghost to the pacman.
// this method contains a flaw that will allow the user to lock the ghost in certin places gaining an advantage.
// when ghosts are "eatable" they wiil run away from the pacman and will cahse him when not eatable.
function bestMove(ghost,shape,eatable){
	var best ;
	let dist = (eatable == false) ? 10000 : -10000;
	if(ghost.y > 1 
		&& board[ghost.x][ghost.y - 1] != 4 //not a wall
		&& board[ghost.x][ghost.y - 1] != 7 // not another ghost
		&& board[ghost.x][ghost.y - 1] <=20){
			if(!eatable){
				if((Math.abs (ghost.x-shape.i) + Math.abs(ghost.y-1-shape.j)) < dist ){
					dist = (Math.abs (ghost.x-shape.i) + Math.abs(ghost.y-1-shape.j));
					best = 1;
				}
			}else{
				if((Math.abs (ghost.x-shape.i) + Math.abs(ghost.y-1-shape.j)) > dist ){
					dist = (Math.abs (ghost.x-shape.i) + Math.abs(ghost.y-1-shape.j));
					best = 1;
				}
			}
		}
	if(ghost.y < 15 
		&& board[ghost.x][ghost.y + 1] != 4
		&& board[ghost.x][ghost.y + 1] != 7
		&& board[ghost.x][ghost.y + 1] <=20){
			if(!eatable){
				if((Math.abs (ghost.x-shape.i) + Math.abs(ghost.y+1-shape.j)) < dist){
					dist = (Math.abs (ghost.x-shape.i) + Math.abs(ghost.y+1-shape.j));
					best = 2;
				}
			}else{
				if((Math.abs (ghost.x-shape.i) + Math.abs(ghost.y+1-shape.j)) > dist){
					dist = (Math.abs (ghost.x-shape.i) + Math.abs(ghost.y+1-shape.j));
					best = 2;
				}
			}
		}
	if(ghost.x > 1 
		&& board[ghost.x - 1][ghost.y ] != 4
		&& board[ghost.x - 1][ghost.y ] != 7
		&& board[ghost.x - 1][ghost.y ] <=20){
			if(!eatable){
				if((Math.abs (ghost.x-1-shape.i) + Math.abs(ghost.y-shape.j)) < dist){
					dist = (Math.abs (ghost.x-1-shape.i) + Math.abs(ghost.y-shape.j));
					best = 3;
				}
			}else{
				if((Math.abs (ghost.x-1-shape.i) + Math.abs(ghost.y-shape.j)) > dist){
					dist = (Math.abs (ghost.x-1-shape.i) + Math.abs(ghost.y-shape.j));
					best = 3;
				}
			}
		}
	if(ghost.x < 15 
		&& board[ghost.x + 1][ghost.y] != 4
		&& board[ghost.x + 1][ghost.y] != 7
		&& board[ghost.x + 1][ghost.y] <=20){
			if(!eatable){
				if((Math.abs (ghost.x+1-shape.i) + Math.abs(ghost.y-shape.j)) < dist){
					dist =(Math.abs (ghost.x+1-shape.i) + Math.abs(ghost.y-shape.j));
					best = 4;
				}
			}else{
				if((Math.abs (ghost.x+1-shape.i) + Math.abs(ghost.y-shape.j)) > dist){
					dist = (Math.abs (ghost.x+1-shape.i) + Math.abs(ghost.y-shape.j));
					best = 4;
				}
			}
	}
	return best;
}

// randomize a new move to attackers and change the coordinates
function moveAttackers(){
   ghostArray.forEach(ghost => {     
      //dir = Math.floor(Math.random()*4+1)
		dir = bestMove(ghost,shape,eatable)
      if (dir == 1) {
         if (board[ghost.x][ghost.y-1] == 2){
            if(eatable == false){
               score -= 10;
					lifeCount--;
					board[ghost.x][ghost.y] = 1;
					resetBoard();
               randomizeNewLocation(shape,2);
					placeAttackers();
               
            }else{
					score += 50;
					board[shape.i][shape.j] = 1;
				}
         }else{
				board[ghost.x][ghost.y] = Math.ceil(board[ghost.x][ghost.y]/7) ;
				ghost.y--;
				board[ghost.x][ghost.y ] = board[ghost.x][ghost.y]*7;
			}      
      }
      if (dir == 2) {
         if (board[ghost.x][ghost.y+1] ==2){
            if(eatable == false){
               score -= 10;
					lifeCount--;
					board[ghost.x][ghost.y]=1;
               resetBoard();
               randomizeNewLocation(shape,2);
					placeAttackers();;               
            }else{
					score += 50;
					board[shape.i][shape.j] = 1;
				}
         }else{
				board[ghost.x][ghost.y] = Math.ceil(board[ghost.x][ghost.y]/7) ;
				ghost.y++;
				board[ghost.x ][ghost.y]= board[ghost.x][ghost.y]*7;
			}       
      }
      if (dir == 3) {
         if (board[ghost.x-1][ghost.y] ==2){
            if(eatable == false){
               score -= 10;
					lifeCount--;
					board[ghost.x][ghost.y]=1;
               resetBoard();
               randomizeNewLocation(shape,2);
					placeAttackers();               
            }else{
					score += 50;
					board[shape.i][shape.j] = 1;
				}
         }else{
				board[ghost.x][ghost.y] = Math.ceil(board[ghost.x][ghost.y]/7) ;
				ghost.x--;
				board[ghost.x ][ghost.y]= board[ghost.x][ghost.y]*7;
			} 
      }
      if (dir == 4) {
         if (board[ghost.x+1][ghost.y] == 2){
            if(eatable == false){
               score -= 10;
					lifeCount--;
					board[ghost.x][ghost.y]=1;
               resetBoard();
               randomizeNewLocation(shape,2);
					placeAttackers();            
            }else{
					score += 50;
					board[shape.i][shape.j] = 1;
				}
         }else{
				board[ghost.x][ghost.y] = Math.ceil(board[ghost.x][ghost.y]/7) ;
				ghost.x++;
				board[ghost.x ][ghost.y]= board[ghost.x][ghost.y]*7;
			}
      }
   });
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
	let song = document.getElementById("game_song");
	//song.play();
	Start();
}

function buildMiniSetting(up_btn, down_btn, right_btn, left_btn, number_of_balls, five_p_color, fifteen_p_color, twentyf_p_color, timer, num_attack){
	let mini_settings_list = document.getElementById("mini_settings").getElementsByTagName("p");
	mini_settings_list[0].innerHTML ="Up: "+ up_btn;
	mini_settings_list[1].innerHTML= "Down: "+down_btn;
	mini_settings_list[2].innerHTML= "Right: "+right_btn;
	mini_settings_list[3].innerHTML= "Left: "+left_btn;
	mini_settings_list[4].innerHTML= "Number of balls: "+number_of_balls;
	mini_settings_list[5].innerHTML= "5 points color: "+five_p_color;
	mini_settings_list[6].innerHTML= "15 points color: "+fifteen_p_color;
	mini_settings_list[7].innerHTML= "25 points color: "+twentyf_p_color;
	mini_settings_list[8].innerHTML= "Timer: "+timer;
	mini_settings_list[9].innerHTML= "Number of attackers: "+num_attack;
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

//after game is done, play again is pressed by client.
function play_again(){
	modalClose("finished_game");
	modalSettingGame();
	openPage('Game', this, 'grey');
}

function displayImage(image){
	
}
