<?php

/**
 * Class Database, used for database abstraction
 */
class Database {
	//Storage for database object
	protected $db_link = array();

	// space for last responce
	protected $response = array();

	protected $databaseInfo = array();

	/**
	 * Public constructor will be called on creation
	 *
	 * takes list of connections to and preps for new connections
	 */
	public function __construct( array $info = null ) {

		// if there is db connection info preped load now!
		if(isset($info)){
			foreach( $info as $k => &$db ){
				$this->addConnectionInfo($k, $db);
			}
		}
	}

	/** TODO adding additional validation
	 * loads in new connection details overwriting previous details, used to add additional connection information
	 *
	 * @param $database
	 * @param array $info
	 */
	function addConnectionInfo($database, array $info){
		$this->databaseInfo[$database] = $info;

	}

	/**
	 * opens connection
	 * @param $database
	 * @return bool
	 */
	public function openConnection($database){
		if ($this->db_link[$database]) { //there is already an opened connection so send it back
			return $this->db_link[$database];

		} else { // try to open a new connection

			try {
				if($this->databaseInfo[$database]) { //TODO check to make sure that there is already settings for this database

					// pulls it to a local just to make it a bit cleaner
					$d = $this->databaseInfo[$database];

					//creates a new PDO object using the found settings
					$this->db_link[$database] = new PDO("mysql:host=$d->host;port=$d->port;dbname=$d->database", $d->username, $d->password);

					// sets safe errors so any problems are given a chance to be handled before the script fails
					$this->db_link[$database]->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

					// requires PDO to use native Prepared statemnets thus preventing 1st tear SQL injection
					$this->db_link[$database]->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

					return $this->db_link[$database];

				} else { // NO connection details where found
					return false;

				}

			} catch (PDOException $e) { // failure to open PDO connection
				$response['error'] = $e->getMessage(); // redirect error to local

				return FALSE;
			}
		}
	}

	/**
	 * removes reference to object, to allow PHP garbage collection to close connection.
	 * @param $database
	 */
	public function closeConnection($database) {
		$this->db_link[$database] = null;
	}

	/** TODO Return errors to Error logger
	 * @param $exception
	 */
	public static function exception_handler($exception) {
		// Output the exception details
		die('Uncaught exception: '. $exception->getMessage());
	}

	/** TODO
	 * Injection safe query
	 *
	 * @param $sql
	 * @param array $args
	 * @param $database
	 *
	 * @returns false if the query could bot be run, else returns the results
	 */
	public function Results($sql, array $args, $database = "default"){

		$Prepared_Stmt = $this->Query($sql, $args, $database);

		if ($Prepared_Stmt) {
			if ($Prepared_Stmt->rowCount() > 0) {

				$results = $Prepared_Stmt->fetchAll(PDO::FETCH_ASSOC);

				return $results;
			} else {
				return 0;
			}
		}else {
			return false;
		}

	}

	/** TODO
	 * Injection safe query that returns count affected rows
	 *
	 * @param $sql
	 * @param array $args
	 * @param $database
	 *
	 * @returns false if the query could not be run, returns rows effected if run completed ok
	 */
	public function Affected($sql, array $args, $database = "default") {

		$Prepared_Stmt = $this->Query($sql, $args, $database);

		if ($Prepared_Stmt) {

			$results = $Prepared_Stmt->rowCount();

			return $results;
		}else {
			return false;
		}

	}

	/** TODO testing
	 * Q
	 * @param $sql
	 * @param array $args
	 * @param string $database
	 * @return bool
	 */
	public function Query($sql, array $args, $database = "default"){
		if (!$this->db_link[$database])
			$this->openConnection($database);

		try {
			//prepare_map(IN in_mapID int(5), in_width int(5), in_length int(5), in_baseTile int(3))
			$Prepared_Stmt = $this->db_link[$database]->prepare($sql);
			$Prepared_Stmt->bindValue($args);

			$Prepared_Stmt->execute();


			return $Prepared_Stmt; // returns connection object

		} catch (PDOException $e) { // TODO Error handling
			// $this->pack('dbError', $e->getMessage());

			return false;
		}
	}

}