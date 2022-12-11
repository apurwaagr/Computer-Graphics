"use strict"

/////////////////////////////////////////////
/////////  Complex Number Helpers  //////////
/////////////////////////////////////////////
function ComplexNumber(re, im) {
    this.re = re;
    this.im = im;
}

function ComplexNumberFromCoords(x, y, canvasID) {
    let canvas = document.getElementById(canvasID);
    this.re = (x / (1.0 * canvas.width) - 0.5);
    this.im = (y / (1.0 * canvas.height) - 0.5);
    if (canvasID == 'julia_canvas') {
        this.re *= 3;
        this.im *= 3;
    } else {
        this.re = this.re * 3 * Math.pow(2, zoom) + center.re;
        this.im = this.im * 2 * Math.pow(2, zoom) + center.im;
    }
}

function mult(x, y) {
    let re = (x.re * y.re - x.im * y.im);
    let im = (x.re * y.im + x.im * y.re);
    return new ComplexNumber(re, im);
}

function add(x, y) {
    let re = (x.re + y.re);
    let im = (x.im + y.im);
    return new ComplexNumber(re, im);
}

function sub(x, y) {
    let re = (x.re - y.re);
    let im = (x.im - y.im);
    return new ComplexNumber(re, im);
}

function abs(x) {
    return Math.sqrt(x.re * x.re + x.im * x.im);
}


/////////////////////////////////
/////////  Magic Math  //////////
/////////////////////////////////
function f_c(z, c) {
    // TODO 1.4a):      Compute the result of function f_c for a given z and
    //                  a given c. Use the helper functions.
    return add(mult(z, z), c);

}

function countIterations(start_z, c, max_iter) {
    // TODO 1.4a):      Count iterations needed for the sequence to diverge.
    //                  z is declared diverged as soon as its absolute value
    //                  exceeds 2. If the sequence does not diverge during
    //                  the first max_iter iterations, return max_iter. Use
    //                  function f_c().

    let z = start_z;
    let i = 0;
    let absz = 0;
    let result = 0;
    while (true){
        i++;
        z = f_c(z, c);
        absz = abs(z);
        if (absz > 2){
            result = i;
            break;
        } else if (i >= max_iter){
            result = max_iter;
            break;
        }
    }

    // TODO 1.4b):      Change the return value of this function to avoid
    //                  banding.

    let mu = Math.log(Math.abs(Math.log(abs(z)))) / Math.log(2);
    return (result + 1 - mu);
}


/////////////////////////////
/////////  Colors  //////////
/////////////////////////////
function getColorForIter(iter) {

    // find out which radio button is checked, i.e. which color scheme is picked
    let colorscheme;
    let radios = document.getElementsByName('colors');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            colorscheme = radios[i].value;
            break;
        }
    }

    // return color according to chosen color scheme
    let color = [128, 128, 128];
    iter = Math.ceil(iter);
    // console.log(iter)

    
    if (colorscheme == "black & white") {
        // TODO 1.4a):      Return the correct color for the iteration count
        //                  stored in iter. Pixels corresponding to complex
        //                  numbers for which the sequence diverges should be
        //                  shaded white. Use the global variable max_iter.
        if (iter >= max_iter) {
            color = [0, 0, 0];
        }
        else {
            color = [255, 255, 255];
        }


    } else if (colorscheme == "greyscale") {
        // TODO 1.4b):      Choose a greyscale color according to the given
        //                  iteration count in relation to the maximum
        //                  iteration count. The more iterations are needed
        //                  for divergence, the darker the color should be.
        //                  Be aware of integer division!
        if (iter >= max_iter) {
            color = [0, 0, 0];
        }
        else {
            // console.log("next round");
            // console.log(abs(iter))
            // console.log(max_iter);
            let interpolationFactor = parseFloat(iter) / parseFloat(max_iter)
            // console.log(interpolationFactor);
            let interpolatedColor = 255 - Math.round(interpolationFactor * parseFloat(255));
            // console.log(interpolatedColor);
            color = [interpolatedColor, interpolatedColor, interpolatedColor];
        }

    } else if (colorscheme == "underwater") {
        // TODO 1.4b):      Choose a color between blue and green according
        //                  to the given iteration count in relation to the
        //                  maximum iteration count. The more iterations are
        //                  needed for divergence, the more green and less
        //                  blue the color should be.
        if (iter >= max_iter) {
            color = [0, 0, 0];
        }
        else {
            let interpolationFactor = parseFloat(iter) / parseFloat(max_iter)
            // blue decreases if iter goes up
            // or should green also increase?
            // let green = 0 + Math.round(interpolationFactor * 255)
            let blue = 255 - Math.round(interpolationFactor * parseFloat(255));
            color = [0, 128, blue];
        }


    } else { // rainbow
        // TODO 1.4b):      Choose a rainbow color according to the given
        //                  iteration count in relation to the maximum
        //                  iteration count. Colors should change from cyan
        //                  (for very few needed iterations) over blue, violet, pink,
        //                  red, yellow and green back to cyan (for lots of
        //                  needed iterations). Use the HSV model and convert
        //                  HSV to RGB colors using function hsv2rgb.
        if (iter >= max_iter) {
            color = [0, 0, 0];
        }
        else {
            let interpolationFactor = parseFloat(iter) / parseFloat(max_iter);
            let h_cyan = 180.0
            let h = Math.round(h_cyan + (360.0 * interpolationFactor));
            if (h >= 360){
                h = h - 360;
            }
            color = hsv2rgb([h, 50, 50]);
        }

    }
    return color;
}


