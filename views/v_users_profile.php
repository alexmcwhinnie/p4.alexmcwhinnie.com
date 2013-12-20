<h2>This is the profile of <?=$user->username?></h2>
<h3>Your Details</h3>
    <!-- Print this users info -->
    <p><strong>First Name:</strong> <?=$user->username?></p>
    <p><strong>Email Address:</strong> <?=$user->email?></p>
	<p><strong>Account Created:</strong> <?=Time::display($user->created)?></p>