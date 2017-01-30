window.onload = function() {
	var c1;
	var ctx;

	var backC1;
	var backCtx;
	var ctxHeight;
	var ctxWidth;
	var add_CircleButton;
	var rem_CircleButton;

	var myCanvas;

	var arc = [{x:234,y:50,r:10,color:33,vx:-3,vy:7},{x:11,y:111,r:15,color:44,vx:-2,vy:1},{x:444,y:230,r:13,color:14,vx:-3,vy:7}];
	var frame;
	var pixelLength = 0;
	var temp = [];

	// initialize canvas context
	var init = function(){
	    c1 = document.getElementById('c1');    
	    add_CircleButton = document.getElementById("add");
	    rem_CircleButton = document.getElementById("rem");
	    ctx1 = c1.getContext('2d');
	    backC1 = document.createElement('canvas')
	    ctx = backC1.getContext('2d')
	    ctxHeight = c1.height
	    ctxWidth = c1.width
	    backC1.height = ctxHeight;
	    backC1.width = ctxWidth;
	    add_CircleButton.onclick = add_Circle;
	    rem_CircleButton.onclick = remove_Circle;
	}	 

	// draw video stream to canvas
	var draw_video = function(video, dt){
		ctx.drawImage(video, 0, 0, ctxWidth, ctxHeight)
	}

	// draw objects to canvas video object
	var draw = function(){
		frameChange(ctx.getImageData(0,0, ctxWidth, ctxHeight));
		requestAnimationFrame(draw);
	}

	// color change on canvas object for obstacles
	var frameChange = function(frame){
		frame = frame;
		pixelLength = (frame.data.length) / 4; 
		for (var i = 0; i < pixelLength; i++) {
			var r = frame.data[i * 4 + 0];
			var g = frame.data[i * 4 + 1];
			var b = frame.data[i * 4 + 2];
		if (b > 125 && r > 125 && g > 125) {
		    frame.data[i * 4 + 0] = 255;
		    frame.data[i * 4 + 1] = 255;
		    frame.data[i * 4 + 2] = 255;
		    frame.data[i * 4 + 3] = 5;
		}else {
		    if (b > 100 && r < 80 && g < 100) {
		    frame.data[i * 4 + 0] = 255;
		    frame.data[i * 4 + 1] = 255;
		    frame.data[i * 4 + 2] = 255;
		    frame.data[i * 4 + 3] = 5;
		    }
		}
		}
		ctx1.putImageData(frame,0,0);
		balls(ctx1, frame);
	}

	// translation of objects
	var balls = function (ctx, frame){
		for (var i = 0; i < arc.length; i++) {
			ctx.fillStyle = 'hsl(' + arc[i].color + ',100%,50%)';
			ctx.beginPath();
			ctx.arc(arc[i].x,arc[i].y,arc[i].r,0,2*Math.PI,false);
			ctx.fill();
			if((arc[i].x + arc[i].vx + arc[i].r> 0 + ctxWidth) || (arc[i].x - arc[i].r + arc[i].vx < 0)){
				arc[i].vx = - arc[i].vx;
			 }else if((arc[i].y + arc[i].vy + arc[i].r > 0 + ctxHeight) || (arc[i].y - arc[i].r + arc[i].vy < 0)){
				 arc[i].vy = - arc[i].vy;
			 }else {
				var res =  getCoordinateFromPixel(frame, arc[i]);
				if(res){
				console.log();
				}else{
				arc[i].vx = - arc[i].vx;
				arc[i].vy = - arc[i].vy;
				}
			 }


				 arc[i].x +=arc[i].vx;
				 arc[i].y +=arc[i].vy;
		};
	}

	// fetch coordinates from canvas
	var getCoordinateFromPixel = function(frameData, ball){
		var bX = ball.x;
		var bY = ball.y;
		var pixels = [];
		var coord =((bX*4)  + (bY*4)*ctxWidth );

		var actPixel = [frameData.data[coord-4], frameData.data[coord-3],frameData.data[coord-2],frameData.data[coord-1]];
		if(actPixel !== undefined){
			 if (actPixel[0] > 200  && actPixel[1] > 200 && actPixel[2] > 200) {

				return true;
			}else{
				return false;
			}		
		}
	}

	// add random cricle to canvas
	var add_Circle = function(){

		var circle = {
			x:Math.floor(150*Math.random()),
			y:Math.floor(150*Math.random()),
			r: Math.floor(2 + 15*Math.random()),
			color: Math.floor(360*Math.random()),
			vx:Math.floor(2 + 2*Math.random()),
			vy:Math.floor(2 + 2*Math.random())
		}
		arc.push(circle);
	}

	var remove_Circle = function(){
		arc.pop();
	}

	// initialize canvas objects
	init();

	// create canvas video stream
	myCanvas = new camvas(ctx, draw_video)

	// calculate borders
	requestAnimationFrame(draw);
}