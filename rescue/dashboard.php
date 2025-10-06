<?php
require_once __DIR__ . '/../includes/auth.php';
$BASE_PATH = '..';
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Rescue Dashboard</title>
	<link rel="stylesheet" href="../assets/css/style.css">
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
	<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
	<script>
	function markResolved(id){
		fetch('resolve.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id })})
			.then(r=>r.json()).then(()=>{ location.reload(); });
	}
	</script>
</head>
<body>
	<?php include __DIR__ . '/../includes/layout_header.php'; ?>
	<div class="container">
		<h2>Live SOS Alerts</h2>
		<div class="list">
		<?php
		$haveData = true; $errorMsg = '';
		try {
			$res = $mysqli->query("SELECT s.id, u.name, s.message, s.lat, s.lng, s.status, s.timestamp FROM sos_requests s JOIN users u ON u.id = s.user_id ORDER BY s.timestamp DESC LIMIT 100");
		} catch (Throwable $e) {
			$haveData = false; $errorMsg = $e->getMessage();
		}
		if (!$haveData) {
			echo '<div class="list-item">Database not initialized. <a class="btn small" href="'.$BASE_PATH.'/setup.php">Run setup</a></div>';
		} else {
			while ($row = $res->fetch_assoc()): ?>
				<div class="list-item">
					<strong>#<?php echo intval($row['id']); ?></strong>
					<?php echo htmlspecialchars($row['status']); ?> —
					<?php echo htmlspecialchars($row['name']); ?> —
					<?php echo htmlspecialchars($row['message']); ?>
					<div style="float:right;">
						<?php $canResolve = isset($_SESSION['user']) && $_SESSION['user']['role']==='rescue'; ?>
						<?php if ($row['status'] !== 'resolved' && $canResolve): ?>
						<button class="btn" onclick="markResolved(<?php echo intval($row['id']); ?>)">Mark as Resolved</button>
						<?php elseif ($row['status'] !== 'resolved'): ?>
						<span class="muted">Login as rescue to resolve</span>
						<?php endif; ?>
					</div>
				</div>
			<?php endwhile; }
		?>
		</div>

		<h2 style="margin-top:20px;">Map View</h2>
		<div id="map" style="height:400px;border:1px solid #e3e8ef;border-radius:8px;"></div>
		<script>
		const map = L.map('map').setView([20.5937, 78.9629], 5);
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap'}).addTo(map);
		<?php
		if (isset($res) && $res instanceof mysqli_result) {
			$res->data_seek(0);
			while ($row = $res->fetch_assoc()):
				$lat = floatval($row['lat']); $lng = floatval($row['lng']); $label = '#'.$row['id'].' '.($row['message'] ?? '');
				if ($lat && $lng) {
					echo "L.marker([$lat,$lng]).addTo(map).bindPopup('".addslashes($label)."');\n";
				}
			endwhile;
		}
		?>
		</script>
	</div>
	<?php include __DIR__ . '/../includes/layout_footer.php'; ?>
</body>
</html>

