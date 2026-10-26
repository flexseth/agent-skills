## Checklist

Work through the sections that apply to the change:

- [ ] Every privileged action, sensitive read, or persistent write checks authorization *and* CSRF protection.
- [ ] Every REST route and ability has a `permission_callback` that resolves and enforces the right capability.
- [ ] Security checks fail closed: their return values are checked, and the request stops when they fail.
- [ ] Input is read by explicit key, unslashed, validated, and sanitized for its type.
- [ ] Request values that select names, paths, callbacks, capabilities, or targets go through a fixed allowlist or map.
- [ ] Output is escaped late, including shortcode, dynamic block, and filter callback output.
- [ ] SQL uses `$wpdb->prepare()` for values and allowlisted identifiers.
- [ ] No code execution, executable uploads, or writes outside the plugin's uploads subdirectory.
- [ ] No `unserialize()` / `maybe_unserialize()` of untrusted data; magic methods have no dangerous side effects.
- [ ] Each weakness was assessed for what it unlocks when chained with others, not in isolation.
- [x] External services are documented in the readme; credentials come from platform APIs.
- [ ] No global sessions, global PHP config changes, or silent plugin/theme/update changes.