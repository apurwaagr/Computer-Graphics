"use strict"

function drawArcCircle(canvas) {
    let context = canvas.getContext("2d");

    //TODO 1.2)       Use the arc() function to
    //                rasterize the two circles
    //                from Task 1.1.
    context.beginPath()
    context.arc(60, 60 , 50, 0, Math.PI * 2)
    context.fillStyle = "rgba(0,255,0, 255)"
    context.fill()
    context.closePath()

    context.beginPath()
    context.arc(140, 140 , 55, 0, Math.PI * 2)
    context.fillStyle = "rgba(0,127,0, 255)"
    context.fill()
    context.closePath()

    context.beginPath()
    context.arc(140, 140 , 45, 0, Math.PI * 2)
    context.fillStyle = "rgba(0,255,0, 255)"
    context.fill()
}
