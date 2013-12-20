<!DOCTYPE html>
<html>
<head>
	<title><?php if(isset($title)) echo $title; ?></title>

	<meta charset="UTF-8">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="/css/styles.css" type="text/css">
				
	<!-- Controller Specific JS/CSS -->
	<?php if(isset($client_files_head)) echo $client_files_head; ?>
	
</head>

<body>  
    <div id = "wrapper">
        <header>
            <h1><?=APP_NAME?></h1>
            <nav>
                <ul>
                    <li><a href='/'>Home</a></li>

                    <!-- Menu for users who are logged in -->
                    <?php if($user): ?>
                        <li><a href='/users/profile'>Account</a></li>
                        <li><a href='#' id='save'>Save Game</a></li>
                        <li><a href='#' id='load'>Load Game</a></li>
                        <li><a href='#' id='new'>New Game</a></li>
                        <li><a href='/users/logout'>Logout</a></li>

                    <!-- Menu options for users who are not logged in -->
                    <?php else: ?>

                        <li><a href='/users/signup'>Sign up</a></li>
                        <li><a href='/users/login'>Log in</a></li>

                    <?php endif; ?>
                </ul>
                <hr>
            </nav>
        </header>
        <div id = "content">
            <!-- Load in content -->
            <?php if(isset($content)) echo $content; ?>
        </div>
        <footer>
            <!-- Insert App name and current year -->
            <p>Copyright <?=APP_NAME?> <?php echo date('Y')?></p>
        </footer>
    </div>
</body>
</html>