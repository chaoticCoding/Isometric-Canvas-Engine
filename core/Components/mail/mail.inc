<?php
/** TODO Mail Abstraction
 *
 ***/


class mail {
	// settings
	protected $mailSettings = array();

	/**
	 * Loads
	 * @param string $settings
	 */
	public function __construct( $settings  ) {
		$this->mailName = $settings;

	}

	public function loadSettings( $settings ){
		$this->mailSettings = $settings;
	}

	/**
	 * function for
	 * @param       $template
	 * @param array $templeteData
	 *
	 * @return mixed|string
	 */
	public static function prepareTemplete($template, array $templeteData){

		$path = "" . $template; // file Path to template

		$file = fopen ($path, "r"); // open files for read access
		$msg = fread ($file, filesize ($path)); // read entire file into $var
		fclose($file); // we done close file

		// loop though all key/values in $templeteData and replace them in the templete
		foreach ($templeteData as $key=>$value) {
			$msg = str_replace("%%$value[0]%%", $value[1], $msg );
		}

		//replaces safe \'s with normal
		$msg = stripslashes($msg);

		return $msg;
	}

	/**
	 * function for preparing an attachment to be sent
	 * @param $path
	 *
	 * @return bool|string
	 */
	public static function prepareAttachment($path) {
		$rn = "\r\n"; // newline type

		if (file_exists($path)) { // TODO add check to make sure we have permission to access file
			$finfo = finfo_open(FILEINFO_MIME_TYPE); // reads file information
			$ftype = finfo_file($finfo, $path); // reads type of file
			$file = fopen($path, "r"); // opens file for read
			$attachment = fread($file, filesize($path)); //reads entire attachment file into $var based on file size
			$attachment = chunk_split(base64_encode($attachment)); // encodes attachment as base64
			fclose($file); // we done close file

			// creates mime file info and add encoded attachment after
			$msg = 'Content-Type: \'' . $ftype . '\'; name="' . basename($path) . '"' . $rn;
			$msg .= "Content-Transfer-Encoding: base64" . $rn;
			$msg .= 'Content-ID: <' . basename($path) . '>' . $rn;
			//            $msg .= 'X-Attachment-Id: ebf7a33f5a2ffca7_0.1' . $rn;
			$msg .= $rn . $attachment . $rn . $rn;

			return $msg;

		} else { // files does not exist so return false
			return false;
		}
	}

	/**
	 * @param array $message
	 */
	public static function prepareHeaders(array &$message){
		// if recepiants arenot set, load empty
		self::_checkRecipient($message['to']);
		self::_checkRecipient($message['cc']);
		self::_checkRecipient($message['bcc']);

		$message['header'] = self::_prepareHeaders($message['to'], $message['from'], $message['subject'], $message['cc'], $message['bcc'] );

	}

	/**
	 * @param $to
	 * @param $from
	 * @param $subject
	 * @param string $cc
	 * @param string $bcc
	 * @return string
	 */
	private static function _prepareHeaders($to, $from, $subject, $cc = "", $bcc = "") {
		$headers = "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/plain; charset=iso-8859-1\r\n";
		$headers .= "From: " . $from . "\r\n";
		$headers .= "to: " . $to . "\r\n";
		$headers .= "cc: " . $cc . "\r\n";
		$headers .= "Bcc: " . $bcc . "\r\n";
		$headers .= "Reply-To: " . $from . "\r\n";
		$headers .= "Subject: {$subject}";
		$headers .= "X-Mailer: PHP/" . phpversion();

		return $headers;
	}

	/**
	 * @param array $message
	 */
	public static function prepareHTMLHeader(array &$message){
		// TODO if to/cc/bcc are null or empty set to blank
		self::_checkRecipient($message['to']);
		self::_checkRecipient($message['cc']);
		self::_checkRecipient($message['bcc']);

		$message['header'] = self::_prepareHTMLHeader($message['to'], $message['from'], $message['subject'], $message['cc'], $message['bcc'] );

	}

	/**
	 * @param $to
	 * @param $from
	 * @param $subject
	 * @param string $cc
	 * @param string $bcc
	 * @return string
	 */
	private static function _prepareHTMLHeader($to, $from, $subject, $cc = "", $bcc = "") {
		$headers = "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
		$headers .= "From: " . $from . "\r\n";
		$headers .= "to: " . $to . "\r\n";
		$headers .= "cc: " . $cc . "\r\n";
		$headers .= "Bcc: " . $bcc . "\r\n";
		$headers .= "Reply-To: " . $from . "\r\n";
		$headers .= "Subject: {$subject}";
		$headers .= "X-Mailer: PHP/" . phpversion();

		return $headers;
	}

	/**
	 * @param $recipient
	 */
	private static function _checkRecipient( &$recipient ){
		if(!isset($recipient)) {
			$recipient = "";
		}else{
			if(is_array($recipient))
				$recipient = implode(", ", $recipient);
		}
	}

	/**
	 * function for sending message using stored settings
	 * @param array $message
	 * 	->to me@somewhere.com || array(me1@somewhere.com, me2@somewhere.com)
	 *  ->subject
	 *  ->message
	 *  ->headers string || array
	 */
	public static function send(array $message){
		// if a array is found convert into proper string
		self::_checkRecipient($message['to']);

		if(is_array($message['headers'])) {
			$message['headers'] = implode("\r\n", $message['headers']);
		}
		mail($message['to'], $message['subject'], $message['message'], $message['headers']);

	}

}