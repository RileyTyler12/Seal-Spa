"use strict";
/*
Written by Riley Tyler
*/

//Random Events System Configuration
let randomEvents = {
    //Event types and their configuration
    luckyCustomer: {
        name: "🎁 Lucky Customer",
        description: "A customer leaves a generous tip!",
        probability: 0.006, //0.6% chance per tick
        effect: function(player) {
            let bonus = Math.floor(player.getPoints() * 0.08 + 10);
            player.addPoints(bonus);
            return `+${bonus}💲`;
        },
    },
    newTechnique: {
        name: "💆✨ New Technique",
        description: "You discover a new spa technique!",
        probability: 0.0055, //0.55% chance per tick
        effect: function(player) {
            let bonus = Math.floor(player.getPoints() * 0.07 + 8);
            player.addPoints(bonus);
            return `+${bonus}💲`;
        },
    },
    associateSurprise: {
        name: "🐧 Associate Surprise",
        description: "An associate brings in extra tips!",
        probability: 0.0045, //0.45% chance per tick
        effect: function(player) {
            let bonus = Math.floor(player.getPoints() * 0.06 + 15);
            player.addPoints(bonus);
            return `+${bonus}💲`;
        },
    },
    sealBirthdayParty: {
        name: "🎂 Seal Birthday Party",
        description: "A customer's birthday celebration!",
        probability: 0.0055, //0.55% chance per tick
        effect: function(player) {
            let bonus = Math.floor(player.getPoints() * 0.08 + 20);
            player.addPoints(bonus);
            return `+${bonus}💲`;
        },
    },
    seafoodDelivery: {
        name: "🍣 Seafood Delivery",
        description: "Fresh supplies arrive with bonus payment!",
        probability: 0.008, //0.8% chance per tick
        effect: function(player) {
            let bonus = Math.floor(player.getPoints() * 0.1 + 18);
            player.addPoints(bonus);
            return `+${bonus}💲`;
        },
    },
    spaLoyaltyProgram: {
        name: "⭐ Spa Loyalty Program",
        description: "Returning customers bring steady income!",
        probability: 0.009, //0.9% chance per tick (common)
        effect: function(player) {
            let bonus = Math.floor(player.getPoints() * 0.04 + 3);
            player.addPoints(bonus);
            return `+${bonus}💲`;
        },
    },
    sealTrainingDay: {
        name: "🎓 Seal Training Day",
        description: "Associates improve skills for efficiency!",
        probability: 0.004, //0.4% chance per tick
        effect: function(player) {
            let bonus = Math.floor(player.getPoints() * 0.07 + 12);
            player.addPoints(bonus);
            return `+${bonus}💲`;
        },
    },
    oceanStormWarning: {
        name: "🌊 Ocean Storm Warning",
        description: "Weather affects business operations!",
        probability: 0.003, //0.3% chance per tick (penalty)
        effect: function(player) {
            let penalty = Math.floor(player.getPoints() * 0.02 - 3);
            if (penalty > 0) {
                player.removePoints(penalty);
                return `-${penalty}💲`;
            }
            return "";
        },
    },
    oceanBlessing: {
        name: "🌊 Ocean Blessing",
        description: "A calming wave grants bonus points!",
        probability: 0.005, //0.5% chance per tick
        effect: function(player) {
            let bonus = Math.floor(player.getPoints() * 0.1 + 25);
            player.addPoints(bonus);
            return `+${bonus}💲`;
        },
    },
    grandOpening: {
        name: "🎉 Grand Opening",
        description: "Special event! Massive bonus!",
        probability: 0.002, //0.2% chance per tick (rare)
        effect: function(player) {
            let bonus = Math.floor(player.getPoints() * 0.15 + 80);
            player.addPoints(bonus);
            return `+${bonus}💲`;
        },
    },
    equipmentBreakdown: {
        name: "⚠️ Equipment Breakdown",
        description: "Something's not working right...",
        probability: 0.004, //0.4% chance per tick (penalty)
        effect: function(player) {
            let penalty = Math.floor(player.getPoints() * 0.03 - 5);
            if (penalty > 0) {
                player.removePoints(penalty);
                return `-${penalty}💲`;
            }
            return "";
        },
    }
};

