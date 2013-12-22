/*-----------------------
INDEX
1.  Variables
    a) Variables
    b) Arrays
    c) Booleans
    d) Set starting items

2.  Onload Listener

3.  Submit Listener

4.  Objects
    a) Define Objects
    b) Instantiate Objects

5.  Functions
-----------------------*/


/*-----------------------
1. Variables
-----------------------*/
// a) Variables
var command;
var commandVerb;
var commandPostVerb;
var moveMessage;
var actionMessage;
var feedbackMessage;
var additionalMessage;
var dataMessage;
var loadData;
var currentRoom = 1;

var lockString;
var allLockString = "";
var visibleItemsString;
var allVisibleItemsString = "";

// b) Arrays
var room = new Array();
var inventory = new Array();
var visibleItems = new Array();
var visibleItems2 = new Array();
var roomObjects = new Array();
var roomExits = new Array();
var roomDirections = new Array("north", "east", "south", "west");
var availableDirections = new Array();
var preTotal = new Array();
var total = new Array();
var roomLocked = new Array();

// c) Booleans
var inventoryFull = false;

// d) Set starting items
inventory[0] = "watch";
inventory[1] = "potato";

// e) Strings
var descriptionVeranda = 'As you stand on the veranda you wonder how you let yourself get talked into this. You rub your fingers over the embossed card once more “Congratulations! You have won a weekend of relaxation and MAGIC!” Magic? Lame. But work has been a drag and your friends convinced you. I mean, who can afford a weekend in a chateau anyway? Casually you check the time, the weekend has officially begun! Neat, the entrance to this chateau is exactly due north. You make a mental note to thank your mum for the snazzy watch with an inbuilt compass. WHO IS LAUGHING NOW PHILLIP??!!';
var descriptionHallway = 'In the hallway you see a small table with a note that reads "Welcome! Please help yourself to a refreshing beverage while you explore your new home for the next few days. The keys to the chateau have been laid out for you. May everything go as planned." Huh, that was ominous. You ponder the meanings of that as you sip your water and familiarize yourself with your surroundings. There is a doorway to the east and another to the west.';
var descriptionLibrary = 'You enter the library and immediately notice an inordinate amount of paintings on the walls, mostly of well dressed posh dudes. Why do these old paintings always feel like they are watching you? You keep poking around and see a well worn chesterfield position in front of a fireplace. You decide that will be your place of napping this weekend. There is also a fireplace poker lying across the mantle and a bell, book, and candle on the table.';
var descriptionDining = 'You are in the dining room. There are exits to the North, South, and East. The table has been set up with a service for 12. You notice the dishes are rather dusty. Very weird. As you go to touch one, it feels as though your hand is falling through the table. Maybe you should get out of this room, it is giving you the creeps. You see a fancy Zippo lighter on the sideboard';
var descriptionKitchen = 'You enter the kitchen and see bowls of fruit and snacks all over the place. You grab an apple and start to eat it as you inspect the other parts of the kitchen. There is a really weird feature where the walls seem to be melting. What the fuck? You decide maybe you don’t want to stay here anymore. Hastily you take note of doors to the north and south. There is a kettle on the stove, as well as some kerosene lanterns hanging on the wall.';
var descriptionBathroom = 'You head north into the bathroom. It is a small room with just a toilet and a sink with a single exit to the south. You take a moment to splash some water on your face and compose yourself. Suddenly a nice gentleman looking at you through the mirror reminds you that the towels are on the rack behind you. Since when did reflections talk back? ';
var descriptionParlor = 'You enter the parlor and there is but a single Queen Ann chair sitting on top of a tiny sheepskin rug. You can see out the window. Your car is visible in the driveway. As you walk around the room,  your footsteps sound like jackhammers on the hardwood floors. Maybe this is not as cool a room as you thought. You also notice there is only a single exit, back the way you came.';


/*-----------------------
2. Onload functions
-----------------------*/
$( document ).ready(function() {
    //map();
    checkVisibleItems();
    showItem();
    showNarrative();
    convertRoomExits();
});


