"use strict";
/*
Written by Riley Tyler
*/


//Define Player Class
class Player {
    constructor(name, points) {
        this.name = name;
        this.points = points;
    }
    
    getName() {
        return this.name;
    }
    
    getPoints() {
        return this.points;
    }
    
    addPoints(points) {
        this.points += points;
    }
    removePoints(points) {
        this.points -= points;
    }
}

//FOR NOW, if version of game is different from localStorage or empty, clear local storage, resetting it and setting the new version. (change if this causes problems with other stuff on the site.)
let gameVersion = "0.2 Prototype";
if (localStorage.getItem('SealSpaVersion') === null || localStorage.getItem('SealSpaVersion') !== gameVersion) {
        localStorage.clear();
        localStorage.setItem("SealSpaVersion", gameVersion);
}
    //set version element
document.getElementById("version").innerHTML = gameVersion;

//Create player, get points from localStorage if available
let player;
if (localStorage.getItem('SSpoints') !== null) {
    player = new Player("PlayerName", parseInt(localStorage.getItem('SSpoints')));
}
else {
    player = new Player("PlayerName", 0);
}

//Get main html elements
let mainButton = document.getElementById("mainButton");
let pointsElement = document.getElementById("points");

//Add event listeners
mainButton.addEventListener("click", clickMainButton);

//get shop html elements
        //player upgrades
let shopHandlingUpgradeButton = document.getElementById("shopHandlingUpgradeButton");
let shopHandlingUpgradePriceElement = document.getElementById("shopHandlingUpgradePrice");
        //automations
let shopAssociateButton = document.getElementById("shopAssociateButton");
let shopAssociatePriceElement = document.getElementById("shopAssociatePrice");
let shopEstheticianButton = document.getElementById("shopEstheticianButton");
let shopEstheticianPriceElement = document.getElementById("shopEstheticianPrice");
let shopExpansionButton = document.getElementById("shopExpansionButton");
let shopExpansionPriceElement = document.getElementById("shopExpansionPrice");

//Create shop variables
    //Associates
let shopAssociates = 0;
if (localStorage.getItem('SSassociates') !== null) {
    shopAssociates = parseInt(localStorage.getItem('SSassociates'));
}
let shopAssociateModifier = 1;
let shopAssociatePrice = 100;
if (shopAssociates > 0) {
    shopAssociatePrice += shopAssociates * 25;
    updateAssociatesPriceDisplay();
}
    //Estheticians
let shopEstheticians = 0;
if (localStorage.getItem('SSestheticians') !== null) {
    shopEstheticians = parseInt(localStorage.getItem('SSestheticians'));
}
let shopEstheticianModifier = 10;
let shopEstheticianPrice = 500;
if (shopEstheticians > 0) {
    shopEstheticianPrice += shopEstheticians * 100;
    updateEstheticiansPriceDisplay();
}
    //Additional Expansions
let shopExpansions = 0;
if (localStorage.getItem('SSexpansions') !== null) {
    shopExpansions = parseInt(localStorage.getItem('SSexpansions'));
}
let shopExpansionModifier = 50;
let shopExpansionPrice = 1000;
if (shopExpansions > 0) {
    shopExpansionPrice += shopExpansions * 1000;
    updateExpansionsPriceDisplay();
}
    //Player Handling Upgrade
let shopHandling = 0;
if (localStorage.getItem('SShandling') !== null) {
    shopHandling = parseInt(localStorage.getItem('SShandling'));
}
let shopHandlingModifier = 2;
let shopHandlingPrice = 50;
if (shopHandling > 0) {
    shopHandlingPrice += shopHandling * 50;
    updateHandlingPriceDisplay();
}

//Add shop button event listeners from html
shopAssociateButton.addEventListener("click", function() {
    purchaseItem("Associate");
});
shopEstheticianButton.addEventListener("click", function() {
    purchaseItem("Esthetician");
});
shopExpansionButton.addEventListener("click", function() {
    purchaseItem("Expansion");
});
shopHandlingUpgradeButton.addEventListener("click", function() {
    purchaseItem("handling");
});

//now call display functions to initalize elements
updatePointsDisplay();
updateAssociatesDisplay();
updateEstheticiansDisplay();
updateExpansionsDisplay();
updateHandlingUpgradeDisplay();
updateInventoryDisplay();

//create interval to update every second
window.setInterval(update, 1000);

//Main Functions
function clickMainButton() {
    //Calulate points to add (only 1 if no upgrades)
    let pointsToAdd = 1;
    if (shopHandling > 0) {
        pointsToAdd += shopHandling * shopHandlingModifier;
    }
    //add points to player
    player.addPoints(pointsToAdd);
    //call updatePointsDisplay
    updatePointsDisplay();

    //create and play seal audio sound
    let audioElement = document.createElement("audio");
    let audioSourceElement = document.createElement("source");
    audioElement.appendChild(audioSourceElement);
    audioSourceElement.src = "audio/sealbark1.mp3";
    audioElement.play();
}

//update function that is called every second (this mostly handles automations and tick updates)
function update() {
    //Associates
    if (shopAssociates > 0) {
        let pointsToAdd = shopAssociates * shopAssociateModifier;
        player.addPoints(pointsToAdd);
    }
    //Estheticians
    if (shopEstheticians > 0) {
        let pointsToAdd = shopEstheticians * shopEstheticianModifier;
        player.addPoints(pointsToAdd);
    }
    //Expansions
    if (shopExpansions > 0) {
        let pointsToAdd = shopExpansions * shopExpansionModifier;
        player.addPoints(pointsToAdd);
    }
    updatePointsDisplay();
    saveToLocalStorage();
}

