<?php
require_once __DIR__ . '/../includes/auth.php';
require_login('admin');

$sosId = intval($_POST['sos_id'] ?? 0);
$teamId = intval($_POST['rescue_team_id'] ?? 0);

if ($sosId > 0 && $teamId > 0) {
	$stmt = $mysqli->prepare('INSERT INTO assignments (sos_id, rescue_team_id, assigned_by, assigned_at) VALUES (?, ?, ?, NOW())');
	$adminId = intval($_SESSION['user']['id']);
	$stmt->bind_param('iii', $sosId, $teamId, $adminId);
	$stmt->execute();
}

header('Location: dashboard.php');
exit;