/*-----------------------
3. Submit Listener
-----------------------*/
$( "#commandForm" ).submit(function(event) {
    // Run functions
    commandHandling();
    clearOutputs();
    totalCommands();
    roomMover();    
    negativeFeedback();    
    convertRoomExits();
    showNarrative();
    getItem();
    useItem();
    dropItem();
    checkVisibleItems();
    showItem();
    //map();
    event.preventDefault();
});


$( "#save" ).click(function() {
    saveSession();
    dataMessage = "Game Saved";
    $('#data-output').html(dataMessage);
});

$( "#load" ).click(function() {
    loadSession();
    dataMessage = "Game Loaded";
    $('#data-output').html(dataMessage);
});

$( "#new" ).click(function() {
    // Reset game to factory defaults
    location.reload(true);
    // Save game state
    newSession();
    // Output status
    dataMessage = "New Game";
    $('#data-output').html(dataMessage);
});

/*-----------------------
4. Objects
-----------------------*/
// a) Define Objects
function Room (_roomNumber, _roomName, _roomDescription, _roomExits, _visibleItems, _doorLocked) {
    this.roomNumber = _roomNumber;
    this.roomName = _roomName;
    this.roomDescription = _roomDescription;
    this.roomExits = _roomExits;
    this.visibleItems = _visibleItems;
    this.doorLocked = _doorLocked;
} 


// b) Instantiate Objects (note: roomExits array [0]North, [1]East, [2]South, [3]West)
var room1 = new Room(1, "Veranda", descriptionVeranda, _roomExits = [2, 0, 0, 0], _visibleItems = ["doormat", "firewood"], _doorLocked = [false, false, false, false]);
room[1] = room1;
var room2 = new Room(2, "Hallway", descriptionHallway, _roomExits = [0, 3, 1, 4], _visibleItems = ["keys", "empty glass"], _doorLocked = [false, true, true, false]);
room[2] = room2;
var room3 = new Room(3, "Library", descriptionLibrary, _roomExits = [0, 0, 0, 2], _visibleItems = ["poker", "bell", "book", "candle"], _doorLocked = [false, false, false, false]);
room[3] = room3;
var room4 = new Room(4, "Dining Room", descriptionDining, _roomExits = [5, 2, 7, 0], _visibleItems = ["lighter", "gravy boat", "centerpiece"], _doorLocked = [false, false, true, false]);
room[4] = room4;
var room5 = new Room(5, "Kitchen", descriptionKitchen, _roomExits = [6, 0, 4, 0], _visibleItems = ["kettle", "lantern", "potato"], _doorLocked = [false, false, false, false]);
room[5] = room5;
var room6 = new Room(6, "Bathroom", descriptionBathroom, _roomExits = [0, 0, 5, 0], _visibleItems = ["towel", "soap", "hairbrush"], _doorLocked = [false, false, false, false]);
room[6] = room6;
var room7 = new Room(7, "Parlor", descriptionParlor, _roomExits = [4, 0, 0, 0], _visibleItems = ["rug", "curtains"], _doorLocked = [false, false, false, false]);
room[7] = room7;



/*-----------------------
5. Functions
-----------------------*/
function encodeVisibleItems() {

    for (var i = 1; i < room.length; i++) {
        // Loop through the rooms and make visible items a string
        visibleItemsString = room[i].visibleItems.toString()
        // Add a marker at the end to assist with extraction
        visibleItemsString = visibleItemsString.concat("!");
        // Concatinate them all together for injecting into the DB
        allVisibleItemsString = allVisibleItemsString.concat(visibleItemsString);
    }
}

function decodeVisibleItems() {

    var decodedItems = loadData[0].visible_items.split("!");

     for (var i = 1; i < room.length; i++) {
        var j = (i - 1);
        room[i].visibleItems = decodedItems[j].split(',');    
     }
}

function encodeLocks() {

    for (var i = 1; i < room.length; i++) {
        // Loop through the rooms and make visible items a string
        lockString = room[i].doorLocked.toString()
        // Add a marker at the end to assist with extraction
        lockString = lockString.concat("!");
        // Concatinate them all together for injecting into the DB
        allLockString = allLockString.concat(lockString);
    }
    console.log(allLockString);
}

function decodeLocks() {

    var decodedLocks = loadData[0].door_locks.split("!");

     for (var i = 1; i < room.length; i++) {
        var j = (i - 1);
        room[i].doorLocked = decodedLocks[j].split(',');    
        console.log("Room " + i + " locks: " + room[i].doorLocked);
     }
}