function hsv2rgb(hsv) {
    let h = hsv[0];
    let s = hsv[1];
    let v = hsv[2];


    // TODO 1.4b):      Replace the following line by code performing the
    //                  HSV to RGB convertion known from the lecture.
    let rgb = [255, 255, 255];
    let c = v * s;
    let h_a = h/60;
    let x = c * (1 - Math.abs((h_a % 2) - 1));
    let m = v - c;

    if (0 <= h_a < 60){
        rgb = [c, x, 0];
    } else if (60 <= h_a < 120) {
        rgb = [x, c, 0];
    } else if (120 <= h_a < 180) {
        rgb = [0, c, x];
    } else if (180 <= h_a < 240) {
        rgb = [0, x, c];
    } else if (240 <= h_a < 300) {
        rgb = [x, 0, c];
    } else if (300 <= h_a < 360) {
        rgb = [c, 0, x];
    }

    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];

    rgb = [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];

    return rgb;
}


/////////////////////////////////////
/////////  Canvas Fillers  //////////
/////////////////////////////////////
function mandelbrotSet(image) {
    for (let i = 0; i < 4 * image.width * image.height; i += 4) {
        let pixel = i / 4;
        let x = pixel % image.width;
        let y = image.height - pixel / image.width;
        let c = new ComplexNumberFromCoords(x, y, 'mandelbrot_canvas');

        // TODO 1.4a):      Replace the following line by creation of the
        //                  Mandelbrot set. Use functions countIterations() 
        //                  and getColorForIter().

        // let rgb = [(c.re + 0.5) * 255, (c.im + 0.5) * 255, 0];
        let start_z = new ComplexNumber(0, 0);
        let iter = countIterations(start_z, c, max_iter);
        let rgb = getColorForIter(iter)

        image.data[i] = rgb[0];
        image.data[i + 1] = rgb[1];
        image.data[i + 2] = rgb[2];
        image.data[i + 3] = 255;
    }
}

function juliaSet(image) {
    for (let i = 0; i < 4 * image.width * image.height; i += 4) {
        let pixel = i / 4;
        let x = pixel % image.width;
        let y = image.height - pixel / image.width;

        // TODO 1.4d):      Replace the following line by creation of the
        //                  Julia set for c = juliaC (global variable). Use
        //                  functions ComplexNumberFromCoords(),
        //                  countIterations() and getColorForIter().

        let c = juliaC;
        let start_z = new ComplexNumberFromCoords(x, y, "julia_canvas");
        let iter = countIterations(start_z, c, max_iter);
        let rgb = getColorForIter(iter);


        image.data[i] = rgb[0];
        image.data[i + 1] = rgb[1];
        image.data[i + 2] = rgb[2];
        image.data[i + 3] = 255;
    }
}

///////////////////////////////
/////////  Renderers  //////////
///////////////////////////////
function RenderMandelbrotSet() {
    // get the canvas
    let canvas = document.getElementById("mandelbrot_canvas");
    let ctx = canvas.getContext("2d");

    // create a new image
    let image = ctx.createImageData(canvas.width, canvas.height);

    // render Mandelbrot set
    mandelbrotSet(image);

    // write image back to canvas
    ctx.putImageData(image, 0, 0);
}

function RenderJuliaSet() {
    // get the canvas
    let canvas = document.getElementById("julia_canvas");
    let ctx = canvas.getContext("2d");

    // create a new image
    let image = ctx.createImageData(canvas.width, canvas.height);

    // render Julia set
    juliaSet(image);

    // write image back to canvas
    ctx.putImageData(image, 0, 0);
}


