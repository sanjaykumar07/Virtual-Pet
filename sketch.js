var dog,sadDog,happyDog;
var database,foodStock,lastFed;
var food;


function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
 // emptyMilk = loadImage("milkImage.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();

  foodStock = database.ref("Food");
  foodStock.on("value",readStock)
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  addFood = createButton("add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  milk = new Food()

}

function draw() {
  background(46,139,87);
  dog.display()
  milk.display()

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed = data.val();
  })
  
  
  drawSprites()

  fill(206, 0, 9);
  
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + " PM", 320,30);
   }else if(lastFed==0){
     text("Last Fed : 12 AM",380,140);
   }else{
     text("Last Fed : "+ lastFed + " AM", 320,30);
   }

}


//function to read food Stock
function readStock(data){
  food=data.val();
  milk.updateFoodStock(food);
}

function feedDog(){
  database.ref('/').update({
    Food:food
  })
  food-=1;
  dog.addImage(happyDog);
  if(milk.getFoodStock() <= 0){
    milk.updateFoodStock(milk.getFoodStock()*0);
  }else{
    milk.updateFoodStock(milk.getFoodStock()-1);
  }
}

//function to add food in stock
function addFoods(){
  
  dog.addImage(sadDog);
  
  food++;
  database.ref('/').update({
    Food:food
  })

}



