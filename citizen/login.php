<?php
require_once __DIR__ . '/../includes/auth.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$email = trim($_POST['email'] ?? '');
	$password = $_POST['password'] ?? '';
	$stmt = $mysqli->prepare('SELECT id, name, email, password FROM users WHERE email = ? LIMIT 1');
	$stmt->bind_param('s', $email);
	$stmt->execute();
	$res = $stmt->get_result();
	if ($row = $res->fetch_assoc()) {
		if (verify_password($password, $row['password'])) {
			$_SESSION['user'] = [ 'id' => $row['id'], 'name' => $row['name'], 'email' => $row['email'], 'role' => 'citizen' ];
			header('Location: dashboard.php');
			exit;
		}
	}
}

header('Location: index.php');
exit;

