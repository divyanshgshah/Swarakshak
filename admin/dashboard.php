<?php
require_once __DIR__ . '/../includes/auth.php';
$BASE_PATH = '..';

$activeCount = 0; $rescuesCount = 0; $avgResponseMinutes = null; $dbReady = true; $err = '';
try {
	$res = $mysqli->query("SELECT COUNT(*) c FROM sos_requests WHERE status != 'resolved'");
	if ($row = $res->fetch_assoc()) { $activeCount = intval($row['c']); }
	$res2 = $mysqli->query("SELECT COUNT(*) c, AVG(TIMESTAMPDIFF(MINUTE, timestamp, resolved_at)) avg_min FROM sos_requests WHERE status = 'resolved' AND resolved_at IS NOT NULL");
	if ($row2 = $res2->fetch_assoc()) { $rescuesCount = intval($row2['c']); $avgResponseMinutes = $row2['avg_min']; }
} catch (Throwable $e) {
	$dbReady = false; $err = $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Admin Dashboard</title>
	<link rel="stylesheet" href="../assets/css/style.css">
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
	<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
</head>
<body>
	<?php include __DIR__ . '/../includes/layout_header.php'; ?>
	<div class="container">
		<h2>Overview</h2>
		<?php if (!$dbReady): ?>
			<p class="muted">Database not initialized. <a class="btn small" href="<?php echo $BASE_PATH; ?>/setup.php">Run setup</a></p>
		<?php else: ?>
			<p><strong>Active SOS Requests:</strong> <?php echo $activeCount; ?></p>
			<p><strong>Total Rescues Completed:</strong> <?php echo $rescuesCount; ?></p>
			<p><strong>Average Response Time:</strong> <?php echo $avgResponseMinutes !== null ? round($avgResponseMinutes, 1) . ' min' : 'N/A'; ?></p>
		<?php endif; ?>

		<h2 style="margin-top:20px;">Assignments</h2>
		<form method="post" action="assign.php">
			<label>SOS ID</label>
			<input type="number" name="sos_id" required>
			<label>Rescue Team ID</label>
			<input type="number" name="rescue_team_id" required>
			<div style="margin-top:8px;"><button class="btn" type="submit">Assign</button></div>
		</form>

		<h2 style="margin-top:20px;">Resources</h2>
		<form method="post" action="resources.php">
			<div class="row">
				<div>
					<label>Name</label>
					<input type="text" name="name" required>
				</div>
				<div>
					<label>Quantity</label>
					<input type="number" name="quantity" required>
				</div>
			</div>
			<label>Location</label>
			<input type="text" name="location" placeholder="e.g., Depot A">
			<div style="margin-top:8px;"><button class="btn" type="submit">Add/Update Resource</button></div>
		</form>

		<h2 style="margin-top:20px;">Upload Reports</h2>
		<form method="post" action="upload.php" enctype="multipart/form-data">
			<input type="file" name="file" accept=".csv,image/*" required>
			<div style="margin-top:8px;"><button class="btn" type="submit">Upload</button></div>
		</form>

		<h2 style="margin-top:20px;">Map</h2>
		<div id="map" style="height:400px;border:1px solid #e3e8ef;border-radius:8px;"></div>
		<script>
		const map = L.map('map').setView([20.5937, 78.9629], 5);
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap'}).addTo(map);
		<?php if ($dbReady):
			$q = $mysqli->query("SELECT id, lat, lng, status FROM sos_requests ORDER BY timestamp DESC LIMIT 200");
			while ($r = $q->fetch_assoc()) {
				$lat = floatval($r['lat']); $lng = floatval($r['lng']);
				if ($lat && $lng) {
					echo "L.marker([$lat,$lng]).addTo(map).bindPopup('SOS #".intval($r['id'])." - ".addslashes($r['status'])."');\n";
				}
			}
		endif; ?>
		</script>
	</div>
	<?php include __DIR__ . '/../includes/layout_footer.php'; ?>
</body>
</html>

