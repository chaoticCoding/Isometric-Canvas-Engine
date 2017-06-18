
/*** prepare_map
 * Stored procedure for generating empty map filled with uniformed data
 * CALL prepare_map(IN in_mapID int(5), in_width int(5), in_length int(5), in_baseTile int(3));
 * IN in_mapID int(5) - mapID you with to have filled
 * in_width int(5) - width to create
 * in_length int(5) - length to create
 * in_baseTile int(3) - base Tile ID to fill with
 * CALL prepare_map(1, 100, 100, 1);
 ***/
DELIMITER $$
	CREATE PROCEDURE prepare_map(IN in_mapID int(5), in_width int(5), in_length int(5), in_baseTile int(3))
	BEGIN
		DECLARE x INT DEFAULT 1;
		DECLARE y INT DEFAULT 1;

		WHILE x < in_width DO
			SET y = 1;
			WHILE y < in_length DO
				INSERT INTO `game`.`mapData` (`id`, `xPos`, `yPos`, `zPos`, `solid`, `type`, `mapID`) VALUES (NULL, x, y, '1', '0', in_baseTile, in_mapID);

				SET y = y + 1;
			END WHILE;
		SET x = x + 1;
		END WHILE;
	END$$
DELIMITER ;




