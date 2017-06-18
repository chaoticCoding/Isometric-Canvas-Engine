<?php
/**
 * Created by PhpStorm.
 * User: shawn
 * Date: 10/23/14
 * Time: 10:01 PM
 */

/**
 * Core class for storing and accessing session information
 * Class sessioning
 */
class sessioning {

	/** TODO
	 *
	 */
	public function __construct(){
		session_start();

	}

	/** TODO - Validation?
	 * retreives value from session vars
	 * @param $key
	 * @return mixed
	 */
	public function Get($key){
		return $_SESSION;
	}

	/** TODO - Validation?
	 * sets value into session vars
	 * @param $key
	 * @param $value
	 */
	public function Set($key, $value){
		$_SESSION[$key] = $value;
	}

	/**
	 * validate session details
	 */
	public function validate(){
		return true;
	}

	/** TODO
	 * Ends active session
	 */
	public function kill(){

	}
}