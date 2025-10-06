-- Schema for Swarakshak Disaster Management Platform (MySQL)

CREATE TABLE IF NOT EXISTS users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(120) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	location_lat DOUBLE NULL,
	location_lng DOUBLE NULL
);

CREATE TABLE IF NOT EXISTS sos_requests (
	id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	message TEXT NULL,
	lat DOUBLE NULL,
	lng DOUBLE NULL,
	status VARCHAR(20) NOT NULL DEFAULT 'pending',
	timestamp DATETIME NOT NULL,
	resolved_at DATETIME NULL,
	INDEX (status),
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS rescue_team (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(120) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS rescue_updates (
	id INT AUTO_INCREMENT PRIMARY KEY,
	sos_id INT NOT NULL,
	rescue_team_id INT NOT NULL,
	comment TEXT NULL,
	status VARCHAR(20) NOT NULL DEFAULT 'enroute',
	timestamp DATETIME NOT NULL,
	FOREIGN KEY (sos_id) REFERENCES sos_requests(id) ON DELETE CASCADE,
	FOREIGN KEY (rescue_team_id) REFERENCES rescue_team(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS admin (
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(60) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS resources (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(120) NOT NULL UNIQUE,
	quantity INT NOT NULL DEFAULT 0,
	location VARCHAR(200) NULL
);

CREATE TABLE IF NOT EXISTS assignments (
	id INT AUTO_INCREMENT PRIMARY KEY,
	sos_id INT NOT NULL,
	rescue_team_id INT NOT NULL,
	assigned_by INT NOT NULL,
	assigned_at DATETIME NOT NULL,
	FOREIGN KEY (sos_id) REFERENCES sos_requests(id) ON DELETE CASCADE,
	FOREIGN KEY (rescue_team_id) REFERENCES rescue_team(id) ON DELETE CASCADE,
	FOREIGN KEY (assigned_by) REFERENCES admin(id) ON DELETE CASCADE
);

-- Seed admin user (username: admin / password: admin123) - change in production
INSERT INTO admin (username, password) VALUES ('admin', '$2y$10$8nqQyQjx3b2Jm0vfa8bS6O9w0w9t0G4B9h1k0J7r6u7g5Q2zJqg1a')
ON DUPLICATE KEY UPDATE username = VALUES(username);


