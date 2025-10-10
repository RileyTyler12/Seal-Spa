"use strict";
/*
Written by Riley Tyler
Contains functions that will animate document elements
*/

//Test animation
function testAnim(element) {
  let timer = null;
  let pos = 0;
  clearInterval(timer);
  timer = setInterval(timerFrame, 5);
  function timerFrame() {
        if (pos === 350) {
            clearInterval(timer);
        } 
        else {
            pos++;
            element.style.right = pos + 'px';
        }
    }
}

//a bounce-like animation where the element goes down then back up
function bounceAnim(element, extent, speed) {
    let pos = 0;
    let reset = false;
    requestAnimationFrame(timerFrame);
    function timerFrame() {
        if (pos <= -1) {
            element.style.top = '0px';
        } 
        else {
            if (pos >= extent || reset === true){
                pos -= speed;
                element.style.top = pos + 'px';
                if (!reset) {
                    reset = true;
                }
                requestAnimationFrame(timerFrame);
            }
            else {
                pos += speed;
                element.style.top = pos + 'px';
                requestAnimationFrame(timerFrame);
            }
        }
    }
}

//a bounce-like animation where the element goes left then back to original position
function bounceLeftAnim(element, extent, speed) {
    let pos = 0;
    let reset = false;
    requestAnimationFrame(timerFrame);
    function timerFrame() {
        if (pos <= -1) {
            element.style.left = '0px';
        } 
        else {
            if (pos >= extent || reset === true){
                pos -= speed;
                element.style.left = pos + 'px';
                if (!reset) {
                    reset = true;
                }
                requestAnimationFrame(timerFrame);
            }
            else {
                pos += speed;
                element.style.left = pos + 'px';
                requestAnimationFrame(timerFrame);
            }
        }
    }
}
