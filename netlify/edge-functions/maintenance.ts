// Maintenance mode: every request to the site gets this page instead of the app.
// To bring the site back online, delete this file and redeploy.

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>Temporarily unavailable</title>
<style>
  html,body{height:100%;margin:0}
  body{display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#f8fafc;color:#0f172a;padding:24px;box-sizing:border-box}
  main{max-width:440px;text-align:center}
  h1{font-size:1.75rem;margin:0 0 12px}
  p{color:#475569;line-height:1.6;margin:0}
</style>
</head>
<body>
<main>
  <h1>We'll be back soon</h1>
  <p>This site is temporarily unavailable. Please check back later.</p>
</main>
</body>
</html>`;

export default () =>
  new Response(html, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "retry-after": "86400",
    },
  });

export const config = { path: "/*" };
