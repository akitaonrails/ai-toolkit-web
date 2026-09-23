// Provider names as ai-usagebar itself prints them (VendorId::display_name in src/vendor.rs), checked at v1.22.0.
export const providers = [
  'Claude', 'Anthropic API', 'Codex', 'GitHub Copilot', 'Z.AI', 'OpenRouter', 'DeepSeek', 'Kimi', 'Kilo', 'Novita',
  'Moonshot', 'Grok', 'SuperGrok', 'Grok Bot', 'Antigravity', 'Cursor', 'MiniMax', 'Kiro', 'Nous Research',
  'OpenCode Go', 'Command Code', 'Ollama Cloud', 'OrcaRouter', 'Model Studio',
];

// Install commands per platform, from the README's Install section.
export const install = [
  'omarchy pkg aur add ai-usagebar-bin &&\n  omarchy plugin add https://github.com/akitaonrails/ai-usagebar.git --enable',
  'yay -S ai-usagebar-bin    # prebuilt\nyay -S ai-usagebar        # from source',
  'cargo binstall ai-usagebar   # prebuilt\ncargo install ai-usagebar    # from source',
  'nix profile install github:akitaonrails/ai-usagebar',
  'scoop bucket add akitaonrails https://github.com/akitaonrails/scoop-bucket\nscoop install ai-usagebar',
];
export const quickstart = 'ai-usagebar detect     # enable providers you already have credentials for\nai-usagebar usage      # every quota and reset time\nai-usagebar-tui        # the terminal UI';
