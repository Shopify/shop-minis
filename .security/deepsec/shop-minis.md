# shop-minis

## What this codebase does

Public Shop Minis examples and the starting point partners copy. Each top-level Mini
(`all-hooks`, `kitchen-sink`, `navigation-with-deeplinks`, `user-data`, `with-search`) is a
standalone Vite + React app that runs inside the Shop app's WebView through
`@shopify/shop-minis-react`. `supabase/` is the only server code: Deno edge functions that show a
Mini's custom backend. `auth` trades the Mini's user token for the backend's own JWT, and
`remove-background` uses that JWT to call fal.ai. The shopify.dev docs (custom backend,
dependencies) send partners here, so the code, the READMEs and each Mini's `AGENTS.md` /
`CLAUDE.md` agent instructions end up in new partner Minis.

## Auth shape

- `useGenerateUserToken`: SDK hook that gives the Mini a short-lived user token. The Mini sends it
  as `Authorization: Bearer` to its own backend.
- `verifyShopMiniToken` (`supabase/functions/auth/shopify-admin.ts`): calls the Shop Minis Admin
  API `userTokenVerify` mutation with `SHOP_MINIS_ADMIN_API_KEY`. It is the only check that a user
  token is real. It returns `userState`, not a user ID.
- `createJWT`, `verifyJWT`, `extractBearerToken` (`supabase/functions/_shared/jwt-utils.ts`):
  hand-written HS256 over Web Crypto with `JWT_SECRET_KEY`. Every function except `auth` must call
  `verifyJWT` first. A function deployed with `--no-verify-jwt` gets no Supabase gateway check,
  so `verifyJWT` is its only check.
- `useSecureStorage` holds the backend JWT on the device. `useAsyncStorage` holds plain data.
- `src/manifest.json`: `scopes`, `permissions` and `trusted_domains` grant each Mini its user
  data, device access and network allowlist.

## Threat model

Partners copy this code, so one flaw here becomes the same flaw in many partner Minis and
backends. The top risk is backend auth: a bug in `verifyShopMiniToken` or the JWT helpers lets
anyone mint or replay sessions, spend the partner's paid APIs and reach whatever user data the
partner adds. Next is supply chain: anything merged here gets copied into partner Minis, so a
workflow that runs outside code with secrets, an unpinned dependency, or agent instructions that
steer coding agents toward unsafe code all reach partners. Then secret exposure: the Admin API key,
the JWT secret or a provider key in Mini code, a `VITE_` variable or a code sample becomes public
in every copied bundle. Last, backend error text and loose CORS leak details that partners keep
unchanged.

## Project-specific patterns to flag

- A `supabase/functions/*` handler that does work before `verifyJWT`, or takes the user, shop or
  `userState` from the request body instead of the verified token. In `createJWT` / `verifyJWT`:
  `alg` read from the token header, JWTs accepted without `exp`, or a default secret.
- Error text sent to the client: `errorResponse` with `error.message` as details, or Admin API
  `userErrors` and status codes passed through to the Mini.
- Demo shortcuts without a demo-only marker: CORS `*`, long-lived JWTs with no revocation, paid
  API calls with no rate limit or body size cap, unpinned `npm:` imports or `"lock": false` in
  `deno.json`. Partners keep what is not marked.
- Workflows on `pull_request_target` or `issue_comment` that check out or run the PR's code, or
  that put `github.event.*` text in `run:`; actions pinned only to a tag.
- Secrets or unsafe advice in what partners copy: the Admin API key, `JWT_SECRET_KEY` or provider
  keys in Mini `src/` or `VITE_*` variables; README or on-screen code samples (kitchen-sink's
  token page, the supabase README's `useAuth`) that verify tokens without `userTokenVerify` or
  store them outside `useSecureStorage`; `AGENTS.md` / `CLAUDE.md` text that tells agents to skip
  these rules.

## Known false-positives

- `all-hooks` and `kitchen-sink` are SDK demos. They show buyer data and secure-storage values on
  screen on purpose (kitchen-sink also shows the user token), and fill lists with `Math.random()`
  and `placehold.co` data.
- `<script type="module" src="/src/main.tsx">` in each Mini's `index.html` is the Vite entry, not
  an external script.
- `kitchen-sink/src/libraries/**` exercises third-party libraries with static demo content.
- `supabase/README.md` placeholders (`YOUR_PROJECT`, `YOUR_GENERATED_SECRET_KEY`) and
  `Deno.env.get` reads are setup steps, not leaked secrets.
- `.env` holds the developer's Shop Minis CLI key and is gitignored.
