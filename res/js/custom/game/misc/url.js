/**
 * Returns file name from a URL
 *
 * @param url
 * @returns {string}
 ***/
function getNamefromURL(url){
	return url.substring( url.lastIndexOf('/') + 1 );
}

/**
 * Returns file extension from a URL
 *
 * @param url
 * @returns {*}
 ***/
function getExtentionfromURL(url){
	return url.split('.').pop();
}