<?php
/**
 * Global settings
 */
//TODO Enable in prod!
// uses PHP output system to compress outstreams with GZ compression
//ob_start("ob_gzhandler");
//ob_start("compress");


global $settings;
$settings = array();

/**
 * hashed used for encryption salting if needed
 */
$settings['hash_salt'] = 'czCyMf2TE-F6U2i-pKjxlpGlxQgi1qmWnroTDdHebYCntS4Zx1g3BQ6fiZfJFzvvkwa0UvRJ2w'; 

/**
 * Default database settings additional databases can be added in by adding a new $settings['database'][keyname]
 */
$settings['database']['default'] = array (
	'database' => 'd8-demo',
	'username' => 'cms-demo',
	'password' => 'cms-demo',
	'prefix' => '',
	'host' => 'localhost',
	'port' => '3306',
);

/**
 * Settings to mail functions, only one mail server is available but could be extended in a rewrite
 */
$settings['mail'] = array (
	'usrname' => 'game',
	'password' => '',
	'host' => 'localhost',
	'port' => '465',
	'from' => 'Game <game@localhost',
	'templetes' => "",
);

$settings['core'] = "/core/"; // path to core functions
$settings['Components'] = "/core/Components/"; // path to Componates