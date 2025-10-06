<?php
// Database connection using MySQLi. Configure credentials in includes/config.php

require_once __DIR__ . '/includes/config.php';

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);

if ($mysqli->connect_errno) {
	// In production, avoid revealing sensitive details
	http_response_code(500);
	die('Database connection failed.');
}

// Ensure UTF-8
$mysqli->set_charset('utf8mb4');

?>