function saveSession() {

    // Convert inventory array to string in prep for sending to DB
    var inventoryString = inventory.toString();

    // Get all visible items from room objects
    encodeVisibleItems();
    // Get status of all door locks from room objects
    encodeLocks();

    $.ajax({
        type: "POST",
        url: "game/p_save",
        data: {currentRoom: currentRoom, inventory: inventoryString, visible_items: allVisibleItemsString, door_locks: allLockString},
        complete: function(data){
                //data contains the response from the php file.
                //u can pass it here to the javascript function
        }
    });
}

function processLoad(data) { 
    loadData = jQuery.parseJSON( data.responseText );

    // Get Current Room
    currentRoom = loadData[0].room_number;
    
    // Get Inventory
    var inventoryString = loadData[0].inventory;
    
    // Update inventory
    inventory = inventoryString.split(',');
    // room[2].doorLocked[1] = loadData[0].lock_bathroom;

    // Complex function to decode visible item string from DB
    decodeVisibleItems();
    // Complex function to decode lock string from DB
    decodeLocks();

    showNarrative();
}

function loadSession() {
    $.ajax({
        type: "POST",
        url: "game/load",
        data: {},
        complete: function(data){
                //data contains the response from the php file.
                //u can pass it here to the javascript function
                
                //console.log(data);
                processLoad(data);
        }
    }); 
}

function newSession() {

    // Convert inventory array to string in prep for sending to DB
    var inventoryString = inventory.toString();

    $.ajax({
        type: "POST",
        url: "game/p_save",
        data: {currentRoom: currentRoom, inventory: inventoryString, lockBathroom: room[2].doorLocked[1]},
        complete: function(data){
                //data contains the response from the php file.
                //u can pass it here to the javascript function
        }
    });
}

function commandHandling() {
    // When the form is submitted, grab the value of the input text and set it to variable 'command'
    command = $('#command').val();
    // Set command to lowercase
    command = command.toLowerCase();
    //split command. Look for GET and do what comes after it
    commandVerb = command.split(" ", 1);
    commandPostVerb = command.substr(command.indexOf(" ") + 1); 
} 

function roomMover() {
    // Note: roomExits array [0]North, [1]East, [2]South, [3]West
    if (commandVerb == "move" || commandVerb == "go") {
        if (commandPostVerb == "north") {
            if (room[currentRoom].roomExits[0] != 0) {
                
                if (room[currentRoom].doorLocked[0] == false) {
                    currentRoom = room[currentRoom].roomExits[0];
                    moveMessage = "You move " + commandPostVerb;
                    $('#move-output').html(moveMessage);
                } else {
                    moveMessage = "The door appears to be locked";
                    
                }
            } 
        } else if (commandPostVerb == "east") {
            if (room[currentRoom].roomExits[1] != 0) {

                if (room[currentRoom].doorLocked[1] == false) {
                    currentRoom = room[currentRoom].roomExits[1];
                    moveMessage = "You move " + commandPostVerb;
                    $('#move-output').html(moveMessage);
                } else {
                    moveMessage = "The door appears to be locked";
                    $('#move-output').html(moveMessage);
                }
            } 
        } else if (commandPostVerb == "south") {
            if (room[currentRoom].roomExits[2] != 0) {
                
                if (room[currentRoom].doorLocked[2] == false) {
                    currentRoom = room[currentRoom].roomExits[2];
                    moveMessage = "You move " + commandPostVerb;
                    $('#move-output').html(moveMessage);
                } else {
                    moveMessage = "The door appears to be locked";
                    $('#move-output').html(moveMessage);
                }
            } 
        } else if (commandPostVerb == "west") {
            if (room[currentRoom].roomExits[3] != 0) {
                
                if (room[currentRoom].doorLocked[3] == false) {
                    currentRoom = room[currentRoom].roomExits[3];
                    moveMessage = "You move " + commandPostVerb;
                    $('#move-output').html(moveMessage);
                } else {
                    moveMessage = "The door appears to be locked";
                    $('#move-output').html(moveMessage);
                }
            } 
        }
    }
}

