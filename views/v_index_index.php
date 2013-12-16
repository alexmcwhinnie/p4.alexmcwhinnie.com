<h2>Welcome to <?=APP_NAME?><?php if($user) echo ', '.$user->first_name; ?></h2>
<p>
	Welcome to Wingaling, a place where users can share information about bird sightings! If you don't have an account yet, sign up and start posting today.<br><br> 
	<strong>+1 Features:</strong> Logged-in users can view their info and delete and edit their posts in /users/profile.<br><br> 
	<strong>Note:</strong> I spent a lot of time trying to get the php form validation working, but sadly I had no success. Currently there is nothing stopping a user from signing up with an identical email address	
</p>

<?php if(!$user): ?>
    <!-- If user isnt logged in, show signup/login panel -->
	<div id='leftColumn'>
		<h3>New to <?=APP_NAME?><?php if($user) echo ', '.$user->first_name; ?>?<br>Sign up!</h3>
		<form method='POST' action='/users/p_signup'>

		    First Name<br>
		    <input type='text' name='first_name' required>
		    <br><br>

		    Last Name<br>
		    <input type='text' name='last_name' required>
		    <br><br>

		    Email<br>
		    <input type='text' name='email' required>
		    <br><br>

		    Password<br>
		    <input type='password' name='password' required>
		    <br><br>

		    <input type='submit' value='Sign me up!'>

		</form>
	</div>

	<div id='rightColumn'>
		<h3>Got an account?<br>Log in</h3>
		<form method='POST' action='/users/p_login'>

		    Email<br>
		    <input type='text' name='email' required>

		    <br><br>

		    Password<br>
		    <input type='password' name='password' required>

		    <br><br>

		    <?php if(isset($error)): ?>
		        <div class='error'>
		            Login failed. Please double check your email and password.
		        </div>
		        <br>
		    <?php endif; ?>
			<input type='submit' value='Log in'>
		</form>
	</div>
	<hr>
    <!-- Otherwise, hide it follow link -->
    <?php else: ?>
        

    <?php endif; ?>

