# Passing Requirements for Plugin Security Skill

## Organization

### Separate Rules by Surface Area

- [ ] Group rules together by surface area (e.g., input handling, database operations, REST endpoints, file management, plugin lifecycle).

### Rule Types in Order

Order the rules in a FIFO (First In, First Out) manner, following the sequence in which they would be applied during the plugin development lifecycle.

- [ ] Move rule checks to sequential order in the SDLC
- [ ] The rules should not only follow their sequence in the SDLC, but also where they fall in the rule types (Prohibited, Required, Exceptions).

IE: the order the LLM would generally use to create a plugin:
- Planning the plugin structure and files
- Implementing database operations
- Handling input and output
- Registering REST endpoints and AJAX actions
- Managing files and external services
- Implementing plugin lifecycle hooks

## Code 

Each directive should provide explicit examples of both correct and incorrect implementations, highlighting potential security pitfalls and best practices.

**Sample Code Requirement**
- [ ] For each directive, ensure there are explicit examples of both correct and incorrect implementations. This can be provided by linking to existing documentation, or by including code snippets directly in the skill.
- [ ] For each directive explore chained exploits, providing examples of how multiple vulnerabilities could be combined to escalate an attack.

Manually verify that each rule has (or links to) corresponding code examples. 

**Directives Requiring Code Examples**
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
- [ ] External services are documented in the readme; credentials come from platform APIs.
- [ ] No global sessions, global PHP config changes, or silent plugin/theme/update changes.
- [x] SaaS and Third-Party Service Contract

## Evals 

Run the skillset against models in the real world, using the same parameters.

Evaluate the plugin against the defined rules and requirements.

### Baseline

The agent skill must pass evaluations on all listed models to be considered compliant.

#### Claude
- Sonnet
- Opus
- Fable

#### GPT
- GPT-4
- GPT-4-turbo
- GPT-3.5
- GPT-3.5-turbo

#### Other models

Review other frontier lab's models to determine which are best suited for using the WordPress Agent's plugin development capabilities.

## Final Passing Requirements

Before the PR should be deemed as an acceptable skill, the following criteria must be met:

- Skill should be well organized and easy to read by a human
- Generated code should pass all checklist items
- Generated code should pass the security sniffs from the Plugin Check Plugin
- Generated code should be easy to read by a human
- Edge cases should not be implemented, but noted for the user to review
