<?php
require_once __DIR__ . '/../includes/auth.php';
require_login('admin');

$name = trim($_POST['name'] ?? '');
$quantity = intval($_POST['quantity'] ?? 0);
$location = trim($_POST['location'] ?? '');

if ($name) {
	// Upsert by name
	$stmt = $mysqli->prepare('INSERT INTO resources (name, quantity, location) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = VALUES(quantity), location = VALUES(location)');
	$stmt->bind_param('sis', $name, $quantity, $location);
	$stmt->execute();
}

header('Location: dashboard.php');
exit;

