<?php
require_once __DIR__ . '/../includes/auth.php';
$BASE_PATH = '..';
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Citizen Portal - Login</title>
	<link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
	<?php include __DIR__ . '/../includes/layout_header.php'; ?>
	<div class="container">
		<h2>Citizen Login</h2>
		<p class="muted">Login is optional. You can still submit SOS from the dashboard.</p>
		<form method="post" action="login.php">
			<label>Email</label>
			<input type="email" name="email" required>
			<label>Password</label>
			<input type="password" name="password" required>
			<div style="margin-top:12px;">
				<button class="btn" type="submit">Login</button>
				<a class="btn secondary" href="signup.php">Create account</a>
				<a class="btn small" style="margin-left:8px;" href="<?php echo $BASE_PATH; ?>/citizen/dashboard.php">Skip to Dashboard</a>
			</div>
		</form>
	</div>
	<?php include __DIR__ . '/../includes/layout_footer.php'; ?>
</body>
</html>

