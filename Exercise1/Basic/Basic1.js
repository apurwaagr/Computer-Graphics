"use strict"

function drawPixelwiseCircle(canvas) {
    let context = canvas.getContext("2d");
    let img = context.createImageData(200, 200);
    
    //TODO 1.1a)      Copy the code from Example.js
    //                and modify it to create a 
    //                circle.

    let x = 0;
    let y = 0;
    let r = 50;
    for (let i = 0; i < 4 * 200 * 200; i += 4) {
        if (calculateDistance(x, y) <= r){
            img.data[i] = 0;
            img.data[i + 1] = 255;
            img.data[i + 2] = 0;
            img.data[i + 3] = 255;
        }
        if (x === 199) {
            x = 0;
            y++;
        } else {
            x++;
        }
    }
    context.putImageData(img, 0, 0);
}

function calculateDistance(x, y){
    let xCenter = 100;
    let yCenter = 100;

    let deltaX = Math.abs(xCenter - x);
    let deltaY = Math.abs(yCenter - y)
    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
}

function drawContourCircle(canvas) {
    let context = canvas.getContext("2d");
    let img = context.createImageData(200, 200);

    //TODO 1.1b)      Copy your code from above
    //                and extend it to receive a
    //                contour around the circle.

    let x = 0;
    let y = 0;
    for (let i = 0; i < 4 * 200 * 200; i += 4) {
        if (calculateDistance(x, y) < 45){
            img.data[i] = 0;
            img.data[i + 1] = 255;
            img.data[i + 2] = 0;
            img.data[i + 3] = 255;
        } else if (calculateDistance(x, y) <= 55){
            img.data[i] = 0;
            img.data[i + 1] = 127;
            img.data[i + 2] = 0;
            img.data[i + 3] = 255;
        }
        if (x === 199) {
            x = 0;
            y++;
        } else {
            x++;
        }
    }


    context.putImageData(img, 0, 0);
}

function drawSmoothCircle(canvas) {
    let context = canvas.getContext("2d");
    let img = context.createImageData(200, 200);

    //TODO 1.1c)      Copy your code from above
    //                and extend it to get rid
    //                of the aliasing effects at
    //                the border.

    let x = 0;
    let y = 0;
    for (let i = 0; i < 4 * 200 * 200; i += 4) {
        if (calculateDistance(x, y) < 45){
            img.data[i] = 0;
            img.data[i + 1] = 255;
            img.data[i + 2] = 0;
            img.data[i + 3] = 255;
        } else if (calculateDistance(x, y) < 46){
            img.data[i] = 0;
            img.data[i + 1] = (255 + 127) / 2;
            img.data[i + 2] = 0;
            img.data[i + 3] = 255;
        } else if (calculateDistance(x, y) < 55){
            img.data[i] = 0;
            img.data[i + 1] = 127;
            img.data[i + 2] = 0;
            img.data[i + 3] = 255;
        } else if (calculateDistance(x, y) < 56){
            img.data[i] = (0 + 255) / 2;
            img.data[i + 1] = (127 + 255) /2;
            img.data[i + 2] = (0 + 255) / 2;
            img.data[i + 3] = 255;
        }
        if (x === 199) {
            x = 0;
            y++;
        } else {
            x++;
        }
    }


    context.putImageData(img, 0, 0);
}
