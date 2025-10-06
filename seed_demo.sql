-- Demo seed data for Swarakshak (for development/testing only)

-- Citizens
INSERT INTO users (name, email, password, location_lat, location_lng) VALUES
('Asha Verma', 'asha@example.com', '$2y$10$H1x4L3o0C2hYw0f5S3pGCu6J2q9Qe1v8V5wz8WVy2lO0S0Zb0bFzK', 28.6139, 77.2090),
('Ravi Kumar', 'ravi@example.com', '$2y$10$H1x4L3o0C2hYw0f5S3pGCu6J2q9Qe1v8V5wz8WVy2lO0S0Zb0bFzK', 19.0760, 72.8777)
ON DUPLICATE KEY UPDATE email = VALUES(email);

-- Rescue team (password hash for 'rescue123')
INSERT INTO rescue_team (name, email, password) VALUES
('Team Alpha', 'alpha.rescue@example.com', '$2y$10$gKp1kYwqfS0h8wq6j9rVMe7QyS9Qb2Zb8jK7yE5sKZbW9Hq8eYy1m')
ON DUPLICATE KEY UPDATE email = VALUES(email);

-- Resources
INSERT INTO resources (name, quantity, location) VALUES
('Relief Kits', 150, 'Depot A'),
('Rescue Vehicles', 6, 'Garage North')
ON DUPLICATE KEY UPDATE quantity = VALUES(quantity), location = VALUES(location);

-- SOS: one pending and one resolved (response time ~45 minutes)
INSERT INTO sos_requests (user_id, message, lat, lng, status, timestamp, resolved_at) VALUES
( (SELECT id FROM users WHERE email='asha@example.com'), 'Flooded street, need assistance', 28.61, 77.21, 'pending', NOW(), NULL ),
( (SELECT id FROM users WHERE email='ravi@example.com'), 'Trapped on rooftop', 19.08, 72.88, 'resolved', DATE_SUB(NOW(), INTERVAL 2 HOUR), DATE_SUB(NOW(), INTERVAL 75 MINUTE))
;


