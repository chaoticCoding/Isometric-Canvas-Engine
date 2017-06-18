<?php


/**
 * class for building individual users
 * Class user
 */
class user {
	private $NAME = "";
	private $ID = 0;
	private $_USER = array();


	public function __contruct($id = null){
		if(isset($id)){
			$this->ID = $id;
		}
	}

	public function setID($id = null){

	}

	private function _getUserData(){

	}

	private function _updateUserData(){

	}

	public function canDo($action){

	}
}