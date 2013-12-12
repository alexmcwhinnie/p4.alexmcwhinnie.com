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
var currentRoom = 1;

// b) Arrays
var room = new Array();
var inventory = new Array();
var visibleItems = new Array();
var roomObjects = new Array();
var roomExits = new Array();
var roomDirections = new Array("north", "south", "east", "west");
var availableDirections = new Array();
var preTotal = new Array();
var total = new Array();

inventory[0] = ["watch"];


/*-----------------------
2. Onload functions
-----------------------*/
$( document ).ready(function() {
    commandHandling();
    roomMover();
    getItem();
    dropItem();
    convertRoomExits();
    output();
});


/*-----------------------
3. Submit Listener
-----------------------*/
$( "#commandForm" ).submit(function(event) {
    // Run functions
    commandHandling();
    roomMover();
    getItem();
    dropItem();
    convertRoomExits();
    negativeFeedback();
    output();
    event.preventDefault();
});


/*-----------------------
4. Objects
-----------------------*/
// a) Define Objects
// function Key () {
//     this.textGet = "You pick up the key";
//     this.textUse = "You use the key";
//     this.textDrop = "You drop the key";
// } 

function Room (_roomNumber, _roomName, _roomDescription, _roomExits, _visibleItems) {
    this.roomNumber = _roomNumber;
    this.roomName = _roomName;
    this.roomDescription = _roomDescription;
    this.roomExits = _roomExits;
    this.visibleItems = _visibleItems;
} 

// b) Instantiate Objects (note: roomExits array [0]North, [1]East, [2]South, [3]West)
var room1 = new Room(1, "foyer", "This is a desctiption of the foyer", _roomExits = [2, 0, 0, 0], _visibleItems = ["banana", "potato", "rock"]);
room[1] = room1;
var room2 = new Room(2, "parlor", "This is a description of the parlor room", _roomExits = [0, 0, 1, 3], _visibleItems = ["lamp", "rug", "chair"]);
room[2] = room2;
var room3 = new Room(3, "phone room", "To your left you see an old phone and a calendar from 1957", _roomExits = [0, 2, 0, 0], _visibleItems = ["phone", "stool", "phone book"]);
room[3] = room3;
//var key1 = new Key();


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
                $('#negativeFeedback-output').html("You can't move there");
            }
        } else if (commandPostVerb == "east") {
            if (room[currentRoom].roomExits[1] != 0) {
                currentRoom = room[currentRoom].roomExits[1];
                actionMessage = "You move " + commandPostVerb;
                $('#action-output').html(actionMessage);
            } else {
                $('#negativeFeedback-output').html("You can't move there");
            }
        } else if (commandPostVerb == "south") {
            if (room[currentRoom].roomExits[2] != 0) {
                currentRoom = room[currentRoom].roomExits[2];
                actionMessage = "You move " + commandPostVerb;
                $('#action-output').html(actionMessage);
            } else {
                $('#negativeFeedback-output').html("You can't move there");
            }
        } else if (commandPostVerb == "west") {
            if (room[currentRoom].roomExits[3] != 0) {
                currentRoom = room[currentRoom].roomExits[3];
                actionMessage = "You move " + commandPostVerb;
                $('#action-output').html(actionMessage);
            } else {
                $('#negativeFeedback-output').html("You can't move there");
            }
        }
    }
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
    for (var i = 0; i < room[currentRoom].roomExits.length; i++){
        if (room[currentRoom].roomExits[i] > 0) {
            roomDirections[i];
            availableDirections = roomDirections[i];
            $('#exits-output').html(roomDirections[i]);
        }
    }
}

function totalCommands() {
    // Compile all arrays into one for testing
    preTotal = $.merge(visibleItems,inventory);
    total = $.merge(preTotal,roomDirections);
}

function negativeFeedback() {
    if (commandPostVerb != total) {
        $('#negativeFeedback-output').html("You cant do that");
    }
}

function output() {
    $('#message-output').html("You are currently standing in the " + room[currentRoom].roomName + ". " + room[currentRoom].roomDescription);
    $('#action-output').html(actionMessage);
    $('#visibleItems-output').html(visibleItems.join(', '));
    $('#inventory-output').html(inventory.join(', '));

    // Output to console for testing
    // console.log("room number: " + room[currentRoom].roomNumber);
    // console.log("room name: " + room[currentRoom].roomName);
    // console.log("room description: " + room[currentRoom].roomDescription);
    // console.log("room exits: " + room[currentRoom].roomExits);
    // console.log("visibleItems: " + visibleItems);
    // console.log("availableDirections: " + availableDirections);
}

