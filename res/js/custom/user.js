/**
 * Pushes registration data
 ***/
function sendRegistration(){
	$.ajax({
		method: 'POST',
		dataType: "json",
		url: actions.user.ActRegister,
		data: $("#frmRegister").serialize(),
		success: function(data) {
				actions.Error("Debug", data);
			},
			error:  function (xhr, ajaxOptions, thrownError){
				actions.Error("Debug", xhr.statusText);
				actions.Error("Debug", ajaxOptions);
				actions.Error("Debug", thrownError);
			},
		});
}

/**
 * Pushes login data
 ***/
function sendLogin(){

	$.ajax({
		method: 'POST',
		dataType: "json",
		url: actions.user.ActLogin,
		data: $("#frmLogin").serialize(),
		success: function(data) {
			actions.Error("Debug", data);

				if(data.status == "1"){ // User sucessfully logged in
					user = new Object();
					user.id = data.profile.id;
					user.status = 1;
					
					updateProfile(data.profile);
					
					ChangeUserstatus(user);
				}else{ // user failed to login

				}
				
			},
			error:  function (xhr, ajaxOptions, thrownError){
				actions.Error("Debug", xhr.statusText);
				actions.Error("Debug", ajaxOptions);
				actions.Error("Debug", thrownError);
			},
		});
}

/**
 * sends request for password reset
 ***/
function sendPwdReset(){
	$.ajax({
		method: 'POST',
		dataType: "json",
		url: actions.user.ActPwdRst,
		data: $("#frmPwdRst").serialize(),
		success: function(data) {
			actions.Error("Debug", data);
				
			},
			error:  function (xhr, ajaxOptions, thrownError){
				actions.Error("Debug", xhr.statusText);
				actions.Error("Debug", ajaxOptions);
				actions.Error("Debug", thrownError);
			},
		});
}

/**
 * sends logout data
 ***/
function sendLogout(){
	$.ajax({
		method: 'POST',
		dataType: "json",
		url: actions.user.ActLogout,
		//data: $("#frmRegister").serialize(),
		success: function(data) {
				actions.Error("Debug", data);

				user = new Object();
				user.id = 0;
				user.status = 0;
					
				ChangeUserstatus(user);

			},
			error:  function (xhr, ajaxOptions, thrownError){
				actions.Error("Debug", xhr.statusText);
				actions.Error("Debug", ajaxOptions);
				actions.Error("Debug", thrownError);
			},
		});
}

/**
 * updates the profile data
 *
 * @param profile
 */
function updateProfile(profile){
	$("#Account_Username").text(profile.username);
	$("#Account_lastlogin").text(profile.last_login);
	$("#Account_lastip").text(profile.last_ip);
}

/**
 *
 * @param sid
 ***/
function getLogin(sid){
	 var sdata = {
            id: sid,
              };
        
	$.ajax({
		method: 'POST',
		dataType: "json",
		url: actions.user.ActGetProfile,
		data: sdata,
		success: function(data) {
			actions.Error("Debug", data);
				if( data.profile != null && typeof data.profile === 'object' ){
									
					if(data.profile.id != "0"){ // User sucessfully logged in
						user = new Object();
						user.id = data.profile.id;
						user.status = 1;
						
						updateProfile(data.profile);
						
						ChangeUserstatus(user);

					}else{ // user failed to login
						//alert(data.status);
					}
				}else{
					user = new Object();
					user.id = 0;
					user.status = 0;
					
					ChangeUserstatus(user);
				}

			},
			error:  function (xhr, ajaxOptions, thrownError){
				actions.Error("Debug", xhr.statusText);
				actions.Error("Debug", ajaxOptions);
				actions.Error("Debug", thrownError);
			},
		});
}

/**
 *
 * @param user
 * @constructor
 ***/
function ChangeUserstatus(user){
	if(user.status == "1"){
		$('.logged-out').hide();
		$('.logged-out-bt').hide();
		$('.logged-in').hide();
		$('.logged-in-bt').show();

		$.cookie("UserExists", 1, { expires : 30 });

		$("#frontMenu-accordion").accordion("option", "active", 3);
	}else{
		$('.logged-out').hide();
		$('.logged-out-bt').show();
		$('.logged-in').hide();
		$('.logged-in-bt').hide();
		$("#frontMenu-accordion").accordion("option", "active", 1);
	}
}