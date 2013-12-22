<h2>Welcome to <?=APP_NAME?><?php if($user) echo ', '.$user->username; ?></h2>

<!-- USERS LOGGED IN GET THE GAME -->
<?php if($user): ?>
	<div id='gameLeftColumn'>
		<p id = 'data-output'></p>
		<p id = 'move-output'></p>
		<p id = 'room-output'></p>
		<p id = 'message-output'></p>
		<p id = 'action-output'></p>
		<p id = 'additional-output'></p>
		<p id = 'negativeFeedback-output'></p>

		<strong>Your see the following exits</strong>
		<p id = 'exits-output'></p>

		<strong>The see the following items</strong>
		<p id = 'visibleItems-output'></p>

		<strong>Your pack contains the following</strong>
		<p id = 'inventory-output'></p>

		<p>What would you like to do?</p>
		<p id = 'tip'>You are free to MOVE, TAKE items, DROP items and USE items</p>

		<form id = 'commandForm'>
			<input type='text' id='command'>
			<input type='submit' value='Do it' id='doit'>
		</form>
	</div>
	<!--
	<div id='gameRightColumn'>
		<div id='map'>
			<div id='marker'></div>
		</div>
	</div>
	-->
	<script src="js/adventure.js"></script>

<!-- USERS NOT LOGGED IN GET TEASER TEXT -->
<?php else: ?>
   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt nulla quis commodo tempus. Phasellus placerat consectetur enim in placerat. Sed ac nisl at libero accumsan rhoncus. Integer sagittis justo risus. Nunc imperdiet fermentum blandit. Sed eros nulla, tempor vitae tortor et, dictum euismod enim. Mauris ac tincidunt leo. Duis at arcu quis lacus dignissim facilisis at a nibh. Nunc quis neque libero. Donec convallis commodo turpis, vulputate porttitor elit viverra id. Duis suscipit ante ac volutpat consequat. </p>
<?php endif; ?>

<?php if(!$user): ?>
    <!-- If user isnt logged in, show signup/login panel -->
	<div id='leftColumn'>
		<h3>New?<br>Sign up!</h3>
		<form method='POST' action='/users/p_signup' id='signupForm'>

		    Username<br>
		    <input type='text' name='username' id='username' required>
		    <br><br>

		    Email<br>
		    <input type='text' name='email' id='email' required>
		    <br><br>

		    Password<br>
		    <input type='password' name='password' id='password' required>
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

