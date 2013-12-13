/*-----------------------
MAP
           |4|
 _______ __| |__
| phone | parlr |
| room3   room2 |
|_______|___ ___|
        | Foyer |
        | room1 |
        |_______|
-----------------------*/

// TO DO LIST
// * Write function to remove commas from arrays
// * Make items in arrays OBJECTS that contain lots of use strings
// * Write USE item function


/*-----------------------
INDEX
1.  Variables
    a) Variables
    b) Arrays

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
var actionMessage;
var feedbackMessage;
var currentRoom = 1;

// b) Arrays
var room = new Array();
var inventory = new Array();
var visibleItems = new Array();
var roomObjects = new Array();
var roomExits = new Array();
var roomDirections = new Array("north", "east", "south", "west");
var availableDirections = new Array();
var preTotal = new Array();
var total = new Array();

inventory[0] = "watch";


/*-----------------------
2. Onload functions
-----------------------*/
$( document ).ready(function() {
    //commandHandling();
    //roomMover();
    showItem();
    showNarrative();
    // getItem();
    // dropItem();
    convertRoomExits();
});


/*-----------------------
3. Submit Listener
-----------------------*/
$( "#commandForm" ).submit(function(event) {
    // Run functions
    commandHandling();
    totalCommands();
    roomMover();
    negativeFeedback();    
    convertRoomExits();
    showNarrative();
    getItem();
    useItem();
    dropItem();
    showItem();
    
    
    event.preventDefault();
});


/*-----------------------
4. Objects
-----------------------*/
// a) Define Objects
function Key () {
    this.itemName = "key";
    this.textGet = "You pick up the key";
    this.textUse = "You use the key";
    this.textDrop = "You drop the key";
} 

function Room (_roomNumber, _roomName, _roomDescription, _roomExits, _visibleItems) {
    this.roomNumber = _roomNumber;
    this.roomName = _roomName;
    this.roomDescription = _roomDescription;
    this.roomExits = _roomExits;
    this.visibleItems = _visibleItems;
} 

var key = new Key();

// b) Instantiate Objects (note: roomExits array [0]North, [1]East, [2]South, [3]West)
var room1 = new Room(1, "foyer", "This is a desctiption of the foyer", _roomExits = [2, 0, 0, 0], _visibleItems = ["key", "potato", "rock"]);
room[1] = room1;
var room2 = new Room(2, "parlor", "This is a description of the parlor room", _roomExits = [0, 0, 1, 3], _visibleItems = ["lamp", "rug", "chair"]);
room[2] = room2;
var room3 = new Room(3, "phone room", "To your left you see an old phone and a calendar from 1957", _roomExits = [0, 2, 0, 0], _visibleItems = ["phone", "stool", "phone book"]);
room[3] = room3;



/*-----------------------
5. Functions
-----------------------*/
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
                currentRoom = room[currentRoom].roomExits[0];
                actionMessage = "You move " + commandPostVerb;
                $('#action-output').html(actionMessage);
            } else {
                //$('#negativeFeedback-output').html("You can't move there");
            }
        } else if (commandPostVerb == "east") {
            if (room[currentRoom].roomExits[1] != 0) {
                currentRoom = room[currentRoom].roomExits[1];
                actionMessage = "You move " + commandPostVerb;
                $('#action-output').html(actionMessage);
            } else {
                //$('#negativeFeedback-output').html("You can't move there");
            }
        } else if (commandPostVerb == "south") {
            if (room[currentRoom].roomExits[2] != 0) {
                currentRoom = room[currentRoom].roomExits[2];
                actionMessage = "You move " + commandPostVerb;
                $('#action-output').html(actionMessage);
            } else {
                //$('#negativeFeedback-output').html("You can't move there");
            }
        } else if (commandPostVerb == "west") {
            if (room[currentRoom].roomExits[3] != 0) {
                currentRoom = room[currentRoom].roomExits[3];
                actionMessage = "You move " + commandPostVerb;
                $('#action-output').html(actionMessage);
            } else {
                //$('#negativeFeedback-output').html("You can't move there");
            }
        }
    }
}

function showItem() {
    visibleItems = room[currentRoom].visibleItems;
    $('#visibleItems-output').html(visibleItems.join(', '));
    $('#inventory-output').html(inventory.join(', '));
}

function getItem() {
    // Show the visible items within each instantiated room object
    visibleItems = room[currentRoom].visibleItems;

    // Only do this stuff if command is preceded by GET
    if (commandVerb[0] == "get" || commandVerb[0] == "take") {
        // Check the visible items array by looping through it
        for (var i = 0; i < visibleItems.length; i++) {
            // Make sure our command matches a visible item
            if (commandPostVerb == visibleItems[i]) {
                
                // Add visible item to inventory
                inventory.push(visibleItems[i]);

                // Set a message to assist with narrative
                actionMessage = "You take the " + visibleItems[i] +". ";

                // Remove the added item from the visible item array
                visibleItems[i] = '';
            } 
        }
    }
}

