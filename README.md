# ninety

## Browser telemetry

Datadog RUM and Browser Logs share the `ninety-web` service and deployment
tags. Set the `datadog-env` and `datadog-version` meta tags in `index.html`
when deploying, for example:

```html
<meta name="datadog-env" content="staging">
<meta name="datadog-version" content="release-or-git-sha">
```

Without an environment override, localhost and file URLs use `dev`; hosted
pages use `prod`. An unset version is omitted rather than reporting a stale
release. RUM samples all sessions and requests replay for 20% of sampled
sessions; Datadog remote configuration may override these settings.

RUM views follow the visible game screen, including World Cup phases and the
team sheet. Browser Logs forwards console log, info, warning, and error output
using the SDK's native capture. Both SDKs load asynchronously; the game remains
usable when they are blocked.

Performance diagnostics can be disabled with `?perf=0`, `?noperf`, or
`window.Perf.setEnabled(false)`, and re-enabled with
`window.Perf.setEnabled(true)`. Disabling disconnects observers, restores native
layout APIs, stops automatic DOM census scans, and discards queued diagnostic
actions. Layout-read counts identify reads that *may* trigger layout; they do
not prove forced reflow. Long animation frames report the browser's measured
forced style/layout duration when available.

Run the instrumentation regression checks with:

```sh
node --test tests/telemetry.test.js
```
