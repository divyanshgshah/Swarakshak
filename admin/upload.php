<?php
require_once __DIR__ . '/../includes/auth.php';
require_login('admin');

if (!empty($_FILES['file']['name'])) {
	$uploadDir = __DIR__ . '/../uploads';
	if (!is_dir($uploadDir)) { mkdir($uploadDir, 0777, true); }
	$target = $uploadDir . '/' . basename($_FILES['file']['name']);
	move_uploaded_file($_FILES['file']['tmp_name'], $target);
}

header('Location: dashboard.php');
exit;