//Theme Switching Functionality
function toggleTheme() {
    var currentTheme = document.documentElement.getAttribute("data-theme");
    var newTheme;
    
    if (currentTheme === "ocean") {
        newTheme = "cute";
    } else if (currentTheme === "cute") {
        newTheme = "sunset";
    } else if (currentTheme === "sunset") {
        newTheme = "midnight";
    } else {
        newTheme = "ocean";
    }
    
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("SealSpaTheme", newTheme);
    
    //Update button text based on current theme
    var toggleBtn = document.getElementById("themeToggleBtn");
    if (newTheme === "ocean") {
        toggleBtn.textContent = "🌊 Ocean";
    } else if (newTheme === "cute") {
        toggleBtn.textContent = "🎀 Cute";
    } else if (newTheme === "sunset") {
        toggleBtn.textContent = "🌅 Sunset";
    } else {
        toggleBtn.textContent = "🌑 Midnight";
    }
}

//Initialize theme from localStorage on page load
window.addEventListener("DOMContentLoaded", function() {
    var savedTheme = localStorage.getItem("SealSpaTheme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
        var toggleBtn = document.getElementById("themeToggleBtn");
        if (savedTheme === "ocean") {
            toggleBtn.textContent = "🌊 Ocean";
        } else if (savedTheme === "cute") {
            toggleBtn.textContent = "🎀 Cute";
        } else if (savedTheme === "sunset") {
            toggleBtn.textContent = "🌅 Sunset";
        } else {
            toggleBtn.textContent = "🌑 Midnight";
        }
    }
});

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
let gameVersion = "0.7.1";
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
let shopElectroTherapistButton = document.getElementById("shopElectroTherapistButton");
let shopElectroTherapistPriceElement = document.getElementById("shopElectroTherapistPrice");
let shopEstheticianButton = document.getElementById("shopEstheticianButton");
let shopEstheticianPriceElement = document.getElementById("shopEstheticianPrice");
let shopExpansionButton = document.getElementById("shopExpansionButton");
let shopExpansionPriceElement = document.getElementById("shopExpansionPrice");

//Create and set up/initialize shop variables
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
    //Electro Therapists