function useItem() {
    if (commandVerb[0] == "use") {
        for (var i = 0; i < inventory.length; i++) {
            if (commandPostVerb == inventory[i]) {
                // put output into #action-output

                console.log("you have used the: " + inventory[i]);
            }
        }
    }
}

function dropItem() {
    if (commandVerb[0] == "drop" || commandVerb[0] == "discard") {
        for (var i = 0; i < inventory.length; i++) {
            if (commandPostVerb == inventory[i]) {
                console.log("dropping!");
                room[currentRoom].visibleItems.push(inventory[i]);
                inventory[i] = "";
            }
        }
    }
}   

function convertRoomExits() {
    // clear array
    availableDirections.length = 0;

    for (var i = 0; i < room[currentRoom].roomExits.length; i++) {
        if (room[currentRoom].roomExits[i] > 0) {
            roomDirections[i];
            availableDirections[i] = roomDirections[i];
            $('#exits-output').html(availableDirections.join(', '));
        }
    }
}

function totalCommands() {
    // Compile all arrays into one for testing
    preTotal = visibleItems.concat(inventory);
    total = preTotal.concat(availableDirections);
    for (var i = 0; i < total.length; i++) {
        //console.log(total[i]);
    }
}

function negativeFeedback() {
    var errorCode = 0;
    //VALID OPTION (clear negative feedback)
    ////////////////////////////////////////

    // Check for valid commandVerb
    if (commandVerb == "get" || commandVerb == "take" || commandVerb == "move" || commandVerb == "go" || commandVerb == "use" || commandVerb == "drop" || commandVerb == "discard") {
        for (var i = 0; i < total.length; i++) {
            // Check for valid commandPostVerb from all possible options (total = inventory, directions, visible items)
            if (commandPostVerb == total[i]) {
                // Valid action! Clear error
                feedbackMessage = "";
                console.log(feedbackMessage);
                errorCode = 0;
            }
        }
    }

    //INVALID TESTS (personalised negative feedback)
    ////////////////////////////////////////

    // You're trying to go in an invalid direction
    if (commandVerb == "move" || commandVerb == "go") {
        // Direction flag
        var legalMove = false;
        for (var i = 0; i < availableDirections.length; i++) {
            console.log("commandPostVerb == " + commandPostVerb + " availableDirections[i] == " + availableDirections[i]);
            if (commandPostVerb == availableDirections[i]) {
                legalMove = true;
                
                console.log(feedbackMessage);
            }
        } 
        if (legalMove == false) {
            // You cant go in that direction
            feedbackMessage = "You cant go in that direction";
            errorCode = 1;
        }
    }
    // You're trying to use something you dont have   
    else if (commandVerb == "use") {
        for (var i = 0; i < preTotal.length; i++) {
            if (commandPostVerb != preTotal[i]) {
                // You don't have the [item name]
                feedbackMessage = "I dont understand what you're trying to use";
                console.log(feedbackMessage);
                errorCode = 3;
            }
        }
    }
    // You're trying to drop an item you dont have
    else if (commandVerb == "drop" || commandVerb == "discard") {
        for (var i = 0; i < inventory.length; i++) {
            if (commandPostVerb != inventory[i]) {
                // You can't drop an item you don't have
                feedbackMessage = "You can't drop an item you don't have";
                console.log(feedbackMessage);
                errorCode = 4;
            }
        }
    }
    // You're trying to get something you already have
    else if (commandVerb == "get" || commandVerb == "take") {
        for (var i = 0; i < inventory.length; i++) {
            if (commandPostVerb == inventory[i]) {
                // You already have that item
                feedbackMessage = "You already have that item";
                console.log(feedbackMessage);
                errorCode = 5;
            }
        }
    }
    // You haven't entered anything
    else if (command == "") {
        feedbackMessage = "You shouldn't waste time";
        console.log(feedbackMessage);
        errorCode = 6;
    }
    // That makes no sense (Anything else such as trying to GET or TAKE an item that doesnt exist or jibberish)
    else {
        feedbackMessage = "That makes no sense, pal";
        console.log(feedbackMessage);
        errorCode = 7;
    }
    // Output error code for testing
    console.log("Error Code: " + errorCode);
    $('#negativeFeedback-output').html(feedbackMessage);
}

function showNarrative() {
    $('#message-output').html("You are currently standing in the " + room[currentRoom].roomName + ". " + room[currentRoom].roomDescription);
    $('#action-output').html(actionMessage);
}

