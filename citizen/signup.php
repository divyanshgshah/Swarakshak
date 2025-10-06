<?php
require_once __DIR__ . '/../includes/auth.php';
$BASE_PATH = '..';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$name = trim($_POST['name'] ?? '');
	$email = trim($_POST['email'] ?? '');
	$password = $_POST['password'] ?? '';
	$lat = floatval($_POST['lat'] ?? 0);
	$lng = floatval($_POST['lng'] ?? 0);

	if ($name && $email && $password) {
		$stmt = $mysqli->prepare('INSERT INTO users (name, email, password, location_lat, location_lng) VALUES (?, ?, ?, ?, ?)');
		$hash = hash_password($password);
		$stmt->bind_param('sssdd', $name, $email, $hash, $lat, $lng);
		if ($stmt->execute()) {
			$_SESSION['user'] = [ 'id' => $stmt->insert_id, 'name' => $name, 'email' => $email, 'role' => 'citizen' ];
			header('Location: dashboard.php');
			exit;
		}
	}
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Citizen Signup</title>
	<link rel="stylesheet" href="../assets/css/style.css">
	<script>
	function getLocation(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(function(pos){
				document.getElementById('lat').value = pos.coords.latitude;
				document.getElementById('lng').value = pos.coords.longitude;
			});
		}
	}
	</script>
</head>
<body onload="getLocation()">
	<?php include __DIR__ . '/../includes/layout_header.php'; ?>
	<div class="container">
		<h2>Create Account</h2>
		<form method="post">
			<label>Name</label>
			<input type="text" name="name" required>
			<label>Email</label>
			<input type="email" name="email" required>
			<label>Password</label>
			<input type="password" name="password" required>
			<div class="row">
				<div>
					<label>Latitude</label>
					<input id="lat" type="text" name="lat" placeholder="auto"/>
				</div>
				<div>
					<label>Longitude</label>
					<input id="lng" type="text" name="lng" placeholder="auto"/>
				</div>
			</div>
			<div style="margin-top:12px;">
				<button class="btn" type="submit">Sign up</button>
			</div>
		</form>
	</div>
	<?php include __DIR__ . '/../includes/layout_footer.php'; ?>
</body>
</html>

