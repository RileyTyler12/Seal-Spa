"use strict";
/*
Written by Riley Tyler
Contains functions that will handle animating document elements
*/

//a bounce-like animation where the element goes down then back up
function bounceAnim(element) {
   //add the anim class
   element.classList.add("bounce-anim");

   //remove the class after the animation finishes
   element.addEventListener('animationend', () => {
    element.classList.remove("bounce-anim");
   });
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