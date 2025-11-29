// Quiz UI - Handles rendering of quiz popup and answer selection

function QuizUI() {
  var gameUI = GameUI.getInstance();
  var canvasWidth = gameUI.getWidth();
  var canvasHeight = gameUI.getHeight();

  var boxWidth = 600;
  var boxHeight = 350;
  var boxX = (canvasWidth - boxWidth) / 2;
  var boxY = (canvasHeight - boxHeight) / 2;

  var optionBoxWidth = 250;
  var optionBoxHeight = 50;
  var optionSpacing = 20;
  var optionsStartY = boxY + 120;

  var optionBoxes = []; // Store option click areas
  var hoveredOption = -1;

  var that = this;

  this.drawQuizOverlay = function(question) {
    var ctx = gameUI.getCanvas().getContext('2d');
    
    // Draw dark overlay with semi-transparency
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw question box with white background
    ctx.fillStyle = '#333333';
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

    // Draw white border (outline effect)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.rect(boxX, boxY, boxWidth, boxHeight);
    ctx.stroke();

    // Draw question text
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    var questionText = question.question;
    var words = questionText.split(' ');
    var lines = [];
    var currentLine = '';

    // Word wrap
    for (var i = 0; i < words.length; i++) {
      var testLine = currentLine + (currentLine ? ' ' : '') + words[i];
      var testWidth = ctx.measureText(testLine).width;
      
      if (testWidth > boxWidth - 40) {
        if (currentLine) lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    var lineHeight = 20;
    var startY = boxY + 30;
    for (var i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], canvasWidth / 2, startY + (i * lineHeight));
    }

    // Draw answer options
    optionBoxes = [];
    for (var i = 0; i < question.options.length; i++) {
      var optionY = optionsStartY + (i * (optionBoxHeight + optionSpacing));

      // Calculate option box position (centered)
      var optionX = (canvasWidth - optionBoxWidth) / 2;

      // Store click area
      optionBoxes.push({
        x: optionX,
        y: optionY,
        width: optionBoxWidth,
        height: optionBoxHeight,
        index: i
      });

      // Draw option box
      ctx.fillStyle = (i === hoveredOption) ? '#FFD700' : '#4CAF50';
      ctx.fillRect(optionX, optionY, optionBoxWidth, optionBoxHeight);

      // Draw border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.rect(optionX, optionY, optionBoxWidth, optionBoxHeight);
      ctx.stroke();

      // Draw option text
      ctx.font = '14px Arial';
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(question.options[i], canvasWidth / 2, optionY + optionBoxHeight / 2);
    }
  };

  this.getClickedOption = function(mouseX, mouseY) {
    for (var i = 0; i < optionBoxes.length; i++) {
      var box = optionBoxes[i];
      if (mouseX >= box.x && mouseX <= box.x + box.width &&
          mouseY >= box.y && mouseY <= box.y + box.height) {
        return box.index;
      }
    }
    return -1;
  };

  this.updateHoveredOption = function(mouseX, mouseY) {
    for (var i = 0; i < optionBoxes.length; i++) {
      var box = optionBoxes[i];
      if (mouseX >= box.x && mouseX <= box.x + box.width &&
          mouseY >= box.y && mouseY <= box.y + box.height) {
        hoveredOption = i;
        return;
      }
    }
    hoveredOption = -1;
  };

  this.resetHover = function() {
    hoveredOption = -1;
  };

  this.drawCongratulations = function() {
    // Draw dark overlay
    gameUI.makeBox(0, 0, canvasWidth, canvasHeight);

    // Draw congratulations box
    var congBoxWidth = 700;
    var congBoxHeight = 250;
    var congBoxX = (canvasWidth - congBoxWidth) / 2;
    var congBoxY = (canvasHeight - congBoxHeight) / 2;

    gameUI.makeBox(congBoxX, congBoxY, congBoxWidth, congBoxHeight);

    // Draw white border
    var ctx = gameUI.getCanvas().getContext('2d');
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.rect(congBoxX, congBoxY, congBoxWidth, congBoxHeight);
    ctx.stroke();

    // Draw congratulations text
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#FFD700';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('CONGRATULATIONS! 🎉', canvasWidth / 2, congBoxY + 60);

    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('You completed the quiz challenge!', canvasWidth / 2, congBoxY + 120);

    ctx.font = '16px Arial';
    ctx.fillStyle = '#cccccc';
    ctx.fillText('Thanks for playing!', canvasWidth / 2, congBoxY + 180);
  };
}
