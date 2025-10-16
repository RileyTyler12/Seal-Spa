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
function bounceAnim(element) {
   //add the anim class
   element.classList.add("bounce-anim");

   //remove the class after the animation finishes
   element.addEventListener('animationend', () => {
    element.classList.remove("bounce-anim");
   });
}

function bounceAltAnim(element, extent, speed) {
    let pos = 0;
    let reset = false;
    requestAnimationFrame(timerFrame);
    function timerFrame() {
        if (pos <= -1) {
            element.style.top = '0em';
        } 
        else {
            if (pos >= extent || reset === true){
                pos -= speed;
                element.style.top = pos + 'em';
                if (!reset) {
                    reset = true;
                }
                requestAnimationFrame(timerFrame);
            }
            else {
                pos += speed;
                element.style.top = pos + 'em';
                requestAnimationFrame(timerFrame);
            }
        }
    }
}

function bounceAnim2(element, extent, speed) {
    let pos = 0;
    let reset = false;
    requestAnimationFrame(timerFrame);
    function timerFrame() {
        if (pos >= 1) {
            element.style.top = '0em';
        } 
        else {
            if (-(pos) >= extent || reset === true){
                pos += speed;
                element.style.top = pos + 'em';
                if (!reset) {
                    reset = true;
                }
                requestAnimationFrame(timerFrame);
            }
            else {
                pos -= speed;
                element.style.top = pos + 'em';
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
            element.style.left = '0em';
        } 
        else {
            if (pos >= extent || reset === true){
                pos -= speed;
                element.style.left = pos + 'em';
                if (!reset) {
                    reset = true;
                }
                requestAnimationFrame(timerFrame);
            }
            else {
                pos += speed;
                element.style.left = pos + 'em';
                requestAnimationFrame(timerFrame);
            }
        }
    }
}

//a bounce-like animation to the right
function bounceRightAnim(element) {
    //add the anim class
    element.classList.add("bounce-right-anim");

    //remove the class after the animation finishes
    element.addEventListener('animationend', () => {
    element.classList.remove("bounce-right-anim");
   });
}

//a left to right css anim call function
function leftRightAnim(element) {
    //add the anim class
    element.classList.add("left-right-anim");

    //remove the class after the animation finishes
    element.addEventListener('animationend', () => {
    element.classList.remove("left-right-anim");
   });
}