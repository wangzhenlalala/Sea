
function draw(ctx) {
    ctx.fillStyle = "rgb(255, 0, 255)";
    
    /**           Drawing rectangles  */
    //all three rectangle functions draw immediately to the canvas.
    ctx.fillRect(25, 125, 100, 100);
    ctx.clearRect(45, 145, 60, 60); //make the area totally transparent
    ctx.strokeRect(50, 150, 50, 50);
  
  /**           Drawing paths  */
    ctx.beginPath(); //reset internal path list
  
    //Moves the pen to the coordinates specified by x and y.
    //We could also use moveTo() to draw unconnected paths.
    ctx.moveTo(175, 50); 
  
    //Draws a line from the current drawing position to the position specified by x and y.
    //The starting point can also be changed by using the moveTo() method.
    ctx.lineTo(200, 75);
    ctx.lineTo(200, 25);
    ctx.fill();
  
    ctx.beginPath();
    ctx.moveTo(275, 50);
    ctx.lineTo(300, 75);
    ctx.lineTo(300, 25);
    ctx.closePath();
    ctx.stroke();
  
    ctx.beginPath();
    ctx.moveTo(400,100);
    ctx.arc(400,100,40,0,Math.PI * 0.5, false);
    ctx.stroke();
  
  
    ctx.beginPath();
    
    ctx.moveTo(75, 40);
    ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
    ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
    ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
  
    //draw path ,an auto move pen position to x,y
    ctx.rect(10,10,140,120);
    ctx.fill();
}

init();