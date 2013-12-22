<!DOCTYPE html>
<html>
<head>
	<title><?php if(isset($title)) echo $title; ?></title>

	<meta charset="UTF-8">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
    <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.js"></script>
   
    <link rel="stylesheet" href="/css/styles.css" type="text/css">
				
	<!-- Controller Specific JS/CSS -->
	<?php if(isset($client_files_head)) echo $client_files_head; ?>

    <script>
        $().ready(function() {
            
            // validate signup form on keyup and submit
            $("#signupForm").validate({
                rules: {
                    username: "required",
                    password: "required",
                    username: {
                        required: true,
                        minlength: 2
                    },
                    password: {
                        required: true,
                        minlength: 5
                    },
                    email: {
                        required: true,
                        email: true
                    },
                },
                messages: {
                    firstname: "Please enter your username",
                    password: "Please enter your password",
                    username: {
                        required: "Please enter a username",
                        minlength: "Your username must consist of at least 2 characters"
                    },
                    password: {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 5 characters long"
                    },
                    email: "Please enter a valid email address",
                }
            });
        });
    </script>
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
                        <li><a href='#' id='save'>Save</a></li>
                        <li><a href='#' id='load'>Load</a></li>
                        <li><a href='#' id='new'>New</a></li>
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
        <hr>
        <footer>
            <!-- Insert App name and current year -->
            <p>Copyright <?=APP_NAME?> <?php echo date('Y')?></p>
        </footer>
    </div>
</body>
</html>