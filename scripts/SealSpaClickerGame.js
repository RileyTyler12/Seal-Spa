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
let gameVersion = "0.5 Prototype";
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

//Create and set up shop variables
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

//Create and setup seal character shop options/variables
let sealOptions = ["Default", "Brutus Sealman", "Gwen Sealster"];
let sealImages = ["images/sealart1.jpg", "images/placeholder/seal-placeholder1.jpg", "images/placeholder/seal-placeholder2.jpg"]; // associative array to sealOptions
let sealSounds = ["audio/sealbark1.mp3", "audio/sealbark1.mp3", "audio/sealbark1.mp3"]; // associative array to sealOptions
let sealPrices = [0, 100, 200]; // associative array to sealOptions
let unlockedSeals = [true, false, false]; // associative array to sealOptions
if (localStorage.getItem('SSunlockedSeals') !== null) {
    unlockedSeals = JSON.parse(localStorage.getItem('SSunlockedSeals'));
}
let currentSealIndex = 0;
if (localStorage.getItem('SScurrentSeal') !== null) {
    currentSealIndex = parseInt(localStorage.getItem('SScurrentSeal'))
}
document.getElementById("sealName").textContent = sealOptions[currentSealIndex];
document.getElementById("sealButtonImage").src = sealImages[currentSealIndex];

//now call display functions to initalize elements
updatePointsDisplay();
updateAssociatesDisplay();
updateEstheticiansDisplay();
updateExpansionsDisplay();
updateHandlingUpgradeDisplay();
updateInventoryDisplay();
updateSealCharactersDisplay();

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
    if (document.getElementById("sealAudio")) { // remove old audio if valid just in case
        document.getElementById("sealAudio").remove();
        console.log("removed oldAudio");
    }
    let audioElement = document.createElement("audio");
    audioElement.id = "sealAudio";
    let audioSourceElement = document.createElement("source");
    audioSourceElement.src = sealSounds[currentSealIndex];
    audioElement.appendChild(audioSourceElement);
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
    //Seal Character Options Display
    function updateSealCharactersDisplay() {
        let sealShopContainer = document.getElementById("sealShopContainer");
        sealShopContainer.replaceChildren(); //clear shop elements
        //Initialize Seal Character Shop Buttons
        for (let i = 0; i < sealOptions.length; i++) {
            let sealButton = document.createElement("button");
            let sealName = sealOptions[i];
            let sealImage = document.createElement("img");
            sealImage.src = sealImages[i];
            let sealPrice = document.createElement("p");
            sealPrice.textContent = sealPrices[i] + " 💲";
            if (unlockedSeals[i] === true) {
                sealPrice.textContent = "Unlocked";
            }
            sealButton.className = "sealSelectionButton";
            sealButton.id = "seal" + i;
            sealButton.textContent = sealName;
            sealButton.appendChild(sealImage);
            sealButton.appendChild(sealPrice);
            sealButton.addEventListener("click", (event) => {
                const element = event.currentTarget;
                selectSeal(element);
            });
            sealShopContainer.appendChild(sealButton);
        }
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
    //save current seal and seal unlocks
    localStorage.setItem("SSunlockedSeals", JSON.stringify(unlockedSeals));
    localStorage.setItem("SScurrentSeal", currentSealIndex);
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

// Unlock/Purchase/Selecte Seal Function
function selectSeal(element) {
    let elementID = element.id;
    let sealIndex = elementID.replace("seal", "");
    // Check if seal is unlocked, if not attempt to purchase
    if (unlockedSeals[sealIndex] === true) {
        currentSealIndex = sealIndex;
    }
    else {
        if (player.points >= sealPrices[sealIndex]) {
            player.removePoints(sealPrices[sealIndex]);
            updatePointsDisplay();
            //update unlockedSeals
            unlockedSeals[sealIndex] = true;
            //set CurrentSealIndex
            currentSealIndex = sealIndex;
            //update display (such as setting price to unlocked)
            updateSealCharactersDisplay();
            //save and finish
            saveToLocalStorage();
            console.log("Seal Unlocked.");
        }
    }
    // update main button seal selected seal name and image
    document.getElementById("sealName").textContent = sealOptions[currentSealIndex];
    document.getElementById("sealButtonImage").src = sealImages[currentSealIndex];
}
