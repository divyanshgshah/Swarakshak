// Utility: simple GET/POST helpers and polling
function httpGet(url) {
	return fetch(url, { credentials: 'same-origin' }).then(r => r.json());
}

function httpPost(url, data) {
	return fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'same-origin',
		body: JSON.stringify(data)
	}).then(r => r.json());
}

function poll(fn, intervalMs) {
	fn();
	return setInterval(fn, intervalMs);
}

// Simple confirm helper
function confirmMessage(msg) {
	alert(msg);
}


