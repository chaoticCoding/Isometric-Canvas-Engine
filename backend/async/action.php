<?php
/** TODO convert iff logic to hook system that allows role/user based interactions
 * Core Game action router Currently is a static if statment for basic functions needs to be migrated to a hook/roles system.
 */

include_once("../php/iCommon.php");
include_once("../php/iUsr.php");

global $db_link;

global $response;

if($_GET) {
	if(isset($_GET['Action'])) {
		$response['Action'] = $_GET['Action'];
		
		if($_GET['Action'] == ActRegister) { // new user registration
			
			$data = array(
				'username' =>	$_POST['register_Username'],
				'RealName' =>	$_POST['register_Name'],
				'pass' =>	$_POST['register_Password'],
				'email' =>	$_POST['register_Email'],
				'usrIP' =>	$_SERVER['REMOTE_ADDR']
			);
			
			$response['sentData'] =	$data;
			
			// Verify user does not exist and is a valid username/email address
			$id = exists_user($data['username']);
			
			if(!$id){
				$response['status'] =	"new";
				$response['data']['id'] =	userRegister($data);
				//createuserValidation($data);
			
			}else{$data = array(
		);
				$response['status'] =	"existing";
				$response['data']['id'] =	$id;
				
				//print "user already exists!	$id";
			
			}
			
			if(DebugEnable == 1 ){
				$response['postData'] = $_POST;
				$response['getData'] = $_GET;
			};
			
			print json_encode($response);
			
		} elseif($_GET['Action'] == ActLogin) { // Login
			
			$data = array(
				'usr' => $_POST['login_username'],
				'pwd' => $_POST['login_password']
			);
			
			$response['sentData'] = $data;
			
			$profile = userSendLogin($data);
			
			if($profile['id']) {	
				userUpdateLogin( 
					array('usrID' => $profile['id'], 'IP' => $_SERVER['REMOTE_ADDR']));	  
				
				$response['status'] = "1";
				
				$response['profile'] = $profile;
				
				$_SESSION['id'] = $profile['id'];
				$_SESSION['uuid'] = $profile['uuid'];
				
				$response['session'] = $_SESSION;
				
			} else {
				$response['status'] = "0";
				
				$_SESSION['id'] = 0;
				$_SESSION['uuid'] = 0;

			}
			
			if(DebugEnable == 1 ){ $response['postData'] = $_POST; $response['getData'] = $_GET;};
			
			print json_encode($response);
			
		} elseif($_GET['Action'] == ActPwdRst) { // password reset // INCOMPLETE
			
			$data = array(
				'email' => $_POST['reset_email']
			);
			
			$response['sentData'] = $data;
			
			if(DebugEnable == 1 ){ $response['postData'] = $_POST; $response['getData'] = $_GET;};
			
			print json_encode($response);
			
		} elseif($_GET['Action'] == ActLogout) {// logout
			$data = array(
			);
			
			$response['sentData'] = $data;
			
			$_SESSION['id'] = 0;
			
			session_destroy();
			
			if(DebugEnable == 1 ){ $response['postData'] = $_POST; $response['getData'] = $_GET;};
			
			print json_encode($response);
			
		} elseif($_GET['Action'] == ActGetProfile) { // logout
			$data = array(
				'id' => $_POST['id']
			);
			
			$response['sentData'] = $data;
			
			$response['profile'] = userGetProfile($data);
			
			if(DebugEnable == 1 ){ $response['postData'] = $_POST; $response['getData'] = $_GET;};
			
			print json_encode($response);
			
		}
		
		
	} else { // No actions sent
		print($_GET['Action']);
		if(DebugEnable == 1 ){ $response['postData'] = $_POST; $response['getData'] = $_GET;};
		
	}
} else { //No commands sent
		print "No Commands sent";
		if(DebugEnable == 1 ){ $response['postData'] = $_POST; $response['getData'] = $_GET;};
		
		
}
