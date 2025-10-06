<?php
require_once __DIR__ . '/db_connect.php';

function run_sql_file(mysqli $mysqli, string $path): array {
	$result = [ 'ok' => false, 'message' => '' ];
	if (!file_exists($path)) { return [ 'ok' => false, 'message' => 'File not found: '.$path ]; }
	$sql = file_get_contents($path);
	if ($sql === false) { return [ 'ok' => false, 'message' => 'Unable to read: '.$path ]; }
	// Split on semicolons while keeping statements simple (no routines in our file)
	$statements = array_filter(array_map('trim', explode(';', $sql)));
	$okAll = true; $errors = [];
	foreach ($statements as $stmt) {
		if ($stmt === '') continue;
		try {
			$mysqli->query($stmt);
		} catch (Throwable $e) {
			$okAll = false;
			$errors[] = $e->getMessage();
		}
	}
	return [ 'ok' => $okAll, 'message' => $okAll ? 'Success' : implode("\n", $errors) ];
}

$install = run_sql_file($mysqli, __DIR__ . '/install.sql');
$seed = [ 'ok' => false, 'message' => '' ];
if ($install['ok']) {
	$seed = run_sql_file($mysqli, __DIR__ . '/seed_demo.sql');
}

?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Setup - Swarakshak</title>
	<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
	<div class="container">
		<h1>Setup</h1>
		<div class="list">
			<div class="list-item"><strong>Install schema:</strong> <?php echo $install['ok'] ? 'OK' : 'Failed'; ?></div>
			<?php if (!$install['ok']): ?>
			<div class="list-item"><pre style="white-space:pre-wrap;"><?php echo htmlspecialchars($install['message']); ?></pre></div>
			<?php endif; ?>
			<div class="list-item"><strong>Seed demo data:</strong> <?php echo $install['ok'] ? ($seed['ok'] ? 'OK' : 'Failed') : 'Skipped'; ?></div>
			<?php if ($install['ok'] && !$seed['ok']): ?>
			<div class="list-item"><pre style="white-space:pre-wrap;"><?php echo htmlspecialchars($seed['message']); ?></pre></div>
			<?php endif; ?>
		</div>
		<p style="margin-top:16px;">
			<a class="card" href="index.php">Go to Home</a>
		</p>
	</div>
</body>
</html>


