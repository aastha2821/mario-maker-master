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
    if (!question) {
      console.error('[QuizUI] No question provided to drawQuizOverlay');
      return;
    }

    console.log('[QuizUI] Drawing question:', question.question);
    
    var ctx = gameUI.getCanvas().getContext('2d');
    
    // Clear canvas section with dark overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw question box background
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

    // Draw white border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    // Draw question text with word wrapping
    var questionText = question.question;
    var words = questionText.split(' ');
    var lines = [];
    var currentLine = '';
    
    ctx.font = 'bold 18px Arial';
    var maxLineWidth = boxWidth - 40;

    for (var i = 0; i < words.length; i++) {
      var testLine = currentLine + (currentLine ? ' ' : '') + words[i];
      var metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxLineWidth && currentLine) {
        lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    var lineHeight = 25;
    var textStartY = boxY + 20;
    
    for (var i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], canvasWidth / 2, textStartY + (i * lineHeight));
    }

    // Draw answer options
    optionBoxes = [];
    console.log('[QuizUI] Drawing', question.options.length, 'options');
    
    for (var i = 0; i < question.options.length; i++) {
      var optionY = optionsStartY + (i * (optionBoxHeight + optionSpacing));
      var optionX = (canvasWidth - optionBoxWidth) / 2;

      // Store click box
      optionBoxes.push({
        x: optionX,
        y: optionY,
        width: optionBoxWidth,
        height: optionBoxHeight,
        index: i
      });

      // Draw option background
      var isHovered = (i === hoveredOption);
      ctx.fillStyle = isHovered ? '#FFD700' : '#27ae60';
      ctx.fillRect(optionX, optionY, optionBoxWidth, optionBoxHeight);

      // Draw option border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.strokeRect(optionX, optionY, optionBoxWidth, optionBoxHeight);

      // Draw option text
      ctx.fillStyle = isHovered ? '#000000' : '#ffffff';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(question.options[i], canvasWidth / 2, optionY + optionBoxHeight / 2);
    }

    console.log('[QuizUI] Quiz overlay drawn successfully');
  };

  this.getClickedOption = function(mouseX, mouseY) {
    for (var i = 0; i < optionBoxes.length; i++) {
      var box = optionBoxes[i];
      if (mouseX >= box.x && mouseX <= box.x + box.width &&
          mouseY >= box.y && mouseY <= box.y + box.height) {
        console.log('[QuizUI] Clicked option:', i);
        return box.index;
      }
    }
    return -1;
  };

  this.updateHoveredOption = function(mouseX, mouseY) {
    hoveredOption = -1;
    for (var i = 0; i < optionBoxes.length; i++) {
      var box = optionBoxes[i];
      if (mouseX >= box.x && mouseX <= box.x + box.width &&
          mouseY >= box.y && mouseY <= box.y + box.height) {
        hoveredOption = i;
        return;
      }
    }
  };

  this.resetHover = function() {
    hoveredOption = -1;
  };

  this.drawCongratulations = function() {
    var ctx = gameUI.getCanvas().getContext('2d');
    
    // Dark overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Congratulations box
    var boxW = 700;
    var boxH = 250;
    var bx = (canvasWidth - boxW) / 2;
    var by = (canvasHeight - boxH) / 2;

    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(bx, by, boxW, boxH);

    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 4;
    ctx.strokeRect(bx, by, boxW, boxH);

    // Congratulations text
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('CONGRATULATIONS! 🎉', canvasWidth / 2, by + 60);

    ctx.fillStyle = '#ffffff';
    ctx.font = '24px Arial';
    ctx.fillText('You completed the quiz challenge!', canvasWidth / 2, by + 130);

    ctx.fillStyle = '#cccccc';
    ctx.font = '18px Arial';
    ctx.fillText('Thanks for playing!', canvasWidth / 2, by + 190);
  };
}

