<?php
require_once __DIR__ . '/../db_connect.php';

if (session_status() === PHP_SESSION_NONE) {
	session_start();
}

function hash_password($password) {
	return password_hash($password, PASSWORD_BCRYPT);
}

function verify_password($password, $hash) {
	return password_verify($password, $hash);
}

function require_login($role) {
	if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== $role) {
		header('Location: /index.php');
		exit;
	}
}

?>

