<?php
class game_controller extends base_controller {

    public function __construct() {
        parent::__construct();
    } 

    public function p_save() {

        $currentRoom = $_POST['currentRoom'];
        $inventory = $_POST['inventory'];
        $visible_items = $_POST['visible_items'];
        $door_locks= $_POST['door_locks'];

        # Prepare the data array to be inserted
        $data = Array(
            "user_id" => $this->user->user_id,
            "room_number" => $currentRoom,
            "inventory" => $inventory,
            "visible_items" => $visible_items,
            "door_locks" => $door_locks,
        );

        // # Note we didn't have to sanitize any of the $_POST data because we're using the insert method which does it for us
        DB::instance(DB_NAME)->insert("game_sessions", $data);
    }

    public function load() {

        # Build the query to get all the game info
        // $q = "SELECT *
        //     FROM game_sessions";

        # original test
        // $q = "SELECT *, 
        //     MAX(game_session_id)
        //     FROM game_sessions
        //     WHERE user_id = ".$this->user->user_id;

        $q = "SELECT * 
            FROM game_sessions     
            WHERE game_session_id = (SELECT MAX(game_session_id) 
            FROM game_sessions 
            WHERE user_id =".$this->user->user_id.")
            AND user_id = ".$this->user->user_id;

        # Store the result array in the variable $users
        $session = DB::instance(DB_NAME)->select_rows($q);
        # Send the goods to Javascript
        echo json_encode($session);

    }

    public function reset() {

        # Build the query to reset the game info
        $q2 = "SELECT MAX(game_session_id)
            FROM game_sessions
            WHERE user_id = ".$this->user->user_id;

        # use update to replace values
        
        # Prepare the data array to be inserted
        $data = Array(
            "user_id" => $this->user->user_id,
            "room_number" => 1,
            "inventory" => "test1, test2, test3",
            "lock_bathroom" => "true",
        );

        // # Note we didn't have to sanitize any of the $_POST data because we're using the insert method which does it for us
        $session = DB::instance(DB_NAME)->insert("game_sessions", $data);
        # Send the goods to Javascript
        echo json_encode($session);

    }


} # end of the class