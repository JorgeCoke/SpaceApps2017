
/**
*   Object to store Intervals; we need to keep track of them to make
*   animation creation and stopping instant and effective.
*/
var interval = {

  intervals : {},

  make : function ( fun, delay ){

        var newInterval = setInterval.apply(
            window,
            [ fun, delay ].concat( [].slice.call(arguments, 2) )
        );

        this.intervals[ newInterval ] = true;

        return newInterval;
  },

  clear : function ( id ){
     return clearInterval( this.intervals[id] );
  },

  clearAll : function(){
    var all = Object.keys( this.intervals ), len = all.length;

     while ( len --> 0 ) {
      clearInterval( all.shift() );
    }
  }

};

/**
* Object to store gesture information
* If we are currently performing a gesture, want to lock other tracking, so this is necessary.
*/
var gestureLocker = {

  locked : false,

  lock : function(){
    this.locked = true;
  },

  unlock : function(){
    this.locked = false;
  },

  isLocked : function(){
    return this.locked;
  }

};

/**
* Object to help with handling zooming actions
*/
var zoomHandler = {

  isZooming : false,

  zoomInterval : '',

  isClockwise : false,

  startZoom : function(clockwise, e){
    var zoom_const = 0.01;
    var zoom_interval = 1000;
    var min_zoom = 3.5;
    var max_zoom = 15.0
    if(!this.isZooming){
      isClockwise = clockwise;
      this.isZooming = true;
      if(clockwise){
        this.zoomInterval = interval.make(function(){
        var zoom = e.getZoom();
        console.log(zoom);
        if( zoom <=  max_zoom){
           e.setZoom(zoom + zoom_const);
         }
         if(gestureLocker.isLocked() == false){
           interval.clearAll(); //safety feature to stop zoom continuing
          }
        }, zoom_interval);
      }else{
         this.zoomInterval = interval.make(function(){
         var zoom = e.getZoom();
         console.log(zoom);
          if(zoom >= min_zoom){
           e.setZoom(zoom - zoom_const);
         }
         if(gestureLocker.isLocked() == false){
           interval.clearAll(); //safety feature to stop zoom continuing
          }
      }, zoom_interval);
      }
    }
  },

  stopZoom : function(){
    if(this.isZooming) {  interval.clear(this.zoomInterval); }

    this.isZooming = false;
  }
};


