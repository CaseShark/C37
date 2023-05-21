class Game {
  constructor() {}

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
    gameState = data.val();
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();
    car1 = createSprite(width / 2 - 130, height - 100);
    car1.addImage("car1", car1Image);
    car1.scale = 0.05;

    car2 = createSprite(width / 2 + 130, height - 100);
    car2.addImage("car2", car2Image);
    car2.scale = 0.05;
    cars = {car1,car2};
  }

  updateState(state) {
    database.ref("/").update({
      gameState: state
    })
  }

  handleElements() {
    form.hide();
    form.titleImg.position(50,50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  play(){
    this.handleElements();

    Player.getPlayersInfo();


    if(allPlayers !== undefined) {
      image(trackImage, 0, -height * 5, width, height * 6);
      var index = 0;
      for(var plr in allPlayers) {
        index += index;
        var x = allPlayers [plr].positionX;
        var y = allPlayers [plr].positionY;
        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;
      }
      this.playerMovementControls();
      drawSprites()
    }
  }

  playerMovementControls() {
    if(keyIsDown(UP_ARROW)){
      player.positionY += 15;
      player.update();
    }
  }
}
