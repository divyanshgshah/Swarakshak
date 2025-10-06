<?php
require_once __DIR__ . '/../includes/auth.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$username = trim($_POST['username'] ?? '');
	$password = $_POST['password'] ?? '';
	$stmt = $mysqli->prepare('SELECT id, username, password FROM admin WHERE username = ? LIMIT 1');
	$stmt->bind_param('s', $username);
	$stmt->execute();
	$res = $stmt->get_result();
	if ($row = $res->fetch_assoc()) {
		if (verify_password($password, $row['password'])) {
			$_SESSION['user'] = [ 'id' => $row['id'], 'name' => $row['username'], 'role' => 'admin' ];
			header('Location: dashboard.php');
			exit;
		}
	}
}

header('Location: index.php');
exit;

