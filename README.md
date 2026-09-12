# iou-playground

This repository is the **demo environment** for [IOU](https://github.com/devinjones521/iou) — a bot
that remembers the promises people make in pull-request reviews and speaks only when a later pull
request touches that code without keeping them.

Nothing here is a mock-up. Every comment by `devinjones521-iou-bot[bot]`, every tracking issue and
every ledger entry was written by the bot itself, against the real GitHub API, from a server that
polls this repository every 20 seconds. If you arrived from an evidence link in the main
repository's `feature_list.json`, this is the object it names.

## Where to look

| | |
|---|---|
| **[Issue #67 — IOU ledger](../../issues/67)** | The bot's memory. Every promise lands here as a comment, and every later event (filed, dropped, settled) is a further comment. It is not edited by hand. |
| **[PR #70](../../pull/70)** | A pull request that touches promised code **without** keeping the promise. The bot's comment is the product. |
| **[PR #69](../../pull/69)** | A pull request that changes unrelated code. The bot says nothing. The silence is the point. |
| **[PR #72](../../pull/72)** | A pull request that **keeps** the promise. The bot says so once and closes the ledger entry. |
| **[Issue #71](../../issues/71)** | A tracking issue, filed only after a human reacted 👍 on the reminder. Nothing is ever filed without that. |

The two files in `src/` exist so those pull requests have real diffs to reason about. They are
deliberately trivial.

## A worked example, already here

**[PR #93](../../pull/93)** is an ordinary refactor of `fetchUser` that does not add retry logic.
The bot commented on it, once, about twenty seconds after the branch was pushed — unprompted, with
its reasoning about why that particular diff does not keep the promise. Nothing was filed, because
nobody has reacted 👍.

## Try it yourself

The bot is running. There is currently one open promise in the ledger — to add retry handling to
`fetchUser`.

1. Open a pull request that edits `src/users.js` but **does not** add any retry logic.
2. Wait about twenty seconds.

You should get exactly one comment explaining which promise your change touches and why it doesn't
keep it. Edit the same PR to add a retry loop and the bot will settle the promise instead.

Spend is capped three ways — per commenter per hour, per tick, and for the lifetime of the
deployment — so the bot will go quiet rather than run up a bill. If it says nothing at all, that is
usually the correct answer; the server log records the reason for every silence.
