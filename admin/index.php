<?php
require_once __DIR__ . '/../includes/auth.php';
$BASE_PATH = '..';
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Admin - Login</title>
	<link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
	<?php include __DIR__ . '/../includes/layout_header.php'; ?>
	<div class="container">
		<h2>Admin Login</h2>
		<p class="muted">Guests can view stats and map. Admin actions require login.</p>
		<form method="post" action="login.php">
			<label>Username</label>
			<input type="text" name="username" required>
			<label>Password</label>
			<input type="password" name="password" required>
			<div style="margin-top:12px;">
				<button class="btn" type="submit">Login</button>
				<a class="btn small" style="margin-left:8px;" href="<?php echo $BASE_PATH; ?>/admin/dashboard.php">Open Dashboard</a>
			</div>
		</form>
	</div>
	<?php include __DIR__ . '/../includes/layout_footer.php'; ?>
</body>
</html>

