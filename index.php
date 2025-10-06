<?php $BASE_PATH='.'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Swarakshak - Disaster Management Platform</title>
	<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
	<?php include __DIR__ . '/includes/layout_header.php'; ?>
	<div class="container">
		<h1>Swarakshak</h1>
		<p>AI-Powered Disaster Management System</p>
		<div class="grid">
			<a class="card" href="citizen/">Citizen Portal</a>
			<a class="card" href="rescue/">Rescue Team Panel</a>
			<a class="card" href="admin/">Admin Command Dashboard</a>
		</div>
	</div>
	<?php include __DIR__ . '/includes/layout_footer.php'; ?>
</body>
</html>

