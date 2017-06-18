<?php
	include_once("backend/php/iCommon.php");
	

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en-US"> 
	<head>
		<title>Project_1</title>
		
		<!-- Community CSS -->
		<link rel="stylesheet" href="res/js/comm/jquery-ui-1.10.2/themes/base/jquery.ui.all.css">

		<!-- Custom CSS -->
		<link rel="stylesheet" type="text/css" href="res/css/layout.css" title="style" />
		<link rel="stylesheet" type="text/css" href="res/css/style.css" title="style" />
		<link rel="stylesheet" type="text/css" href="res/css/tiles.css" title="style" />

		<!-- Community JS -->
		<script lang="javascript" src="res/js/comm/jquery-1.9.1.js"></script>
		<script src="res/js/comm/jquery-ui-1.10.2/ui/jquery.ui.core.js"></script>
		<script src="res/js/comm/jquery-ui-1.10.2/ui/jquery.ui.widget.js"></script>
		<script src="res/js/comm/jquery-ui-1.10.2/ui/jquery.ui.accordion.js"></script>
		<script src="res/js/comm/jquery-ui-1.10.2/ui/jquery.ui.tabs.js"></script>

		<script src="res/js/comm/jquery-cookie-master/jquery.cookie.js"></script>


		<script lang="javascript" src="res/js/custom/actions.js.php"></script>
		
		<!-- Custom JS -->
		<script lang="javascript" src="res/js/custom/index.js"></script>
		<script lang="javascript" src="res/js/custom/user.js"></script>
		
	</head>
	<body>
		<header role="banner">
			<div class="siteinfo"></div>
			<figure></figure>
			<hgroup>
				<h1>Game</h1>
			</hgroup>
		</header>
		
		<!-- Side Menu -->
		<div id="frontMenu-accordion">
			<h3 class="logged-out-bt">Register</h3>
			<div class="logged-out">
				<form id="frmRegister" action="backend/async/action.php?Action=<?php print ActRegister;?>" method="post" autocomplete="on">
					<div id="register_name">
						Name:
						<br /><input type="text" id="register_Name" name="register_Name">
					</div>
					<div id="register_user">
						Username:
						<br /><input type="text" id="register_Username" name="register_Username">
					</div>
					<div id="register_email">
						Email:
						<br /><input type="text" id="register_Email" name="register_Email">
					</div>
					<div id="register_password">
						Password:
						<br /><input type="password" id="register_Password" name="register_Password">
					</div>
					<div id="register_submit">
						
						<br /><input type="submit" value="Register" onclick="sendRegistration();return false;">
					</div>
				</form>
			</div>
			
			<h3 class="logged-out-bt">Login</h3>
			<div class="logged-out">
				<form id="frmLogin" action="backend/async/action.php?Action=<?php print ActLogin;?>" method="post" autocomplete="on">
					<div id="login_user">
						Username:
						<br /><input type="text" name="login_username">
					</div>
					<div id="login_passwd">
						Password:
						<br /><input type="password" name="login_password">
					</div>
					<div id="login_submit">
						
						<br /><input type="submit" value="Login" onclick="sendLogin();return false;">
					</div>
		
				</form>
			</div>
			
			<h3 class="logged-out-bt">Password Reset</h3>
			<div class="logged-out">
				<form id="frmPwdRst" action="backend/async/Action.php?action=<?php print ActPwdRst;?>" method="post" autocomplete="on">
					<div id="reset-email">
						Email Address:
						<br /><input type="text" name="reset_email">
					</div>
					<div id="reset_submit">
						
						<br /><input type="button" value="Register" onclick="sendPwdReset();return false;">
					</div>
		
				</form>
			</div>

			<h3 class="logged-in-bt">Account</h3>
			<div class="logged-in">
				<div id="Account-Profile">
					<h4>Username:</h4> <span id="Account_Username"></span><br />
					<h4>Last Log in:</h4> <span id="Account_lastlogin"></span><br />
					<h4>Last IP:</h4 <span id="Account_lastip"></span><br />
					
					<input type="button" value="Play" onclick="launchGame();">
				</div>
			</div>
			
			<h3 class="logged-in-bt" onclick='sendLogout();'>Logout</h3>
			
		</div>
		<!-- :Side Menu -->
		
		<!-- Warnings -->
		<div id="ContentWarnings">
		</div>
		<!-- :Warnings -->
		
		<!-- Main Page -->
		<div id="tabs">
			<ul>
				<li><a href="#home"><span>Home</span></a></li>
				<li><a href="#GameDesc"><span>Description</span></a></li>
			</ul>
			
			<div id="home">
				<h2>Game description</h2>
			</div>
		
		
			<div id="GameDesc">
				
			</div>
			
		</div>
		<!-- :Main Page -->
		
		<!-- Start scritps -->
		<script language="javascript" type="text/javascript">
			/**
			 * Wait for the document to completely load
			 ***/
			$(document).ready(function() {
				// Starts the jQuery Accordion system
				$( "#frontMenu-accordion" ).accordion();

				// hides the the forms releated to users already logged in
				$( ".logged-in").hide();
				$( ".logged-in-bt").hide();

				// Enables Tabs
				$( "#tabs" ).tabs();

				// Add support for rounded interfaces
				$('input').addClass("ui-corner-all");

				// if user has logged in the past switches to login vs the new user panel
				if($.cookie("UserExists") == 1){
					$( "#frontMenu-accordion" ).accordion({ active: 1 });
				}
// using a PHP function loads logins from Session.
<?php
	if(isset($_SESSION['id'])){
		print "getLogin('" . $_SESSION['id'] . "');\n";
	}
?>
			});

		</script>
		<!-- :Start scritps -->

	</body>
</html>