function checkVisibleItems() {
    visibleItems = room[currentRoom].visibleItems;
    for (i = 0; i < visibleItems.length; i++) {
        for (j = 0; j < inventory.length; j++) {

            // Test visible items agains inventory
            if (visibleItems[i] == inventory[j]) {
                // You already have the item, clear it from the visible item array
                visibleItems.splice(i, 1);
            }
        }
    }
    // Output visible items again, post-filtering    
    $('#visibleItems-output').html(visibleItems.join(', '));  
}

function showItem() {
    $('#inventory-output').html(inventory.join(', '));       
}

function checkInventorySize() {
    if (inventory.length >= 4) {
        inventoryFull = true;
    } else {
        inventoryFull = false;
    }
}

function getItem() {
    // Check inventory size
    checkInventorySize();
    // Show the visible items within each instantiated room object
    visibleItems = room[currentRoom].visibleItems;
    // Only do this stuff if command is preceded by GET
    if ((commandVerb[0] == "get" || commandVerb[0] == "take") && inventoryFull == false) {
        // Check the visible items array by looping through it
        for (var i = 0; i < visibleItems.length; i++) {
            // Make sure our command matches a visible item
            if (commandPostVerb == visibleItems[i]) {
                
                // Add visible item to inventory
                inventory.push(visibleItems[i]);

                // Set a message to assist with narrative
                actionMessage = "You take the " + visibleItems[i] + ". ";
                $('#action-output').html(actionMessage);

                // Remove the added item from the visible item array
                visibleItems.splice(i, 1);
            } 
        }
    } else if ((commandVerb[0] == "get" || commandVerb[0] == "take") && inventoryFull == true) {
        feedbackMessage = "Try as you might, you can't find enough pockets to hold all this loot";
        $('#negativeFeedback-output').html(feedbackMessage);
    }
}

function useItem() {
    if (commandVerb[0] == "use") {
        for (var i = 0; i < inventory.length; i++) {
            if (commandPostVerb == inventory[i]) {
                // Update action message
                actionMessage = "You use the " + inventory[i];
                $('#action-output').html(actionMessage);
                // Reset feedback message
                feedbackMessage = "";
                $('#negativeFeedback-output').html(feedbackMessage);


                // HUGE AMOUNT OF IF STATEMENTS!
                // Use library Key
                if (inventory[i] == "keys" && currentRoom == 2) {
                    // Update Object
                    room[currentRoom].doorLocked[1] = false;

                    // Set action message
                    actionMessage = "You use the " + inventory[i];

                    // Set additional message
                    additionalMessage = "The door swings open and the smell of leather bound books and rich mahogany hits you in the face.";
                    $('#additional-output').html(additionalMessage);
                }
                if (inventory[i] == "keys" && currentRoom == 4) {
                    // Update Object
                    room[currentRoom].doorLocked[2] = false;

                    // Set action message
                    actionMessage = "You use the " + inventory[i];

                    // Set additional message
                    additionalMessage = "You use one of the many keys and finally open the door. You are standing on the threshold of what appears to be the parlor.";
                    $('#additional-output').html(additionalMessage);
                }
            }
        }
    }
    $('#action-output').html(actionMessage);
}

function dropItem() {
    if (commandVerb[0] == "drop" || commandVerb[0] == "discard") {
        for (var i = 0; i < inventory.length; i++) {
            if (commandPostVerb == inventory[i]) {
                // Update action message
                actionMessage = "You drop the " + inventory[i];
                $('#action-output').html(actionMessage);
                // Push item from inventory to room's visible items array
                room[currentRoom].visibleItems.push(inventory[i]);
                // Remove the dropped item from inventory
                inventory.splice(i, 1);
                // Reset feedback message
                feedbackMessage = "";
                $('#negativeFeedback-output').html(feedbackMessage);
                // Check for new inventory size
                checkInventorySize();
            }
        }
    }
}   

function convertRoomExits() {
    // Begin by clearing array
    availableDirections.length = 0;
    // Loop through exits availble to current room object
    for (var i = 0; i < room[currentRoom].roomExits.length; i++) {
        // If roomExit interger isn't 0 (which indicates an unavailable direction)
        if (room[currentRoom].roomExits[i] > 0) {
            // Push the text equivilent (north, east, etc) from roomDirections into availableDirections
            availableDirections.push(roomDirections[i]);
        }
    }
    // Output available directions
    $('#exits-output').html(availableDirections.join(', '));
}

