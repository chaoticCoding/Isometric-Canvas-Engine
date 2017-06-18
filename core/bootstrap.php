<?php

include_once "settings.php";
include_once "includes/*.inc";

class bootstrap {

	public $database = null;

	public $session = null;
	public $UUID = null;

	/**
	 *
	 */
	public function __contruct( $noGUI = false){
		global $settings;
		$this->database = new Database($settings['database']);
		$this->session = new sessioning();
		$this->UUID = new UUID();


	}

	/**
	 * Overload function for calls when the method does not exist
	 * @param array $args
	 */
	public function __call(array &$args){

	}
}