//Element content update functions
function updatePointsDisplay() {
    pointsElement.innerHTML = player.getPoints() + "💲";
    //also update page title to display this.
    let titleElement = document.getElementById("pageTitle");
    titleElement.innerHTML = "🦭Seal Spa | " + player.getPoints() + "💲";
}
    //Player Upgrades
function updateHandlingUpgradeDisplay() {
    shopHandlingUpgradeButton.innerHTML = "Increase Spa Handling Skill";
}
    //Automations
function updateAssociatesDisplay() {
    shopAssociateButton.innerHTML = "Associates: 🐕 (" + shopAssociates + ")";
}
function updateEstheticiansDisplay() {
    shopEstheticianButton.innerHTML = "Estheticians: 🐈‍⬛ (" + shopEstheticians + ")";
}
function updateExpansionsDisplay() {
    shopExpansionButton.innerHTML = "Additional Expansions: 🏠 (" + shopExpansions + ")";
}
//Prices
function updateAssociatesPriceDisplay() {
    shopAssociatePriceElement.innerHTML = "Cost: " + shopAssociatePrice + "💲 | +" + (shopAssociates * shopAssociateModifier) + " bucks per second";
}
function updateEstheticiansPriceDisplay() {
    shopEstheticianPriceElement.innerHTML = "Cost: " + shopEstheticianPrice + "💲 | +" + (shopEstheticians * shopEstheticianModifier) + " bucks per second";
}
function updateExpansionsPriceDisplay() {
    shopExpansionPriceElement.innerHTML = "Cost: " + shopExpansionPrice + "💲 | +" + (shopExpansions * shopExpansionModifier) + " bucks per second";
}
function updateHandlingPriceDisplay() {
    shopHandlingUpgradePriceElement.innerHTML = "Cost: " + shopHandlingPrice + "💲 | Level " + shopHandling + ": +" + (shopHandling * shopHandlingModifier) + " buck per click";
}
    //Inventory (currently displays as emojis)
function updateInventoryDisplay() {
    let inventoryElement = document.getElementById("inventory");
    let inventoryHTML = "";
    if (shopAssociates !== 0 || shopEstheticians !== 0 || shopExpansions !== 0) {
        //add shopAssociates
        for (let i = 0; i < shopAssociates; i++) {
            inventoryHTML += "🐕";
        }
        //add Estheticians
        for (let i = 0; i < shopEstheticians; i++) {
            inventoryHTML += "🐈‍⬛";
        }
        //add Expansions
        for (let i = 0; i < shopExpansions; i++) {
            inventoryHTML += "🏠";
        }
    }
    else {
        inventoryHTML = "Nothing here yet...";
    }
    inventoryElement.innerHTML = inventoryHTML;
}

//Save function (saves to local storage)
function saveToLocalStorage() {
    //save automations
    localStorage.setItem("SSpoints", player.getPoints());
    localStorage.setItem("SSassociates", shopAssociates);
    localStorage.setItem("SSestheticians", shopEstheticians);
    localStorage.setItem("SSexpansions", shopExpansions);
    //save player upgrades
    localStorage.setItem("SShandling", shopHandling);
    console.log("Game Saved.");
}

//Purchase function (switch statement that chooses which item to purchase)
function purchaseItem(item) {
    switch(item) {
        //Player Upgrades
        case "handling":
            if (player.points >= shopHandlingPrice){
                shopHandling++;
                player.removePoints(shopHandlingPrice);
                updateHandlingUpgradeDisplay();
                updatePointsDisplay();
                //refresh inventory display
                updateInventoryDisplay();
                //update price too
                shopHandlingPrice = 50 + (shopHandling * 50);
                updateHandlingPriceDisplay();
                //save and finish
                saveToLocalStorage();
                console.log("Purchased Handling Upgrade.");
            }
            break;
        //Automations
        case "Associate":
            if (player.points >= shopAssociatePrice){
                shopAssociates++;
                player.removePoints(shopAssociatePrice);
                updateAssociatesDisplay();
                updatePointsDisplay();
                //refresh inventory display
                updateInventoryDisplay();
                //update price too
                shopAssociatePrice = 100 + (shopAssociates * 25);
                updateAssociatesPriceDisplay();
                //save and finish
                saveToLocalStorage();
                console.log("Purchased Associate.");
            }
            break;
        case "Esthetician":
            if (player.points >= shopEstheticianPrice){
                shopEstheticians++;
                player.removePoints(shopEstheticianPrice);
                updateEstheticiansDisplay();
                updatePointsDisplay();
                //refresh inventory display
                updateInventoryDisplay();
                //update price too
                shopEstheticianPrice = 500 + (shopEstheticians * 100);
                updateEstheticiansPriceDisplay();
                //save and finish
                saveToLocalStorage();
                console.log("Purchased Esthetician.");
            }
            break;
        case "Expansion":
            if (player.points >= shopExpansionPrice){
                shopExpansions++;
                player.removePoints(shopExpansionPrice);
                updateExpansionsDisplay();
                updatePointsDisplay();
                //refresh inventory display
                updateInventoryDisplay();
                //update price too
                shopExpansionPrice = 1000 + (shopExpansions * 1000);
                updateExpansionsPriceDisplay();
                //save and finish
                saveToLocalStorage();
                console.log("Purchased Expansion.");
            }
            break;
        default:
            break;
    }
}
