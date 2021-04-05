var ball1;
var database;
var position;

function setup(){
    createCanvas(500,500);

    database = firebase.database();

    ball1 = createSprite(250,250,10,10);
    ball1.shapeColor = "red";

    var ball1Position = database.ref("ball/position");
    ball1Position.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(position!==undefined){
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}
}

function changePosition(x,y){
    database.ref("ball/position").set({
    'x' : position.x + x,
    'y' : position.y + y
    });
}

function readPosition(data){
    position = data.val();
    ball1.x = position.x;
    ball1.y = position.y;
}

function showError(){
    console.log("Sorry! you got a error");
}