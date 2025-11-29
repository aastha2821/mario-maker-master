// Main Class of Mario Game

function MarioGame() {
  var gameUI = GameUI.getInstance();

  var maxWidth; //width of the game world
  var height;
  var viewPort; //width of canvas, viewPort that can be seen
  var tileSize;
  var map;
  var originalMaps;

  var translatedDist; //distance translated(side scrolled) as mario moves to the right
  var centerPos; //center position of the viewPort, viewable screen
  var marioInGround;

  //instances
  var mario;
  var element;
  var gameSound;
  var score;
  var quizSystem;
  var quizPopup;
  var quizActive = false;
  var marioFrozen = false;
  var quizTimerStarted = false;
  var quizTimerCount = 0;
  var quizWaitingForNext = false;
  var quizAnswerShowTime = 0;

  var keys = [];
  var goombas;
  var powerUps;
  var bullets;
  var bulletFlag = false;

  var currentLevel;
  var showQuizOverlay = false;
  var quizAnswerInProgress = false;

  var animationID;
  var timeOutId;

  var tickCounter = 0; //for animating mario
  var maxTick = 25; //max number for ticks to show mario sprite
  var instructionTick = 0; //showing instructions counter
  var that = this;

  this.init = function(levelMaps, level) {
    height = 480;
    maxWidth = 0;
    viewPort = 1280;
    tileSize = 32;
    translatedDist = 0;
    goombas = [];
    powerUps = [];
    bullets = [];
    showQuizOverlay = false;
    quizAnswerInProgress = false;

    gameUI.setWidth(viewPort);
    gameUI.setHeight(height);
    gameUI.show();

    currentLevel = level;
    originalMaps = levelMaps;
    map = JSON.parse(levelMaps[currentLevel]);

    // Initialize Quiz System
    if (!quizSystem) {
      quizSystem = new QuizSystem();
      quizSystem.init(function(loaded) {
        if (loaded) {
          console.log('[MarioGame] Quiz system initialized with', quizSystem.getTotalQuestions(), 'questions');
        } else {
          console.error('[MarioGame] Failed to load quiz questions');
        }
      });
    }

    // Initialize Quiz Popup
    if (!quizPopup) {
      quizPopup = new QuizPopup();
      quizPopup.init();
      quizPopup.setOnAnswerSelected(function(optionIndex) {
        that.handleQuizAnswer(optionIndex);
      });
    }

    quizActive = false;
    marioFrozen = false;
    quizTimerStarted = false;
    quizTimerCount = 0;
    quizWaitingForNext = false;
    quizAnswerShowTime = 0;

    if (!score) {
      //so that when level changes, it uses the same instance
      score = new Score();
      score.init();
    }
    score.displayScore();
    score.updateLevelNum(currentLevel);

    if (!mario) {
      //so that when level changes, it uses the same instance
      mario = new Mario();
      mario.init();
    } else {
      mario.x = 10;
      mario.frame = 0;
    }
    element = new Element();
    gameSound = new GameSound();
    gameSound.init();

    that.calculateMaxWidth();
    that.bindKeyPress();
    that.bindMouseEvents();
    that.startGame();
  };

  that.calculateMaxWidth = function() {
    //calculates the max width of the game according to map size
    for (var row = 0; row < map.length; row++) {
      for (var column = 0; column < map[row].length; column++) {
        if (maxWidth < map[row].length * 32) {
          maxWidth = map[column].length * 32;
        }
      }
    }
  };

  that.bindKeyPress = function() {
    var canvas = gameUI.getCanvas(); //for use with touch events

    //key binding
    document.body.addEventListener('keydown', function(e) {
      keys[e.keyCode] = true;
    });

    document.body.addEventListener('keyup', function(e) {
      keys[e.keyCode] = false;
    });

    //key binding for touch events
    canvas.addEventListener('touchstart', function(e) {
      var touches = e.changedTouches;
      e.preventDefault();

      for (var i = 0; i < touches.length; i++) {
        if (touches[i].pageX <= 200) {
          keys[37] = true; //left arrow
        }
        if (touches[i].pageX > 200 && touches[i].pageX < 400) {
          keys[39] = true; //right arrow
        }
        if (touches[i].pageX > 640 && touches[i].pageX <= 1080) {
          //in touch events, same area acts as sprint and bullet key
          keys[16] = true; //shift key
          keys[17] = true; //ctrl key
        }
        if (touches[i].pageX > 1080 && touches[i].pageX < 1280) {
          keys[32] = true; //space
        }
      }
    });

    canvas.addEventListener('touchend', function(e) {
      var touches = e.changedTouches;
      e.preventDefault();

      for (var i = 0; i < touches.length; i++) {
        if (touches[i].pageX <= 200) {
          keys[37] = false;
        }
        if (touches[i].pageX > 200 && touches[i].pageX <= 640) {
          keys[39] = false;
        }
        if (touches[i].pageX > 640 && touches[i].pageX <= 1080) {
          keys[16] = false;
          keys[17] = false;
        }
        if (touches[i].pageX > 1080 && touches[i].pageX < 1280) {
          keys[32] = false;
        }
      }
    });

    canvas.addEventListener('touchmove', function(e) {
      var touches = e.changedTouches;
      e.preventDefault();

      for (var i = 0; i < touches.length; i++) {
        if (touches[i].pageX <= 200) {
          keys[37] = true;
          keys[39] = false;
        }
        if (touches[i].pageX > 200 && touches[i].pageX < 400) {
          keys[39] = true;
          keys[37] = false;
        }
        if (touches[i].pageX > 640 && touches[i].pageX <= 1080) {
          keys[16] = true;
          keys[32] = false;
        }
        if (touches[i].pageX > 1080 && touches[i].pageX < 1280) {
          keys[32] = true;
          keys[16] = false;
          keys[17] = false;
        }
      }
    });
  };

  that.bindMouseEvents = function() {
    var canvas = gameUI.getCanvas();

    canvas.addEventListener('mousemove', function(e) {
      if (showQuizOverlay && !quizAnswerInProgress) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;
        quizUI.updateHoveredOption(mouseX, mouseY);
      }
    });

    canvas.addEventListener('mouseleave', function(e) {
      quizUI.resetHover();
    });

    canvas.addEventListener('click', function(e) {
      if (showQuizOverlay && !quizAnswerInProgress) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;
        var selectedOption = quizUI.getClickedOption(mouseX, mouseY);
        
        if (selectedOption !== -1) {
          that.handleQuizAnswer(selectedOption);
        }
      }
    });
  };

  //Main Game Loop
  this.startGame = function() {
    animationID = window.requestAnimationFrame(that.startGame);

    gameUI.clear(0, 0, maxWidth, height);

    if (instructionTick < 1000) {
      that.showInstructions(); //showing control instructions
      instructionTick++;
    }

    // Auto-trigger quiz after 5 seconds (300 frames at 60 FPS)
    if (!quizTimerStarted && instructionTick >= 1000) {
      quizTimerStarted = true;
      quizTimerCount = 0;
    }
    
    // First question after 5 seconds
    if (quizTimerStarted && !quizActive && !quizWaitingForNext) {
      quizTimerCount++;
      if (quizTimerCount >= 300) {
        console.log('[MarioGame] 5 seconds elapsed - showing first quiz question!');
        that.startQuizBlock();
        quizTimerCount = 0;
      }
    }
    
    // Show next question after 5 seconds (if waiting)
    if (quizWaitingForNext && !quizActive) {
      quizAnswerShowTime++;
      if (quizAnswerShowTime >= 300) {
        console.log('[MarioGame] 5 seconds elapsed - showing next quiz question!');
        that.startQuizBlock();
        quizAnswerShowTime = 0;
        quizWaitingForNext = false;
      }
    }

    that.renderMap();

    for (var i = 0; i < powerUps.length; i++) {
      powerUps[i].draw();
      if (!showQuizOverlay) {
        powerUps[i].update();
      }
    }

    for (var i = 0; i < bullets.length; i++) {
      bullets[i].draw();
      if (!showQuizOverlay) {
        bullets[i].update();
      }
    }

    for (var i = 0; i < goombas.length; i++) {
      goombas[i].draw();
      if (!showQuizOverlay) {
        goombas[i].update();
      }
    }

    if (!showQuizOverlay) {
      that.checkPowerUpMarioCollision();
      that.checkBulletEnemyCollision();
      that.checkEnemyMarioCollision();
    }

    mario.draw();
    that.updateMario();
    if (!showQuizOverlay) {
      that.wallCollision();
    }
    marioInGround = mario.grounded; //for use with flag sliding

    // Draw quiz overlay if active
    if (showQuizOverlay && !quizAnswerInProgress) {
      console.log('[MarioGame] Rendering quiz overlay...');
      if (quizManager) {
        var currentQuestion = quizManager.getCurrentQuestion();
        if (currentQuestion) {
          console.log('[MarioGame] Drawing question:', currentQuestion.question);
          quizUI.drawQuizOverlay(currentQuestion);
        } else {
          console.warn('No current question available. Questions loaded:', quizManager.getTotalQuestions());
        }
      } else {
        console.error('[MarioGame] quizManager is null!');
      }
    }
  };

  this.showInstructions = function() {
    gameUI.writeText('Controls: Arrow keys for direction, shift to run, ctrl for bullets', 30, 30);
    gameUI.writeText('Tip: Jumping while running makes you jump higher', 30, 60);
  };

  this.renderMap = function() {
    //setting false each time the map renders so that elements fall off a platform and not hover around
    mario.grounded = false;

    for (var i = 0; i < powerUps.length; i++) {
      powerUps[i].grounded = false;
    }
    for (var i = 0; i < goombas.length; i++) {
      goombas[i].grounded = false;
    }

    for (var row = 0; row < map.length; row++) {
      for (var column = 0; column < map[row].length; column++) {
        switch (map[row][column]) {
          case 1: //platform
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.platform();
            element.draw();

            that.checkElementMarioCollision(element, row, column);
            that.checkElementPowerUpCollision(element);
            that.checkElementEnemyCollision(element);
            that.checkElementBulletCollision(element);
            break;

          case 2: //coinBox
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.coinBox();
            element.draw();

            that.checkElementMarioCollision(element, row, column);
            that.checkElementPowerUpCollision(element);
            that.checkElementEnemyCollision(element);
            that.checkElementBulletCollision(element);
            break;

          case 3: //powerUp Box
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.powerUpBox();
            element.draw();

            that.checkElementMarioCollision(element, row, column);
            that.checkElementPowerUpCollision(element);
            that.checkElementEnemyCollision(element);
            that.checkElementBulletCollision(element);
            break;

          case 4: //uselessBox
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.uselessBox();
            element.draw();

            that.checkElementMarioCollision(element, row, column);
            that.checkElementPowerUpCollision(element);
            that.checkElementEnemyCollision(element);
            that.checkElementBulletCollision(element);
            break;

          case 5: //flagPole
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.flagPole();
            element.draw();

            that.checkElementMarioCollision(element, row, column);
            break;

          case 6: //flag
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.flag();
            element.draw();
            break;

          case 7: //pipeLeft
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.pipeLeft();
            element.draw();

            that.checkElementMarioCollision(element, row, column);
            that.checkElementPowerUpCollision(element);
            that.checkElementEnemyCollision(element);
            that.checkElementBulletCollision(element);
            break;

          case 8: //pipeRight
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.pipeRight();
            element.draw();

            that.checkElementMarioCollision(element, row, column);
            that.checkElementPowerUpCollision(element);
            that.checkElementEnemyCollision(element);
            that.checkElementBulletCollision(element);
            break;

          case 9: //pipeTopLeft
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.pipeTopLeft();
            element.draw();

            that.checkElementMarioCollision(element, row, column);
            that.checkElementPowerUpCollision(element);
            that.checkElementEnemyCollision(element);
            that.checkElementBulletCollision(element);
            break;

          case 10: //pipeTopRight
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.pipeTopRight();
            element.draw();

            that.checkElementMarioCollision(element, row, column);
            that.checkElementPowerUpCollision(element);
            that.checkElementEnemyCollision(element);
            that.checkElementBulletCollision(element);
            break;

          case 11: //quizBox
            element.x = column * tileSize;
            element.y = row * tileSize;
            element.quizBox();
            element.draw();

            that.checkElementMarioCollision(element, row, column);
            that.checkElementPowerUpCollision(element);
            that.checkElementEnemyCollision(element);
            that.checkElementBulletCollision(element);
            break;

          case 20: //goomba
            var enemy = new Enemy();
            enemy.x = column * tileSize;
            enemy.y = row * tileSize;
            enemy.goomba();
            enemy.draw();

            goombas.push(enemy);
            map[row][column] = 0;
        }
      }
    }
  };

  this.collisionCheck = function(objA, objB) {
    // get the vectors to check against
    var vX = objA.x + objA.width / 2 - (objB.x + objB.width / 2);
    var vY = objA.y + objA.height / 2 - (objB.y + objB.height / 2);

    // add the half widths and half heights of the objects
    var hWidths = objA.width / 2 + objB.width / 2;
    var hHeights = objA.height / 2 + objB.height / 2;
    var collisionDirection = null;

    // if the x and y vector are less than the half width or half height, then we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
      // figures out on which side we are colliding (top, bottom, left, or right)
      var offsetX = hWidths - Math.abs(vX);
      var offsetY = hHeights - Math.abs(vY);

      if (offsetX >= offsetY) {
        if (vY > 0 && vY < 37) {
          collisionDirection = 't';
          if (objB.type != 5) {
            //if flagpole then pass through it
            objA.y += offsetY;
          }
        } else if (vY < 0) {
          collisionDirection = 'b';
          if (objB.type != 5) {
            //if flagpole then pass through it
            objA.y -= offsetY;
          }
        }
      } else {
        if (vX > 0) {
          collisionDirection = 'l';
          objA.x += offsetX;
        } else {
          collisionDirection = 'r';
          objA.x -= offsetX;
        }
      }
    }
    return collisionDirection;
  };

  this.checkElementMarioCollision = function(element, row, column) {
    var collisionDirection = that.collisionCheck(mario, element);

    if (collisionDirection == 'l' || collisionDirection == 'r') {
      mario.velX = 0;
      mario.jumping = false;

      if (element.type == 5) {
        //flag pole
        that.levelFinish(collisionDirection);
      }
    } else if (collisionDirection == 'b') {
      if (element.type != 5) {
        //only if not flag pole
        mario.grounded = true;
        mario.jumping = false;
      }
    } else if (collisionDirection == 't') {
      if (element.type != 5) {
        mario.velY *= -1;
      }

      if (element.type == 3) {
        //PowerUp Box
        var powerUp = new PowerUp();

        //gives mushroom if mario is small, otherwise gives flower
        if (mario.type == 'small') {
          powerUp.mushroom(element.x, element.y);
          powerUps.push(powerUp);
        } else {
          powerUp.flower(element.x, element.y);
          powerUps.push(powerUp);
        }

        map[row][column] = 4; //sets to useless box after powerUp appears

        //sound when mushroom appears
        gameSound.play('powerUpAppear');
      }

      if (element.type == 2) {
        //Coin Box
        score.coinScore++;
        score.totalScore += 100;

        score.updateCoinScore();
        score.updateTotalScore();
        map[row][column] = 4; //sets to useless box after coin appears

        //sound when coin block is hit
        gameSound.play('coin');
      }

      if (element.type == 11) {
        //Quiz Block (Type 11)
        if (!quizActive && quizPopup && quizSystem) {
          console.log('[MarioGame] Hit quiz block! Checking if questions loaded...');
          console.log('[MarioGame] Total questions available:', quizSystem.getTotalQuestions());
          
          // Check if we have questions loaded
          if (quizSystem.getTotalQuestions() === 0) {
            console.warn('[MarioGame] Questions not loaded yet, waiting...');
            // Wait a bit for questions to load
            setTimeout(function() {
              if (quizSystem.getTotalQuestions() > 0) {
                console.log('[MarioGame] Questions loaded, starting quiz now');
                that.startQuizBlock();
              } else {
                console.error('[MarioGame] Questions still not loaded');
              }
            }, 500);
          } else {
            that.startQuizBlock();
          }
        }
        
        map[row][column] = 4; //sets to useless box after quiz block appears
      }
    }
  };

  this.checkElementPowerUpCollision = function(element) {
    for (var i = 0; i < powerUps.length; i++) {
      var collisionDirection = that.collisionCheck(powerUps[i], element);

      if (collisionDirection == 'l' || collisionDirection == 'r') {
        powerUps[i].velX *= -1; //change direction if collision with any element from the sidr
      } else if (collisionDirection == 'b') {
        powerUps[i].grounded = true;
      }
    }
  };

  this.checkElementEnemyCollision = function(element) {
    for (var i = 0; i < goombas.length; i++) {
      if (goombas[i].state != 'deadFromBullet') {
        //so that goombas fall from the map when dead from bullet
        var collisionDirection = that.collisionCheck(goombas[i], element);

        if (collisionDirection == 'l' || collisionDirection == 'r') {
          goombas[i].velX *= -1;
        } else if (collisionDirection == 'b') {
          goombas[i].grounded = true;
        }
      }
    }
  };

  this.checkElementBulletCollision = function(element) {
    for (var i = 0; i < bullets.length; i++) {
      var collisionDirection = that.collisionCheck(bullets[i], element);

      if (collisionDirection == 'b') {
        //if collision is from bottom of the bullet, it is grounded, so that it can be bounced
        bullets[i].grounded = true;
      } else if (collisionDirection == 't' || collisionDirection == 'l' || collisionDirection == 'r') {
        bullets.splice(i, 1);
      }
    }
  };

  this.checkPowerUpMarioCollision = function() {
    for (var i = 0; i < powerUps.length; i++) {
      var collWithMario = that.collisionCheck(powerUps[i], mario);
      if (collWithMario) {
        if (powerUps[i].type == 30 && mario.type == 'small') {
          //mushroom
          mario.type = 'big';
        } else if (powerUps[i].type == 31) {
          //flower
          mario.type = 'fire';
        }
        powerUps.splice(i, 1);

        score.totalScore += 1000;
        score.updateTotalScore();

        //sound when mushroom appears
        gameSound.play('powerUp');
      }
    }
  };

  this.checkEnemyMarioCollision = function() {
    for (var i = 0; i < goombas.length; i++) {
      if (!mario.invulnerable && goombas[i].state != 'dead' && goombas[i].state != 'deadFromBullet') {
        //if mario is invulnerable or goombas state is dead, collision doesnt occur
        var collWithMario = that.collisionCheck(goombas[i], mario);

        if (collWithMario == 't') {
          //kill goombas if collision is from top
          goombas[i].state = 'dead';

          mario.velY = -mario.speed;

          score.totalScore += 1000;
          score.updateTotalScore();

          //sound when enemy dies
          gameSound.play('killEnemy');
        } else if (collWithMario == 'r' || collWithMario == 'l' || collWithMario == 'b') {
          goombas[i].velX *= -1;

          if (mario.type == 'big') {
            mario.type = 'small';
            mario.invulnerable = true;
            collWithMario = undefined;

            //sound when mario powerDowns
            gameSound.play('powerDown');

            setTimeout(function() {
              mario.invulnerable = false;
            }, 1000);
          } else if (mario.type == 'fire') {
            mario.type = 'big';
            mario.invulnerable = true;

            collWithMario = undefined;

            //sound when mario powerDowns
            gameSound.play('powerDown');

            setTimeout(function() {
              mario.invulnerable = false;
            }, 1000);
          } else if (mario.type == 'small') {
            //kill mario if collision occurs when he is small
            that.pauseGame();

            mario.frame = 13;
            collWithMario = undefined;

            score.lifeCount--;
            score.updateLifeCount();

            //sound when mario dies
            gameSound.play('marioDie');

            timeOutId = setTimeout(function() {
              if (score.lifeCount == 0) {
                that.gameOver();
              } else {
                that.resetGame();
              }
            }, 3000);
            break;
          }
        }
      }
    }
  };

  this.checkBulletEnemyCollision = function() {
    for (var i = 0; i < goombas.length; i++) {
      for (var j = 0; j < bullets.length; j++) {
        if (goombas[i] && goombas[i].state != 'dead') {
          //check for collision only if goombas exist and is not dead
          var collWithBullet = that.collisionCheck(goombas[i], bullets[j]);
        }

        if (collWithBullet) {
          bullets[j] = null;
          bullets.splice(j, 1);

          goombas[i].state = 'deadFromBullet';

          score.totalScore += 1000;
          score.updateTotalScore();

          //sound when enemy dies
          gameSound.play('killEnemy');
        }
      }
    }
  };

  this.wallCollision = function() {
    //for walls (vieport walls)
    if (mario.x >= maxWidth - mario.width) {
      mario.x = maxWidth - mario.width;
    } else if (mario.x <= translatedDist) {
      mario.x = translatedDist + 1;
    }

    //for ground (viewport ground)
    if (mario.y >= height) {
      that.pauseGame();

      //sound when mario dies
      gameSound.play('marioDie');

      score.lifeCount--;
      score.updateLifeCount();

      timeOutId = setTimeout(function() {
        if (score.lifeCount == 0) {
          that.gameOver();
        } else {
          that.resetGame();
        }
      }, 3000);
    }
  };

  //controlling mario with key events
  this.updateMario = function() {
    var friction = 0.9;
    var gravity = 0.2;

    // Freeze Mario during quiz
    if (marioFrozen || quizActive) {
      mario.velX = 0;
      return;
    }

    mario.checkMarioType();

    if (keys[38] || keys[32]) {
      //up arrow
      if (!mario.jumping && mario.grounded) {
        mario.jumping = true;
        mario.grounded = false;
        mario.velY = -(mario.speed / 2 + 5.5);

        // mario sprite position
        if (mario.frame == 0 || mario.frame == 1) {
          mario.frame = 3; //right jump
        } else if (mario.frame == 8 || mario.frame == 9) {
          mario.frame = 2; //left jump
        }

        //sound when mario jumps
        gameSound.play('jump');
      }
    }

    if (keys[39]) {
      //right arrow
      that.checkMarioPos(); //if mario goes to the center of the screen, sidescroll the map

      if (mario.velX < mario.speed) {
        mario.velX++;
      }

      //mario sprite position
      if (!mario.jumping) {
        tickCounter += 1;

        if (tickCounter > maxTick / mario.speed) {
          tickCounter = 0;

          if (mario.frame != 1) {
            mario.frame = 1;
          } else {
            mario.frame = 0;
          }
        }
      }
    }

    if (keys[37]) {
      //left arrow
      if (mario.velX > -mario.speed) {
        mario.velX--;
      }

      //mario sprite position
      if (!mario.jumping) {
        tickCounter += 1;

        if (tickCounter > maxTick / mario.speed) {
          tickCounter = 0;

          if (mario.frame != 9) {
            mario.frame = 9;
          } else {
            mario.frame = 8;
          }
        }
      }
    }

    if (keys[16]) {
      //shift key
      mario.speed = 4.5;
    } else {
      mario.speed = 3;
    }

    if (keys[17] && mario.type == 'fire') {
      //ctrl key
      if (!bulletFlag) {
        bulletFlag = true;
        var bullet = new Bullet();
        if (mario.frame == 9 || mario.frame == 8 || mario.frame == 2) {
          var direction = -1;
        } else {
          var direction = 1;
        }
        bullet.init(mario.x, mario.y, direction);
        bullets.push(bullet);

        //bullet sound
        gameSound.play('bullet');

        setTimeout(function() {
          bulletFlag = false; //only lets mario fire bullet after 500ms
        }, 500);
      }
    }

    //velocity 0 sprite position
    if (mario.velX > 0 && mario.velX < 1 && !mario.jumping) {
      mario.frame = 0;
    } else if (mario.velX > -1 && mario.velX < 0 && !mario.jumping) {
      mario.frame = 8;
    }

    if (mario.grounded) {
      mario.velY = 0;

      //grounded sprite position
      if (mario.frame == 3) {
        mario.frame = 0; //looking right
      } else if (mario.frame == 2) {
        mario.frame = 8; //looking left
      }
    }

    //change mario position
    mario.velX *= friction;
    mario.velY += gravity;

    mario.x += mario.velX;
    mario.y += mario.velY;
  };

  this.checkMarioPos = function() {
    centerPos = translatedDist + viewPort / 2;

    //side scrolling as mario reaches center of the viewPort
    if (mario.x > centerPos && centerPos + viewPort / 2 < maxWidth) {
      gameUI.scrollWindow(-mario.speed, 0);
      translatedDist += mario.speed;
    }
  };

  this.levelFinish = function(collisionDirection) {
    //game finishes when mario slides the flagPole and collides with the ground
    if (collisionDirection == 'r') {
      mario.x += 10;
      mario.velY = 2;
      mario.frame = 11;
    } else if (collisionDirection == 'l') {
      mario.x -= 32;
      mario.velY = 2;
      mario.frame = 10;
    }

    if (marioInGround) {
      mario.x += 20;
      mario.frame = 10;
      tickCounter += 1;
      if (tickCounter > maxTick) {
        that.pauseGame();

        mario.x += 10;
        tickCounter = 0;
        mario.frame = 12;

        //sound when stage clears
        gameSound.play('stageClear');

        timeOutId = setTimeout(function() {
          currentLevel++;
          if (originalMaps[currentLevel]) {
            that.init(originalMaps, currentLevel);
            score.updateLevelNum(currentLevel);
          } else {
            that.gameOver();
          }
        }, 5000);
      }
    }
  };

  this.startQuizBlock = function() {
    console.log('[MarioGame] Starting quiz block interaction...');
    
    // Make sure questions are available
    if (quizSystem.getTotalQuestions() === 0) {
      console.error('[MarioGame] No questions available!');
      return;
    }

    quizActive = true;
    marioFrozen = true;
    
    // Get current question
    var question = quizSystem.getCurrentQuestion();
    var currentIdx = quizSystem.getCurrentQuestionIndex();
    var totalQuestions = quizSystem.getTotalQuestions();
    
    console.log('[MarioGame] Displaying question:', currentIdx + 1, 'of', totalQuestions);
    quizPopup.displayQuestion(question, currentIdx, totalQuestions);
  };

  this.pauseGame = function() {
    window.cancelAnimationFrame(animationID);
  };

  this.handleQuizAnswer = function(optionIndex) {
    console.log('[MarioGame] Quiz answer submitted:', optionIndex);
    
    if (!quizSystem || !quizPopup) {
      console.error('[MarioGame] Quiz system not initialized');
      return;
    }

    var result = quizSystem.answerQuestion(optionIndex);

    if (result.correct) {
      console.log('[MarioGame] ✓ CORRECT!');
      // Show simple "right" message
      quizPopup.showResult(true, '✓ Right!');

      // Kill nearest enemy
      if (goombas.length > 0) {
        goombas[0].state = 'dead';
        console.log('[MarioGame] Enemy defeated!');
      }

      // Wait 5 seconds then show next question or finish
      setTimeout(function() {
        if (result.quizComplete) {
          console.log('[MarioGame] All questions completed!');
          quizPopup.showCongratulatios();
          
          setTimeout(function() {
            quizActive = false;
            marioFrozen = false;
            quizPopup.hide();
            that.resetGame();
          }, 3000);
        } else {
          // Set flag to show NEXT question after 5 more seconds
          quizActive = false;
          marioFrozen = false;
          quizPopup.hide();
          quizWaitingForNext = true;
          quizAnswerShowTime = 0;
        }
      }, 5000);
    } else {
      console.log('[MarioGame] ❌ WRONG! Restarting game...');
      // Show simple "wrong" message with "better luck next time"
      quizPopup.showResult(false, '❌ Wrong! Better luck next time!');
      
      // Wait 5 seconds then RESTART the game from the beginning
      // BUT keep the question index so the same question appears again
      setTimeout(function() {
        quizActive = false;
        marioFrozen = false;
        quizPopup.hide();
        // DO NOT reset quiz system - keep question index
        // This way the same question will be asked again
        that.resetGame();
      }, 5000);
    }
  };

  this.gameOver = function() {
    score.gameOverView();
    gameUI.makeBox(0, 0, maxWidth, height);
    gameUI.writeText('Game Over', centerPos - 80, height - 300);
    gameUI.writeText('Thanks For Playing', centerPos - 122, height / 2);
  };

  this.resetGame = function() {
    // IMPORTANT: Cancel the old animation loop before restarting
    if (animationID) {
      window.cancelAnimationFrame(animationID);
      animationID = null;
    }
    that.clearInstances();
    that.init(originalMaps, currentLevel);
  };

  this.clearInstances = function() {
    mario = null;
    element = null;
    gameSound = null;

    goombas = [];
    bullets = [];
    powerUps = [];
  };

  this.clearTimeOut = function() {
    clearTimeout(timeOutId);
  };

  this.removeGameScreen = function() {
    gameUI.hide();

    if (score) {
      score.hideScore();
    }
  };

  this.showGameScreen = function() {
    gameUI.show();
  };
}
