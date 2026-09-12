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

The bot is running and polls this repository every 20 seconds. The most convincing thing you can do
takes two steps, because it exercises the part that is hardest to believe — that nobody ever types
at the bot.

**1. Make a promise to a human.** Comment on any open pull request here, phrased as a promise of
later work, addressed to a person and not to the bot. For example:

> Looks fine. I'll add retry handling to `invoiceTotal` in a follow-up PR rather than here.

Within about twenty seconds it will appear as an entry in [the ledger](../../issues/67). Nothing
else happens — the promise is simply remembered. Try a comment that is *not* a promise too ("nice
one, shipping it") and watch it be correctly ignored.

**2. Come back and break it.** Open a **new** pull request that edits the promised function without
doing the promised work — change `invoiceTotal` in `src/billing.js` cosmetically, say. The bot will
leave exactly one comment linking the promise you made in step 1.

*Please open a new branch rather than pushing to the existing pull requests: #68, #69, #70 and #72
are the exact objects shown in the demo video, and #69 in particular is the "it stays silent"
example. Leaving them untouched keeps the video checkable against this repository.*

React 👍 on that comment and it files a tracking issue assigned to you. React 👎 and it drops the
promise. It will not file anything on its own.

### If the bot says nothing

That is usually the correct answer, and the server log records the reason for every silence. The
common causes:

- **Your pull request doesn't touch a promised symbol.** Silence is the default here, by design.
- **The open promise was already filed by an earlier visitor.** Once a promise has a tracking issue
  against it, raising it again on every future pull request is exactly the behaviour that gets a
  bot muted, so it stops. Make a fresh promise as in step 1 and it will wake up again.
- **Spend ceilings.** They are capped per commenter per hour, per tick, and for the lifetime of the
  deployment, so the bot goes quiet rather than run up a bill on a stranger's comments.

[PR #93](../../pull/93) is there either way — it does not depend on the bot still being awake.
