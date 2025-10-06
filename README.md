## Swarakshak – AI-Powered Disaster Management System (Core PHP + MySQL)

Swarakshak is a lightweight, web-based platform for disaster preparedness and response with three portals: Citizen, Rescue Team, and Admin. Built using core PHP, MySQL, HTML, CSS, and JavaScript (no frameworks).

### Features
- Citizen Portal: signup/login, real-time alerts (placeholder), map of safe zones, submit SOS with location.
- Rescue Panel: login, view live SOS list/map, mark SOS as resolved, add updates (extensible).
- Admin Dashboard: login, monitor active SOS, assignments, resources, report uploads, analytics (total rescues, average response time).

### Tech Stack
- Backend: Core PHP (MySQLi)
- Database: MySQL
- Frontend: HTML, CSS (no Bootstrap), JavaScript
- Maps: Leaflet + OpenStreetMap tiles
- Live updates: basic AJAX endpoints (polling ready)

### Folder Structure
```
.
├─ admin/
│  ├─ index.php         # Admin login
│  ├─ login.php         # Auth handler
│  ├─ logout.php
│  ├─ dashboard.php     # Overview, assignments, resources, uploads, map, analytics
│  ├─ assign.php        # Assign rescue team to SOS
│  ├─ resources.php     # Upsert resources
│  └─ upload.php        # Accept CSV/images for assessment
├─ citizen/
│  ├─ index.php         # Citizen login
│  ├─ signup.php        # Citizen signup (captures lat/lng if available)
│  ├─ login.php
│  ├─ logout.php
│  ├─ dashboard.php     # Alerts, map, SOS submission
│  └─ sos_submit.php    # SOS API
├─ rescue/
│  ├─ index.php         # Rescue login
│  ├─ login.php
│  ├─ logout.php
│  ├─ dashboard.php     # SOS list/map, resolve button
│  └─ resolve.php       # Mark SOS resolved (records resolved_at)
├─ includes/
│  ├─ config.php        # DB config (override via config.local.php)
│  └─ auth.php          # Sessions, password helpers, require_login()
├─ assets/
│  ├─ css/style.css     # Minimal responsive styles
│  └─ js/app.js         # Small helpers (fetch, polling)
├─ db_connect.php       # Creates $mysqli (MySQLi) connection
├─ install.sql          # Creates all tables + seeds admin user
├─ seed_demo.sql        # Demo citizens, rescue team, resources, sample SOS
└─ index.php            # Landing page linking to portals
```

### Prerequisites
- PHP 8.x
- MySQL 5.7+ / MariaDB 10.4+
- Windows (XAMPP/WAMP) or any LAMP stack

### Configuration
1) Copy `includes/config.php` to `includes/config.local.php` and edit:
```php
<?php
define('DB_HOST', 'localhost');
define('DB_PORT', 3306);
define('DB_NAME', 'swarakshak');
define('DB_USER', 'root');
define('DB_PASS', '');
define('APP_KEY', 'change_this_in_production');
```

### Database Setup
1) Create DB:
```sql
CREATE DATABASE swarakshak CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
2) Install schema:
```bash
mysql -u root -p swarakshak < install.sql
```
3) Optional: load demo data (users, rescue team, resources, SOS):
```bash
mysql -u root -p swarakshak < seed_demo.sql
```

Admin seed user (from install.sql):
- username: `admin`
- password: `admin123`

Rescue demo user (from seed_demo.sql):
- email: `alpha.rescue@example.com`
- password: `rescue123`

### Running the App
Option A: XAMPP/WAMP
- Place the project in `htdocs` (XAMPP) or `www` (WAMP)
- Visit `http://localhost/<folder>/`

Option B: PHP built-in server (dev only)
```bash
php -S 0.0.0.0:8080 -t .
# open http://localhost:8080
```

### Using the Portals
- Landing: `http://localhost/.../index.php`
- Citizen Portal: create a citizen account on `citizen/signup.php`, then login at `citizen/`
  - Send SOS; confirmation appears on success
- Rescue Panel: login with demo rescue credentials at `rescue/`
  - Mark pending SOS as resolved to update analytics
- Admin Dashboard: login with admin credentials at `admin/`
  - View active SOS count, map; create assignments; manage resources; upload reports (CSV/images); see analytics (total rescues, avg response time)

### Notes
- Leaflet uses OpenStreetMap tiles; internet connection required for tiles.
- Alerts in Citizen dashboard are placeholders; you can integrate OpenWeatherMap by adding a small fetch in `citizen/dashboard.php`.
- Security: sample credentials are for development only. Change all secrets for production, enforce HTTPS, add CSRF tokens, input validation, and stricter authorization.
- Performance: switch to prepared statements everywhere for all read queries if extending functionality. Current writes already use prepared statements.

### License
For academic and demonstration purposes.


