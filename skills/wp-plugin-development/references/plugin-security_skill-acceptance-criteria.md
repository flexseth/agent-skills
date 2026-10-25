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
