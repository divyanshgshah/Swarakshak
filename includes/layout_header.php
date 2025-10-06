<?php
if (session_status() === PHP_SESSION_NONE) {
	session_start();
}
$BASE_PATH = isset($BASE_PATH) ? $BASE_PATH : '.';
?>
<div class="topbar">
	<a class="brand" href="<?php echo $BASE_PATH; ?>/">Swarakshak</a>
	<nav class="nav">
		<a href="<?php echo $BASE_PATH; ?>/citizen/">Citizen</a>
		<a href="<?php echo $BASE_PATH; ?>/rescue/">Rescue</a>
		<a href="<?php echo $BASE_PATH; ?>/admin/">Admin</a>
	</nav>
	<div class="auth">
		<?php if (isset($_SESSION['user'])): ?>
			<span class="user"><?php echo htmlspecialchars($_SESSION['user']['name']); ?></span>
			<?php if ($_SESSION['user']['role'] === 'citizen'): ?>
				<a href="<?php echo $BASE_PATH; ?>/citizen/logout.php">Logout</a>
			<?php elseif ($_SESSION['user']['role'] === 'rescue'): ?>
				<a href="<?php echo $BASE_PATH; ?>/rescue/logout.php">Logout</a>
			<?php else: ?>
				<a href="<?php echo $BASE_PATH; ?>/admin/logout.php">Logout</a>
			<?php endif; ?>
		<?php else: ?>
			<a href="<?php echo $BASE_PATH; ?>/citizen/" class="btn small">Login</a>
			<a href="<?php echo $BASE_PATH; ?>/citizen/signup.php" class="btn small secondary">Sign up</a>
		<?php endif; ?>
	</div>
</div>

