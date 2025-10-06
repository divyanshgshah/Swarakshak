<?php
// Load local overrides first so defaults can fill in gaps without redefining constants
$local = __DIR__ . '/config.local.php';
if (file_exists($local)) {
	require_once $local;
}

// Define defaults only if not already defined
if (!defined('DB_HOST')) define('DB_HOST', 'localhost');
if (!defined('DB_PORT')) define('DB_PORT', 3306);
if (!defined('DB_NAME')) define('DB_NAME', 'swarakshak');
if (!defined('DB_USER')) define('DB_USER', 'root');
if (!defined('DB_PASS')) define('DB_PASS', '');
if (!defined('APP_KEY')) define('APP_KEY', 'change_this_in_production');

?>