/**
* Function to detect how sensitive motion needs to be, based
* on the current level of zoom
* @params e - a WebGL Earth Object, that is initialized.
*/
function getSensitivity(e){
  var zoom_factor = 50;
  var zoom = e.getZoom();
  var sensitivity = zoom_factor/(zoom ^ 2);
  return sensitivity;
}

    var options = { zoom: 3.0, position: [47.19537,8.524404] };
    var earth = new WebGLEarth('earth_div', options);

    //Jquery for the search tool.
  $("#nav_input").bind("enterKey", function(e){
    interval.clearAll();
    var geocoder = new google.maps.Geocoder();
    var address = $("#nav_input").val();

    geocoder.geocode( { 'address': address}, function(results, status) {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();
      if(latitude != null && longitude != null){
        earth.flyTo(latitude, longitude);
      }
    });
  });

  $("#nav_input").keyup(function(e){
    if(e.keyCode == 13){
      $(this).trigger("enterKey");
    }
  });

  //Jquery for stop rotation button
  $("#stop_rotation").click(function(e){
    interval.clearAll();
  });

  	var canvas = document.getElementById('canvas');

	// Making sure we have the proper aspect ratio for our canvas
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

	var c = canvas.getContext('2d');

	// Save the canvas width and canvas height
    // as easily accesible variables
    var width = canvas.width;
    var height = canvas.height;

    /*

      The leapToScene function takes a position in leap space
      and converts it to the space in the canvas.

      It does this by using the interaction box, in order to
      make sure that every part of the canvas is accesible
      in the interaction area of the leap

    */
    function leapToScene( frame , leapPos ){

      // Gets the interaction box of the current frame
      var iBox = frame.interactionBox;

      // Gets the left border and top border of the box
      // In order to convert the position to the proper
      // location for the canvas
      var left = iBox.center[0] - iBox.size[0]/2;
      var top = iBox.center[1] + iBox.size[1]/2;

      // Takes our leap coordinates, and changes them so
      // that the origin is in the top left corner
      var x = leapPos[0] - left;
      var y = leapPos[1] - top;

      // Divides the position by the size of the box
      // so that x and y values will range from 0 to 1
      // as they lay within the interaction box
      x /= iBox.size[0];
      y /= iBox.size[1];

      // Uses the height and width of the canvas to scale
      // the x and y coordinates in a way that they
      // take up the entire canvas
      x *= width;
      y *= height;

      // Returns the values, making sure to negate the sign
      // of the y coordinate, because the y basis in canvas
      // points down instead of up
      return [ x , -y ];

    }

      //map function to be used to map values from leap into proper degrees (0-360)
        function map(value, inputMin, inputMax, outputMin, outputMax){
        outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
        if(outVal >  outputMax){
          outVal = outputMax;
        }
        if(outVal <  outputMin){
          outVal = outputMin;
        }
        return outVal;
      }

    var controllerOptions = {enableGestures: true};

	  var controller = new Leap.Controller(controllerOptions);

	  var intervalId = null;
    var currentInterval = null;
    var lastValidFrameId = null;

	// Tells the controller what to do every time it sees a frame
    controller.on( 'frame' , function(frame){

    var position = earth.getPosition();
    var lat = position[0];
    var lng = position[1];
    var swipeDelta = 0.1;
    var durationMultiplier = 5;
    var swipeDirection = "";

	  //Clears the canvas so we are not drawing multiple frames

	  	 c.clearRect( 0 , 0 , width , height );
       drawHand(frame);

	      //gesture detection
	      if(frame.gestures.length > 0){
	      	for(var i = 0; i < frame.gestures.length; i++){
	      		var gesture = frame.gestures[i];
            //swipe gestures are no longer working due to clashes with actual rotation of the globe.
	      		if(gesture.type == "swipe" && gesture.state == "stop"){
	      			//Classify as either horizontal or vertical
	          		var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
	          		//Classify as either up or down
	          		 if(isHorizontal){
	              		if(gesture.direction[0] > 0){
                        if(swipeDirection != "right"){
                          interval.clearAll();
                        }
                        interval.make('var cx = earth.getPosition(); earth.setPosition(cx[0],cx[1]-0.1);', 30);
                        swipeDirection = "right";

	              		} else {
	                  		if(swipeDirection != "left"){
                          interval.clearAll();
                         }
                          interval.make('var cx = earth.getPosition(); earth.setPosition(cx[0],cx[1]+0.1);', 30);
                         swipeDirection = "left";
	              		}
	          		} else { //vertical
	              		if(gesture.direction[1] > 0){
	                 	 swipeDirection = "up";
	             	 	} else {
	                  swipeDirection = "down";
	              		}
	          		}
	          		console.log(swipeDirection);
	      		}  else if(gesture.type=="circle"){
                gestureLocker.lock();
                console.log('CIRCLE');
                var clockwise = false;
                if(gesture.pointableIds != null){
                  var pointableID = gesture.pointableIds[0];
                  var direction = frame.pointable(pointableID).direction;
                  var dotProduct = Leap.vec3.dot(direction, gesture.normal);

                  if (dotProduct  >  0) {clockwise = true};
                  zoomHandler.startZoom(clockwise, earth);
                }
            }
            else if(gesture.type=="screenTap"){
              gestureLocker.lock();
              var lat = earth.getPosition()[0];
              var lng = earth.getPosition()[1];
              earth.initMarker(lat, lng);
            }
	      	}
	      }else{
          zoomHandler.stopZoom();
          gestureLocker.unlock();
        }



        if(frame.valid){
          if(lastValidFrameId == null){
            lastValidFrameId = frame.id;
          }


            if(typeof frame.hands[0] !== "undefined" ){
               /**
              * We only want to do actions if the gesture locker is not enabled
              */
             if(gestureLocker.isLocked() == false){

              var prevFrame = controller.frame(1); //get most recent frame
              lastValidFrameId = frame.id;

              if(prevFrame.valid){
                var frameTranslate = frame.translation(prevFrame);
                var rotateX = frameTranslate[0];
                var rotateY = frameTranslate[1]; //the magnitude that the hand has moved on y axis
                var rotateZ = frameTranslate[2];//the amount the hand has moved on z axis - roll.

                var handPalmPos = frame.hands[0].palmPosition;
                var lat =  earth.getPosition()[0];
                var lng = earth.getPosition()[1];

                var SCALE_FACTOR = 50;

                var zoom = earth.getZoom();

                var newLat = lat - Math.sin(rotateZ * Math.PI/180) * getSensitivity(earth); //sensitivity changes based on current zoom level
                var newLng = lng +  Math.sin(rotateX * Math.PI/180) * getSensitivity(earth); //sensitivity changes based on current zoom level
                var newZoom = zoom - Math.sin(rotateY * Math.PI/180);

                earth.setPosition(newLat, newLng);
                earth.setZoom(newZoom);
              }

            }else{
              zoomHandler.stopZoom();
            }
            }else{
              //If hand is moved away from device, stop earth rotation.
              zoomHandler.stopZoom();
              interval.clearAll();
            }
          }

    });

/**
* Draw the hand, as part of a reference guide for the user
*/
 function drawHand(frame){
// First we loop through all of the hands that the frame sees
      for( var i=0; i < frame.hands.length; i++ ){

        // For each hand we define it
        var hand = frame.hands[i];

        // and get its position, so that it can be passed through
        // for drawing the connections
        var handPos = leapToScene( frame , hand.palmPosition );

        // Loop through all the fingers of the hand we are on
        for( var j = 0; j < hand.fingers.length; j++ ){

          // Define the finger we are looking at
          var finger = hand.fingers[j];

          // and get its position in Canvas
          var fingerPos = leapToScene( frame , finger.tipPosition );


          /*
              First Draw the Connection
          */

          // Setting up the style for the stroke
          c.strokeStyle = "#FFA040";
          c.lineWidth = 3;

          // Drawing the path
          c.beginPath();

          // Move to the hand position
          c.moveTo(   handPos[0] ,   handPos[1] );

          // Draw a line to the finger position
          c.lineTo( fingerPos[0] , fingerPos[1] );

          c.closePath();
          c.stroke();


          /*
              Second Draw the Finger
          */

          // Setting up the style for the stroke
          c.strokeStyle = "#39AECF";
          c.lineWidth = 5;

          // Creating the path for the finger circle
          c.beginPath();

          // Draw a full circle of radius 6 at the finger position
          c.arc(fingerPos[0], fingerPos[1], 20, 0, Math.PI*2);

          c.closePath();
          c.stroke();

        }
        /*
            Third draw the hand
        */

        // Setting up the style for the fill
        c.fillStyle = "#FF5A40";

        // Creating the path for the hand circle
        c.beginPath();

        // Draw a full circle of radius 10 at the hand position
        c.arc(handPos[0], handPos[1], 40, 0, Math.PI*2);

        c.closePath();
        c.fill();

      }
 }

	controller.connect();
