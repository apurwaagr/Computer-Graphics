precision mediump float;

// TODO 3.3)	Define a constant variable (uniform) to 
//              "send" the canvas size to all fragments.
uniform vec2 canvasSize;

void main(void)
{ 
	float smoothMargin = 0.01;  
	float r = 0.8;         
	 
	// TODO 3.3)	Map the fragment's coordinate (gl_FragCoord.xy) into 
	//				the range of [-1,1]. Discard all fragments outside the circle 
	//				with the radius r. Smooth the circle's edge within 
	//				[r-smoothMargin, r] by computing an appropriate alpha value.

	float new_x = -1.0 + ((gl_FragCoord.x * (1.0 + 1.0)) / canvasSize.x); //Min-Max-Normalization
	float new_y = -1.0 + ((gl_FragCoord.y * (1.0 + 1.0)) / canvasSize.y);
	vec2 mapped = vec2(new_x, new_y);

	float distance = sqrt(mapped.x * mapped.x + mapped.y * mapped.y);
	if (distance > r) {
		discard;
	} else if (distance > (r - smoothMargin)) {
		float a = 1.0 - ((distance - (r - smoothMargin)) / (r - (r - smoothMargin)));
		gl_FragColor = vec4(1.0, 85.0/255.0, 0.0, a);
		//gl_FragColor = vec4(0.0, 85.0/255.0, 0.0, 1.0);
	} else {
		gl_FragColor = vec4(1.0, 85.0/255.0, 0.0, 1.0);
	}

	
}