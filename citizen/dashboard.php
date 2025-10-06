<?php
require_once __DIR__ . '/../includes/auth.php';
$BASE_PATH = '..';
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Citizen Dashboard</title>
	<link rel="stylesheet" href="../assets/css/style.css">
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
	<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
	<script src="../assets/js/app.js"></script>
	<script>
	let map, userMarker;
	function initMap(){
		map = L.map('map').setView([20.5937, 78.9629], 5);
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '© OpenStreetMap'
		}).addTo(map);
	}
	function requestSOS(){
		if(!navigator.geolocation){ alert('Geolocation not supported'); return; }
		navigator.geolocation.getCurrentPosition(function(pos){
			const payload = { lat: pos.coords.latitude, lng: pos.coords.longitude, message: document.getElementById('sosmsg').value };
			if (document.getElementById('guest_name')) { payload.guest_name = document.getElementById('guest_name').value; }
			if (document.getElementById('guest_email')) { payload.guest_email = document.getElementById('guest_email').value; }
			fetch('sos_submit.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)})
				.then(r=>r.json()).then(d=>{ alert(d.message || 'Submitted'); });
		});
	}
	window.addEventListener('load', initMap);
	</script>
</head>
<body>
	<?php include __DIR__ . '/../includes/layout_header.php'; ?>
	<div class="container">
		<h2>Disaster Alerts</h2>
		<div class="list" id="alerts">
			<div class="list-item">Fetching alerts...</div>
		</div>

		<h2 style="margin-top:20px;">Safe Zones & Shelters</h2>
		<div id="map"></div>

		<h2 style="margin-top:20px;">Send SOS</h2>
		<?php $isLogged = isset($_SESSION['user']) && $_SESSION['user']['role']==='citizen'; ?>
		<?php if (!$isLogged): ?>
			<div class="row">
				<div>
					<label>Your Name (optional)</label>
					<input id="guest_name" type="text" placeholder="Name">
				</div>
				<div>
					<label>Your Email (optional)</label>
					<input id="guest_email" type="email" placeholder="email@example.com">
				</div>
			</div>
		<?php endif; ?>
		<textarea id="sosmsg" rows="3" placeholder="Describe your situation (optional)"></textarea>
		<div style="margin-top:8px;"><button class="btn" onclick="requestSOS()">Send SOS</button><?php if(!$isLogged): ?><span class="muted" style="margin-left:8px;">No login required</span><?php endif; ?></div>

		<h2 style="margin-top:20px;">Preparedness</h2>
		<ul>
			<li>Keep a first-aid kit, water, and essentials ready.</li>
			<li>Know nearest shelters and hospitals.</li>
			<li>Follow official advisories and stay calm.</li>
		</ul>
	</div>
	<?php include __DIR__ . '/../includes/layout_footer.php'; ?>

</body>
</html>

