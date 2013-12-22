p4.alexmcwhinnie.com
====================

Final Project
-------------

This is a completely redesigned text adventure engine that uses object oriented programming
and is able to save and load information to the server. I was frustrated by some of the 
shortcomings of project 3, mainly it's lack of modularity and flexibility, and decided that 
project 4 would be an excellent opportunity to develop a solution. 

This project does not contain a game with a full story line...so don't spend time looking 
for a solution :P
Since this was my first time using objects, I focused my efforts on getting the engine 
working. Lord Uxbridge's Manor allows players to pick up and discard items, unlock doors, 
and enjoy the flavor-text. 

I have listed some features below, but the JS is heavily commented, so please check it out!


* Rooms can be instantiated from a Room object. This is the core of the engine.
	- It took days to figure out how to connect the rooms, but in the end I came up with two
	internal arrays. roomExits specifies which rooms are connected to NSEW, and doorLocked 
	allows me to toggle to locks for each exit

* The JS game state is able to be saved to the server and loaded
	- The thing I am most proud of is the solution I found to saving the arrays unique to 
	each room object. I pack them all up into strings on save, then deconstruct them on load.
	There are a ton of functions that power all this (Check out the first 8)

	The .sql file I exported contains a lot of undeleted rows where I didn't have this working.
	I thought it was best to let you see my progress than delete them.

* Added some additional form validation for the signup

* In addition to taking items and using them, players can drop/discard items in other rooms.

* There is a cap to the amount of items you can hold

* I designed a cheesy game cover


I am super proud of this, so enjoy!!
-Alex








