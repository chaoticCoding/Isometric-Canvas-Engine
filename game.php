<?php
	include_once("backend/php/iCommon.php");

if(validateSesson()){
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en-US"> 
	<head>
		<title>Project_1 - Game</title>

		<!-- Community CSS -->
		<link rel="stylesheet" href="res/js/comm/jquery-ui-1.10.2/themes/base/jquery.ui.all.css">

		<!-- Custom CSS -->
		<link rel="stylesheet" type="text/css" href="res/css/layout.css" title="style" />
		<link rel="stylesheet" type="text/css" href="res/css/style.css" title="style" />
		<link rel="stylesheet" type="text/css" href="res/css/tiles.css" title="style" />
		<link rel="stylesheet" type="text/css" href="res/css/game/game.css" title="style" />

		<!-- jQuery -->
		<script lang="javascript" src="res/js/comm/jquery-1.9.1.js"></script>
		<script lang="javascript" src="res/js/comm/jquery-ui-1.10.2/ui/jquery.ui.core.js"></script>
		<script lang="javascript" src="res/js/comm/jquery-ui-1.10.2/ui/jquery.ui.widget.js"></script>
		<script lang="javascript" src="res/js/comm/jquery-ui-1.10.2/ui/jquery.ui.accordion.js"></script>
		<script lang="javascript" src="res/js/comm/jquery-ui-1.10.2/ui/jquery.ui.tabs.js"></script>

		<!-- howler.js - Used for game sounds -->
		<script lang="javascript" src="res/js/comm/howler.js-master/howler.js"></script>
		<!-- http://alcwynparker.co.uk/?p=377 -->
		<!-- http://goldfirestudios.com/blog/104/howler.js-Modern-Web-Audio-Javascript-Library -->

		<!-- Basic Inheritance -->
		<script lang="javascript" src="res/js/custom/Inheritance.class.js"></script>

		<!-- game paths must be loaded before the core -->
		<script lang="javascript" src="res/js/custom/actions.js.php"></script>

		<!-- mics functions -->
		<script lang="javascript" src="res/js/custom/game/misc/draw.js"></script>
		<script lang="javascript" src="res/js/custom/game/misc/numbers/numbers.js"></script>
		<script lang="javascript" src="res/js/custom/game/misc/numbers/isometrics.js"></script>
		<script lang="javascript" src="res/js/custom/game/misc/numbers/movement.js"></script>
		<script lang="javascript" src="res/js/custom/game/misc/url.js"></script>

		<!-- user functions -->
		<script lang="javascript" src="res/js/custom/user.js"></script>

		<!-- Basic controllers needed for a game -->
		<script lang="javascript" src="res/js/custom/game/error.controller.js"></script>
		<script lang="javascript" src="res/js/custom/game/core/animationFrame.controller.js"></script>
		<script lang="javascript" src="res/js/custom/game/core/visable.controller.js"></script>

		<script lang="javascript" src="res/js/custom/game/canvas/canvas.class.js"></script>
		<script lang="javascript" src="res/js/custom/game/canvas/canvas.controller.js"></script>

		<script lang="javascript" src="res/js/custom/game/timing/rate.class.js"></script>
		<script lang="javascript" src="res/js/custom/game/timing/timer.class.js"></script>
		<script lang="javascript" src="res/js/custom/game/timing/tick.class.js"></script>

		<script lang="javascript" src="res/js/custom/game/resources/resources.controller.js"></script>
        <script lang="javascript" src="res/js/custom/game/resources/image.class.js"></script>

		<!-- game core -->
		<script lang="javascript" src="res/js/custom/game/mapping/maping.controller.js"></script>
		<script lang="javascript" src="res/js/custom/game/mapping/map.class.js"></script>
		<script lang="javascript" src="res/js/custom/game/mapping/tilesets.controller.js"></script>
		<!--<script lang="javascript" src="res/js/custom/game/mapping/grids.class.js"></script>-->

		<script lang="javascript" src="res/js/custom/game/entity/entity.controller.js"></script>
		<script lang="javascript" src="res/js/custom/game/entity/entity.class.js"></script>

		<script lang="javascript" src="res/js/custom/game/core/input.controller.js"></script>

		<script lang="javascript" src="res/js/custom/game/core/game.controller.js"></script>
		
	</head>
	<body>
		<header role="banner">
			<div class="siteinfo"></div>
			<figure></figure>
			<hgroup>
				<h1>Game</h1>
			</hgroup>
		</header>


		<div id="content" style="width:800px;height:800px;">
			<canvas id="gameCanvas" width="500" height="500" >
				<!-- Insert fallback content here -->
                Sorry, your browser doesn't support canvas technology
			</canvas>
		</div>

		<div id="canDebug"></div>

		
		<script>
			$(document).ready(function() {
				window.game.core.init( document.getElementById("gameCanvas") );
				window.game.core.setup();
				window.game.core.startAni();
			});
		</script>
	</body>
</html>
<?php
}else{
	header("HTTP/1.1 403 Forbidden");
	header("Location: index.php");
}
?>