function totalCommands() {
    // Compile all arrays into one for testing
    preTotal = visibleItems.concat(inventory);
    total = preTotal.concat(availableDirections);
    for (var i = 0; i < total.length; i++) {
    }
}

function negativeFeedback() {
    //VALID OPTION (clear negative feedback)
    // Check for valid commandVerb
    if (commandVerb == "get" || commandVerb == "take" || commandVerb == "move" || commandVerb == "go" || commandVerb == "use" || commandVerb == "drop" || commandVerb == "discard") {
        for (var i = 0; i < total.length; i++) {
            // Check for valid commandPostVerb from all possible options (total = inventory, directions, visible items)
            if (commandPostVerb == total[i]) {
                // Valid action! Clear error
                feedbackMessage = "";
            }
        }
    }

    //INVALID TESTS (personalised negative feedback)
    // You're trying to go in an invalid direction
    if (commandVerb == "move" || commandVerb == "go") {
        var legalMove = false;
        for (var i = 0; i < availableDirections.length; i++) {
            if (commandPostVerb == availableDirections[i]) {
                legalMove = true;
            }
        } 
        if (legalMove == false) {
            feedbackMessage = "You cant go in that direction";
        }
    }
    // You're trying to use something you dont have   
    else if (commandVerb == "use") {
        for (var i = 0; i < preTotal.length; i++) {
            if (commandPostVerb != preTotal[i]) {
                feedbackMessage = "I dont understand what you're trying to use";
            }
        }
    }
    // You're trying to drop an item you dont have
    else if (commandVerb == "drop" || commandVerb == "discard") {
        var legalDrop = false;
        for (var i = 0; i < inventory.length; i++) {
            if (commandPostVerb == inventory[i]) {
                legalDrop = true;
            }
        } if (legalDrop == false) {
            feedbackMessage = "You can't drop an item you don't have";
        }
    }
    // You're trying to get something you already have
    else if (commandVerb == "get" || commandVerb == "take") {
        for (var i = 0; i < inventory.length; i++) {
            if (commandPostVerb == inventory[i]) {
                feedbackMessage = "You already have that item";
            }
        }
    }
    // You haven't entered anything
    else if (command == "") {
        feedbackMessage = "You shouldn't waste time";
    }
    // That makes no sense (Anything else such as trying to GET or TAKE an item that doesnt exist or jibberish)
    else {
        feedbackMessage = "That makes no sense, pal";
    }
    // BONUS! Give error if item is visible, but trying to be used as if in inventory
    if (commandVerb == "use") {
        for (var i = 0; i < visibleItems.length; i++) {
            if (commandPostVerb == visibleItems[i]) {
                feedbackMessage = "You can't use an item you dont have";
            }
        }
    }
    
    // Output feedback message
    $('#negativeFeedback-output').html(feedbackMessage);
}


// Map. For future development. Code works fine.
// function map () {
//     // Veranda
//     if (currentRoom == 1) {
//         $('#marker').css('left', '0px');
//         // Grab the name of the room and display it above push pin
//         $('#marker').html(room[1].roomName);
//     // hall
//     } else if (currentRoom == 2) {
//         $('#marker').css('left', '35px');
//         // Grab the name of the room and display it above push pin
//         $('#marker').html(room[2].roomName);
//     // parlor
//     } else if (currentRoom == 3) {
//         $('#marker').css('left', '100px');
//         // Grab the name of the room and display it above push pin
//         $('#marker').html(room[3].roomName);
//     }
// }



function showNarrative() {
    $('#move-output').html(moveMessage);
    $('#room-output').html("You are currently standing in the " + room[currentRoom].roomName);
    $('#message-output').html(room[currentRoom].roomDescription);
    $('#action-output').html(actionMessage);
    $('#data-output').html(dataMessage);

    showItem();
    checkVisibleItems();
}

function clearOutputs() {
    moveMessage = "";
    $('#move-output').html(moveMessage);
    actionMessage = "";
    $('#action-output').html(actionMessage);
    additionalMessage = "";
    $('#additional-output').html(additionalMessage);
    dataMessage = "";
    $('#data-output').html(dataMessage);
}
