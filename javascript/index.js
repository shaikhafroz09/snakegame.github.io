//Game Variables and constants
let inputdir= {x:0,y:0};
const foodsound= new Audio('food.mp3');
const movesound= new Audio('move.mp3');
const gameoversound= new Audio('gameover.mp3');
const musicsound= new Audio('music.mp3');
let lastpainttime=0;
let speed= 6;
let snakeArr=[{x:14,y:16}];
let food = {x:7,y:7};
let score=0;

//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime)
    musicsound.play();
    if((ctime-lastpainttime)/1000 < 1/speed){
        return;
    }
    lastpainttime=ctime;
    gameEngine();
}
function isCollide(snake){
    //if you bump into yourself body
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
            
        }
        
    }
    //if you bump into the wall
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
        return true;
    }

}
function gameEngine(){
    //part1: updating the snake array
    if(isCollide(snakeArr)){
        gameoversound.play();
        musicsound.pause();
        inputdir = {x:0 , y:0};
        alert("Game Over. Press any key to play again")
        snakeArr= [
            {x:14, y:16}
        ]
        //musicsound.play();
        score =0;
        
    }
     
    //If you have eaten the food, increment the score and regenerate the food.
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodsound.play();
        score += 1;
        scorebox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputdir.x , y: snakeArr[0].y + inputdir.y});
        let a= 2;
        let b= 16;
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }

    //Moving the snake.
    for (let i = snakeArr.length-2; i >= 0; i--) {
        
        snakeArr[i+1]= {...snakeArr[i]};
        
        
    }
    snakeArr[0].x += inputdir.x;
    snakeArr[0].y += inputdir.y;

    //part2: Display the snake 
    board.innerHTML= "";
    snakeArr.forEach((e, index) =>{
        snakeElement= document.createElement('div');
        snakeElement.style.gridRowStart= e.y;
        snakeElement.style.gridColumnStart= e.x;
        if(index=== 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //part3: Display the food
    foodElement= document.createElement('div');
    foodElement.style.gridRowStart= food.y;
    foodElement.style.gridColumnStart= food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}












//Maain Logic Starts from here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputdir= {x:0, y:1}; //Start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("Arrowup")
            inputdir.x=0;
            inputdir.y=-1;
            break;
        case "ArrowDown":
            console.log("Arrowdown")
            inputdir.x=0;
            inputdir.y=1;
            break;
        case "ArrowLeft":
            console.log("Arrowleft")
            inputdir.x=-1;
            inputdir.y=0;
            break;
        case "ArrowRight":
            console.log("Arrowright")
            inputdir.x=1;
            inputdir.y=0;
            break;
            
    
        default:
            break;
    }
})