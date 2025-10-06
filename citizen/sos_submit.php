<?php
require_once __DIR__ . '/../includes/auth.php';

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$message = trim($input['message'] ?? '');
$lat = floatval($input['lat'] ?? 0);
$lng = floatval($input['lng'] ?? 0);

// Determine user id: logged-in citizen, or create/find guest
if (isset($_SESSION['user']) && $_SESSION['user']['role'] === 'citizen') {
	$userId = intval($_SESSION['user']['id']);
} else {
	$guestName = trim($input['guest_name'] ?? 'Guest');
	$guestEmail = trim($input['guest_email'] ?? '');
	if ($guestEmail === '') {
		$guestEmail = 'guest_' . time() . '_' . mt_rand(1000,9999) . '@example.local';
	}
	// Try to find existing by email, else create
	$sel = $mysqli->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
	$sel->bind_param('s', $guestEmail);
	$sel->execute();
	$res = $sel->get_result();
	if ($row = $res->fetch_assoc()) {
		$userId = intval($row['id']);
	} else {
		$pwd = hash_password(bin2hex(random_bytes(8)));
		$ins = $mysqli->prepare('INSERT INTO users (name, email, password, location_lat, location_lng) VALUES (?, ?, ?, NULL, NULL)');
		$ins->bind_param('sss', $guestName, $guestEmail, $pwd);
		$ins->execute();
		$userId = $ins->insert_id;
	}
}

$stmt = $mysqli->prepare('INSERT INTO sos_requests (user_id, message, lat, lng, status, timestamp) VALUES (?, ?, ?, ?, ?, NOW())');
$status = 'pending';
$stmt->bind_param('isdds', $userId, $message, $lat, $lng, $status);
$ok = $stmt->execute();

echo json_encode([ 'success' => $ok, 'message' => $ok ? 'SOS submitted successfully' : 'Failed to submit SOS' ]);
exit;

