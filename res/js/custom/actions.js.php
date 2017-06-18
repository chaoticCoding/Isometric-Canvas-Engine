<?php

	include_once("../../..//backend/php/iCommon.php");
	header("Content-type: text/javascript");

	$async_Path = "/backend/async/"

?>
actions = {
	/***
	* map actions
	***/
	map: {
		getMaps: "<?php print $async_Path;?>map.php?Action=<?php print getMaps;?>",
		getMapData: "<?php print $async_Path;?>map.php?Action=<?php print getMapData;?>",
		getTilesets: "<?php print $async_Path;?>map.php?Action=<?php print getTilesets;?>",
		getTileData: "<?php print $async_Path;?>map.php?Action=<?php print getTileData;?>",
		getMapDefaults: "<?php print $async_Path;?>map.php?Action=<?php print getMapDefaults;?>",

	},

	/***
	* Resources to load
	***/
	resc: {

	},

	/***
	 * User actions
	 ***/
	user: {
		ActRegister:  "<?php print $async_Path;?>action.php?Action=<?php print ActRegister;?>",
		ActLogin: "<?php print $async_Path;?>action.php?Action=<?php print ActLogin;?>",
		ActPwdRst: "<?php print $async_Path;?>action.php?Action=<?php print ActPwdRst;?>",
		ActLogout: "<?php print $async_Path;?>action.php?Action=<?php print ActLogout;?>",
		ActGetProfile: "<?php print $async_Path;?>action.php?Action=<?php print ActGetProfile;?>",

	},

	/** TODO
	 * Error reporting and loging function
	 ***/
	Error: function(lvl, err){
			alert( err);
			//window.log(err);

	}
}