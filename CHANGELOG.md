CHANGELOG
---------
- **0.2.0** - 2018-01-19
  - Add basic `manifest.json` validators
  - Add `add dashboard-card`, `add webhook`, `delete dashboard-card`, `delete element`, and `delete webhook` commands
  - Add removal of app-type-specific sub-directories when respective `delete <type>` command is called
  - Improve README.md: Add [CONTRIBUTING](/CONTRIBUTING.md), [CHANGELOG](/CHANGELOG.md), and general improvements to usage directions
  
- **0.1.0** - 2017-12-04
  - Initial commit
  - Support prompts
  - Abstract `init` commands
  - Add the `add`, `list`, `delete` commands
  - Add `add element` and `add dashboard-card` commands
  - Add ability to generate `manifest.json` using schemas and validators
  - Stubbed out `validate` command