let shopElectroTherapists = 0;
if (localStorage.getItem('SSelectrotherapists') !== null) {
    shopElectroTherapists = parseInt(localStorage.getItem('SSelectrotherapists'));
}
let shopElectroTherapistModifier = 5;
let shopElectroTherapistPrice = 350;
if (shopElectroTherapists > 0) {
    shopElectroTherapistPrice += shopElectroTherapists * 50;
    updateElectroTherapistsPriceDisplay();
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
shopElectroTherapistButton.addEventListener("click", function() {
    purchaseItem("Electro Therapist");
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

//Random Events System Variables
let eventHistory = []; //track recent events for display

//Create and setup seal character shop options/variables
let sealOptions = ["Baby Ronan", "Miss Bella", "Brutus Sealman", "Ponsuke"];
let sealImages = ["images/Spa_Seal1.png", "images/placeholder/seal-placeholder2.jpg", "images/placeholder/seal-placeholder1.jpg", "https://i.redd.it/ponsuke-has-passed-away-v0-7x77m8s8twxa1.jpg?width=1170&format=pjpg&auto=webp&s=ebb69fbca4d13272aa2ba744ae81ea3caa956d90"]; // associative array to sealOptions
let sealAltImages = ["images/Spa_Seal1_Alt.png", "images/placeholder/seal-placeholder2.jpg", "images/placeholder/seal-placeholder1.jpg", "https://i.redd.it/ponsuke-has-passed-away-v0-74e359s8twxa1.jpg?width=1170&format=pjpg&auto=webp&s=ca2b48bd706480fc4018a6c00515ba06b09a4885"]; // associative array to sealOptions
let sealSounds = ["audio/sealbark1.mp3", "audio/sealbark1.mp3", "audio/sealbark1.mp3", "audio/sealbark1.mp3"]; // associative array to sealOptions
let sealPrices = [0, 1000, 2000, 100]; // associative array to sealOptions
let unlockedSeals = [true, false, false, false]; // associative array to sealOptions
let sealAltImageActive = false;
if (localStorage.getItem('SSunlockedSeals') !== null) {
    unlockedSeals = JSON.parse(localStorage.getItem('SSunlockedSeals'));
}
let currentSealIndex = 0;
if (localStorage.getItem('SScurrentSeal') !== null) {
    currentSealIndex = parseInt(localStorage.getItem('SScurrentSeal'))
}
let sealNameElement = document.getElementById("sealName");
let sealButtonImageElement = document.getElementById("sealButtonImage")
sealNameElement.textContent = sealOptions[currentSealIndex];
sealButtonImageElement.src = sealImages[currentSealIndex];

//now call display functions to initalize elements
updatePointsDisplay();
updateAssociatesDisplay();
updateElectroTherapistsDisplay();
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

    //call activateClickedSealImage
    if (sealAltImageActive === false) {
        activateClickedSealImage(true);
        sealAltImageActive = true;
    }

    //create and play seal audio sound
    if (document.getElementById("sealAudio")) { // remove old audio if valid just in case
        document.getElementById("sealAudio").remove();
        console.log("removed oldAudio");
    }
    let audioElement = document.createElement("audio");
    audioElement.id = "sealAudio";
    audioElement.volume = 0.2;
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
    //Electro Therapists
    if (shopElectroTherapists > 0) {
        let pointsToAdd = shopElectroTherapists * shopElectroTherapistModifier;
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

    //Random Events System - Check for events each tick
    checkRandomEvents();

    updatePointsDisplay();
    saveToLocalStorage();
}

//Random Events System - Main function to check and trigger events
function checkRandomEvents() {
    //Check each event type against its probability
    let eventKeys = Object.keys(randomEvents);
    
    for (let i = 0; i < eventKeys.length; i++) {
        let eventName = eventKeys[i];
        let eventConfig = randomEvents[eventName];
        
        //Generate random number between 0 and 1
        let randomValue = Math.random();
        
        //Check if probability threshold is met
        if (randomValue < eventConfig.probability) {
            //Trigger the event
            triggerEvent(eventName);
        }
    }
}

//Function to handle individual event triggers
function triggerEvent(eventName) {
    let eventConfig = randomEvents[eventName];
    
    //Get the event effect result
    let effectResult = eventConfig.effect(player);
    
    //Log the event
    console.log(`Random Event Triggered: ${eventConfig.name} - ${eventConfig.description}`);
    
    //Add to event history for display
    addToEventHistory(eventName, eventConfig, effectResult);
    
    //Update points display to show the event bonus
    updatePointsDisplay();
    
    //Save event history to localStorage (optional)
    saveEventHistory();
    
    //Show the floating notification in the DOM
    showEventNotification(eventName, eventConfig, effectResult);
}

//Function to add event to history and create floating notification
function addToEventHistory(eventName, eventConfig, effectResult) {
    let timestamp = Date.now();
    eventHistory.push({
        name: eventConfig.name,
        description: eventConfig.description,
        effect: effectResult,
        timestamp: timestamp
    });
    
    //Limit history to last 10 events
    if (eventHistory.length > 10) {
        eventHistory.shift();
    }
}

//Function to create and display a floating event notification in the DOM
function showEventNotification(eventName, eventConfig, effectResult) {
    let container = document.getElementById("eventNotificationContainer");
    
    //Determine notification type based on event
    let notificationType = "positive";
    if (eventName === "equipmentBreakdown" || eventName === "oceanStormWarning") {
        notificationType = "negative";
    } else if (eventName === "oceanBlessing" || eventName === "grandOpening") {
        notificationType = "neutral";
    }
    
    //Create notification element
    let notification = document.createElement("div");
    notification.className = `eventNotification ${notificationType}`;
    
    //Add event icon and text
    let iconSpan = document.createElement("span");
    iconSpan.className = "eventIcon";
    iconSpan.textContent = eventConfig.name.charAt(0); //Get the emoji from the name
    
    let textSpan = document.createElement("div");
    textSpan.className = "eventText";
    textSpan.innerHTML = `${eventConfig.name} - ${eventConfig.description}`;
    
    let descSpan = document.createElement("div");
    descSpan.className = "eventDescription";
    descSpan.textContent = effectResult || "";
    
    //Add elements to notification
    notification.appendChild(iconSpan);
    notification.appendChild(textSpan);
    notification.appendChild(descSpan);
    
    //Append to container
    if (container) {
        container.appendChild(notification);
        
        //Remove notification after animation completes
        setTimeout(function() {
            notification.classList.add("removing");
            setTimeout(function() {
                notification.remove();
            }, 500);
        }, 3000); //Keep visible for 3 seconds before removing
    }
}

//Save event history to localStorage
function saveEventHistory() {
    localStorage.setItem("SSeventHistory", JSON.stringify(eventHistory));
}

//Load event history from localStorage on page load
window.addEventListener("DOMContentLoaded", function() {
    var savedHistory = localStorage.getItem("SSeventHistory");
    if (savedHistory) {
        eventHistory = JSON.parse(savedHistory);
    }
});

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
    shopAssociateButton.innerHTML = "Associates: 🐧 (" + shopAssociates + ")";
}
function updateElectroTherapistsDisplay() {
    shopElectroTherapistButton.innerHTML = "Electro Therapists: 🪼 (" + shopElectroTherapists + ")";
}
function updateEstheticiansDisplay() {
    shopEstheticianButton.innerHTML = "Estheticians: 🐙 (" + shopEstheticians + ")";
}
function updateExpansionsDisplay() {
    shopExpansionButton.innerHTML = "Additional Expansions: 🛖 (" + shopExpansions + ")";
}
    //Prices
function updateAssociatesPriceDisplay() {
    shopAssociatePriceElement.innerHTML = "Cost: " + shopAssociatePrice + "💲 | +" + (shopAssociates * shopAssociateModifier) + " bucks per second";
}
function updateElectroTherapistsPriceDisplay() {
    shopElectroTherapistPriceElement.innerHTML = "Cost: " + shopElectroTherapistPrice + "💲 | +" + (shopElectroTherapists * shopElectroTherapistModifier) + " bucks per second";
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
    if (shopAssociates !== 0 || shopElectroTherapists !== 0 || shopEstheticians !== 0 || shopExpansions !== 0) {
        //add shopAssociates
        for (let i = 0; i < shopAssociates; i++) {
            inventoryHTML += "🐧";
        }
        //add Electro Therapists
        for (let i = 0; i < shopElectroTherapists; i++) {
            inventoryHTML += "🪼";
        }
        //add Estheticians
        for (let i = 0; i < shopEstheticians; i++) {
            inventoryHTML += "🐙";
        }
        //add Expansions
        for (let i = 0; i < shopExpansions; i++) {
            inventoryHTML += "🛖";
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
            sealButton.addEventListener("mouseover", (event) => {
                const element = event.currentTarget;
                bounceAnim(element);
            });
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
    localStorage.setItem("SSelectrotherapists", shopElectroTherapists);
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
        case "Electro Therapist":
            if (player.points >= shopElectroTherapistPrice){
                shopElectroTherapists++;
                player.removePoints(shopElectroTherapistPrice);
                updateElectroTherapistsDisplay();
                updatePointsDisplay();
                //refresh inventory display
                updateInventoryDisplay();
                //update price too
                shopElectroTherapistPrice = 350 + (shopElectroTherapists * 50);
                updateElectroTherapistsPriceDisplay();
                //save and finish
                saveToLocalStorage();
                console.log("Purchased Electro Therapist.");
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
    sealNameElement.textContent = sealOptions[currentSealIndex];
    sealButtonImageElement.src = sealImages[currentSealIndex];
    sealButtonImageElement.scrollIntoView({behavior: 'smooth'});
}

//Activate Clicked Seal Image function
function activateClickedSealImage(bool) {
    if (bool === true) {
        sealButtonImageElement.src = sealAltImages[currentSealIndex];
        setTimeout(function(){
            activateClickedSealImage(false);
        }, 2000);
    }
    else {
        sealButtonImageElement.src = sealImages[currentSealIndex];
        sealAltImageActive = false;
    }
}