///////////////////////////////
//////////   "main"   /////////
///////////////////////////////

// maximum iteration number for Mandelbrot computation
let max_iter = 30;

// coordinate system center
let center = new ComplexNumber(-0.5, 0);

// zoom stage
let zoom = 0;

// flag to show if mouse is pressed
let dragging = false;

// helper variables for Julia set line
let firstLinePointSet = false;
let firstLinePoint;
let secondLinePoint;
let loopVariable = 0;
let looper = null;

// helper variable for moving around
let lastPoint;

// c for Julia set creation
let juliaC = new ComplexNumber(0.4, 0.1);

function setupMandelbrot(canvas) {
    // reset color scheme and maximum iteration number
    let radios = document.getElementsByName('colors');
    radios[0].checked = true;
    let slider = document.getElementById('slider');
    slider.value = 30;

    // render
    RenderMandelbrotSet();
    RenderJuliaSet();

    // add event listeners
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
    canvas.addEventListener('mouseup', onMouseUp, false);

    // TODO 1.4c):      Uncomment the following line to enable zooming.

    canvas.addEventListener('DOMMouseScroll', onMouseWheel, false);

}


//////////////////////////////////////
//////////   Event Listeners   ///////
//////////////////////////////////////
function onMouseDown(e) {
    let canvas = document.getElementById("mandelbrot_canvas");
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    y = canvas.height - y;

    if (e.ctrlKey) {
        // choose new c for Julia set creation
        clearInterval(looper);
        juliaC = new ComplexNumberFromCoords(x, y, 'mandelbrot_canvas');
        RenderJuliaSet();
    } else if (e.shiftKey) {
        if (firstLinePointSet == false) {
            firstLinePointSet = true;
            firstLinePoint = [x, y];
            RenderMandelbrotSet();
            clearInterval(looper);
        } else {
            firstLinePointSet = false;
            secondLinePoint = [x, y];
            let c = document.getElementById('mandelbrot_canvas');
            let ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgb(255,255,255)";
            ctx.moveTo(Math.round(firstLinePoint[0]), canvas.height - Math.round(firstLinePoint[1]));
            ctx.lineTo(Math.round(secondLinePoint[0]), canvas.height - Math.round(secondLinePoint[1]));
            ctx.stroke();
            looper = setInterval(juliaLoop, 20);
            loopVariable = 0;
        }
    } else {
        // TODO 1.4c):      Store the hit point as pixel coordinates and
        //                  start the dragging process. Use the global
        //                  variables dragging (bool) and lastPoint (two
        //                  dimensional vector).
        dragging = true;
        lastPoint = [x, y];

    }
}


function juliaLoop() {
    let alpha = 0.5 * Math.sin(loopVariable * 0.05) + 0.5; // oscillating between 0 and 1
    juliaC = new ComplexNumberFromCoords((1 - alpha) * firstLinePoint[0] + alpha * secondLinePoint[0], (1 - alpha) * firstLinePoint[1] + alpha * secondLinePoint[1], 'mandelbrot_canvas');
    RenderJuliaSet();
    loopVariable++;
}


function onMouseMove(e) {
    if (dragging) {
        let canvas = document.getElementById("mandelbrot_canvas");
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        y = canvas.height - y;

        // TODO 1.4c):      Convert both last and current hit point to
        //                  their corresponding complex numbers, compute
        //                  their distance (also as a complex number) and
        //                  shift the plane accordingly. To do so, change
        //                  the global variable center which is used to
        //                  compute the complex number corresponding to a pixel.
        if (dragging){
            let currentPositionAsComplexNumber = new ComplexNumberFromCoords(x, y, 'mandelbrot_canvas');
            let lastPointPositionAsComplexNumber = new ComplexNumberFromCoords(lastPoint[0], lastPoint[1], 'mandelbrot_canvas');
            let distance = sub(lastPointPositionAsComplexNumber, currentPositionAsComplexNumber)
            center = add(center, distance);
        }

        // rerender image
        RenderMandelbrotSet();
    }
}

function onMouseUp(e) {
    // TODO 1.4c):      Prevent dragging of the plane once the mouse is
    //                  not pressed anymore.
    dragging = false;

}

function onMouseWheel(e) {
    let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    zoom = zoom + delta;

    // render
    RenderMandelbrotSet();

    // do not scroll the page
    e.preventDefault();
}

function onChangeMaxIter(value) {
    max_iter = value;

    // render
    RenderMandelbrotSet();
    RenderJuliaSet();
}

function onChangeColorScheme() {
    // render
    RenderMandelbrotSet();
    RenderJuliaSet();
}
