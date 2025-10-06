<?php
require_once __DIR__ . '/../includes/auth.php';
require_login('rescue');
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$id = intval($input['id'] ?? 0);

if ($id > 0) {
	$stmt = $mysqli->prepare('UPDATE sos_requests SET status = ?, resolved_at = NOW() WHERE id = ?');
	$status = 'resolved';
	$stmt->bind_param('si', $status, $id);
	$ok = $stmt->execute();
	echo json_encode(['success' => $ok]);
	exit;
}

echo json_encode(['success' => false]);
exit;

