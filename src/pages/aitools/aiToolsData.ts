export interface AITool {
  name: string;
  url: string;
  description: string;
  category: string;
  verified: boolean;
  notes?: string;
}

export const AI_TOOLS: AITool[] = [
  // Chatbots & General Assistants
  {
    name: 'DuckDuckGo AI Chat (Duck.ai)',
    url: 'https://duck.ai',
    description: 'Chat with GPT‑4o mini, GPT‑5 mini, Claude 4.5 Haiku, Llama 4 Scout, Mistral Small, and gpt-oss-120b through an anonymizing proxy',
    category: 'Chatbots & General Assistants',
    verified: true,
    notes: 'No account, no chat logging by DDG, IP stripped before reaching model providers. Best all-round no-login chatbot pick'
  },
  {
    name: 'HuggingChat',
    url: 'https://huggingface.co/chat',
    description: 'Open-source chat UI running various open-weight LLMs (Llama, Qwen, Mistral, etc.)',
    category: 'Chatbots & General Assistants',
    verified: true,
    notes: 'Usable without login for basic chat; some features need a free Hugging Face account'
  },
  {
    name: 'You.com',
    url: 'https://you.com',
    description: 'AI-assisted search + chat',
    category: 'Chatbots & General Assistants',
    verified: false,
    notes: 'Free chats/searches before it nudges toward signup'
  },
  {
    name: 'Perplexity',
    url: 'https://perplexity.ai',
    description: 'AI search with cited sources, summarization',
    category: 'Chatbots & General Assistants',
    verified: false,
    notes: 'Limited free queries before prompting signup'
  },

  // Image Generation
  {
    name: 'Perchance AI Image Generator',
    url: 'https://perchance.org/ai-image-generator',
    description: 'Stable Diffusion image generation running client-side in-browser',
    category: 'Image Generation',
    verified: true,
    notes: 'Cleanest true no-login option — no watermark, no daily cap, community-funded'
  },
  {
    name: 'Craiyon',
    url: 'https://craiyon.com',
    description: 'Text-to-image (originally "DALL-E Mini")',
    category: 'Image Generation',
    verified: true,
    notes: '9 images per batch, unlimited batches, but lower resolution (~256px) and a small watermark'
  },
  {
    name: 'Bing Image Creator',
    url: 'https://bing.com/images/create',
    description: 'DALL-E 3 / GPT-4o-quality images',
    category: 'Image Generation',
    verified: false,
    notes: 'Technically requires a free Microsoft account — lowest-friction "signup" among high-quality tools'
  },
  {
    name: 'Raphael AI',
    url: 'https://raphaelai.org',
    description: 'FLUX.1-based photorealistic image generation',
    category: 'Image Generation',
    verified: false,
    notes: 'No account, no watermark per reviews; verify current limits before relying on it'
  },

  // Photo & Image Editing
  {
    name: 'remove.bg',
    url: 'https://www.remove.bg',
    description: 'AI background removal',
    category: 'Photo & Image Editing',
    verified: true,
    notes: 'Free tier gives lower-res preview download without an account; the long-running industry standard'
  },
  {
    name: 'Photoroom',
    url: 'https://www.photoroom.com/tools/background-remover',
    description: 'AI background removal + product photo backgrounds',
    category: 'Photo & Image Editing',
    verified: true,
    notes: 'No signup for basic use'
  },
  {
    name: 'Pixelcut',
    url: 'https://www.pixelcut.ai/background-remover',
    description: 'Background removal + AI backgrounds, also works on video',
    category: 'Photo & Image Editing',
    verified: false,
    notes: 'No signup required per vendor'
  },
  {
    name: 'JS Paint',
    url: 'https://jspaint.app',
    description: 'Classic MS Paint revived in-browser (not AI, but a handy no-login companion tool)',
    category: 'Photo & Image Editing',
    verified: true,
    notes: 'Fully open source'
  },
  {
    name: 'Squoosh',
    url: 'https://squoosh.app',
    description: 'Image compression (Google Chrome Labs)',
    category: 'Photo & Image Editing',
    verified: true,
    notes: 'Not AI-generative but ML-assisted compression, runs fully client-side'
  },

  // Transcription & Speech-to-Text
  {
    name: 'Whisper Web (Xenova / Transformers.js)',
    url: 'https://huggingface.co/spaces/Xenova/whisper-web',
    description: "Runs OpenAI's Whisper model entirely client-side via WebAssembly/WebGPU",
    category: 'Transcription & Speech-to-Text',
    verified: true,
    notes: 'The original open-source project — audio never leaves your device, works offline after model download, no account, no limits'
  },

  // Video Generation & Editing
  {
    name: 'OpenCut',
    url: 'https://opencut.app',
    description: 'Open-source, browser-based video editor (CapCut alternative)',
    category: 'Video Generation & Editing',
    verified: true,
    notes: 'No AI generation, but free, open-source, no login'
  },
  {
    name: 'OmniClip',
    url: 'https://omniclip.app',
    description: 'Browser-based video editor',
    category: 'Video Generation & Editing',
    verified: true,
    notes: 'Open source, no account'
  },

  // Writing, Grammar & Paraphrasing
  {
    name: 'LanguageTool',
    url: 'https://languagetool.org',
    description: 'AI grammar, spelling, and style checker (30+ languages)',
    category: 'Writing, Grammar & Paraphrasing',
    verified: true,
    notes: 'Basic checking works without an account'
  },
  {
    name: 'DeepL Write',
    url: 'https://www.deepl.com/en/features/paraphrasing-tool',
    description: 'AI paraphrasing/grammar & tone tool',
    category: 'Writing, Grammar & Paraphrasing',
    verified: false,
    notes: 'Free tier has a text-length limit; no account needed for basic use'
  },
  {
    name: 'QuillBot',
    url: 'https://quillbot.com',
    description: 'Paraphrasing, grammar, summarizer',
    category: 'Writing, Grammar & Paraphrasing',
    verified: false,
    notes: 'Basic paraphraser works without signup; heavier features gated'
  },
  {
    name: 'Hemingway Editor',
    url: 'https://hemingwayapp.com',
    description: 'Readability/style analysis (rule-based, not strictly generative AI)',
    category: 'Writing, Grammar & Paraphrasing',
    verified: true,
    notes: 'Free, in-browser, no account for the web version'
  },

  // PDF & Document Tools
  {
    name: 'TinyWow',
    url: 'https://tinywow.com',
    description: '250+ tools: AI essay/paragraph writer, content improver, PDF merge/split/convert/OCR, image tools',
    category: 'PDF & Document Tools',
    verified: false,
    notes: 'No signup for core tools; files auto-deleted after ~1 hour; ad-supported with a paid ad-free tier'
  },
  {
    name: 'Stirling-PDF',
    url: 'https://stirling.com/app',
    description: 'Open-source PDF editor: merge, split, OCR, convert, edit',
    category: 'PDF & Document Tools',
    verified: true,
    notes: 'Can also be self-hosted; large GitHub project (80k+ stars)'
  },
  {
    name: 'PaperKnife',
    url: 'https://potatameister.github.io/PaperKnife/',
    description: 'Merge, split, compress, edit PDFs 100% locally in-browser',
    category: 'PDF & Document Tools',
    verified: true,
    notes: 'Open source, nothing uploaded to a server'
  },

  // Translation
  {
    name: 'DeepL Translator',
    url: 'https://www.deepl.com/translator',
    description: 'High-quality neural machine translation, 30+ languages, document translation',
    category: 'Translation',
    verified: false,
    notes: 'No login for basic text translation; free-tier text may be used to improve the model (per DeepL\'s privacy policy) — avoid pasting sensitive text'
  },
  {
    name: 'Google Translate',
    url: 'https://translate.google.com',
    description: 'Text, document, and image translation',
    category: 'Translation',
    verified: true,
    notes: 'No account required for standard use'
  },

  // Coding & Developer Tools
  {
    name: 'DuckDuckGo AI Chat (Coding)',
    url: 'https://duck.ai',
    description: 'Ask coding questions to GPT/Claude/Llama models via DDG privacy proxy',
    category: 'Coding & Developer Tools',
    verified: true,
    notes: 'See chatbot section; genuinely the most reliable no-login option for AI coding help'
  },
  {
    name: 'DartPad',
    url: 'https://dartpad.dev',
    description: 'In-browser Dart/Flutter editor with live preview',
    category: 'Coding & Developer Tools',
    verified: true,
    notes: 'Not generative AI, but a solid no-login dev sandbox'
  },
  {
    name: 'Python Tutor',
    url: 'https://pythontutor.com',
    description: 'Visualizes code execution step-by-step',
    category: 'Coding & Developer Tools',
    verified: true,
    notes: 'Great for learning/debugging, no login'
  },
  {
    name: 'CyberChef',
    url: 'https://gchq.github.io/CyberChef',
    description: 'Browser-based "cyber Swiss army knife" for encoding/decoding/hashing/data analysis',
    category: 'Coding & Developer Tools',
    verified: true,
    notes: 'Open source (GCHQ), no AI but genuinely useful alongside AI coding tools'
  },
  {
    name: 'Local AI coding agents (Ollama + Continue.dev)',
    url: 'https://ollama.com',
    description: 'Run coding models like DeepSeek Coder or CodeLlama entirely on your own machine',
    category: 'Coding & Developer Tools',
    verified: true,
    notes: 'Requires install (not browser-only) but zero account, zero cloud, unlimited use'
  },

  // Text-to-Speech & Voice
  {
    name: 'WebLLM (Voice / Local Run)',
    url: 'https://webllm.mlc.ai',
    description: 'Runs LLMs entirely in-browser via WebGPU (not voice, but notable for the nothing-leaves-device category)',
    category: 'Text-to-Speech & Voice',
    verified: true,
    notes: 'Open source (MLC AI), no signup'
  },

  // All-in-One Toolkits
  {
    name: 'TinyWow All-in-One',
    url: 'https://tinywow.com',
    description: 'AI writing + PDF + image + video tools, 250+ tools total',
    category: 'All-in-One Toolkits',
    verified: false,
    notes: 'Good single stop for many one-off tasks'
  },
  {
    name: 'FckSignups / NoSignups directory',
    url: 'https://nosignups.net',
    description: 'Curated directory of open-source, no-signup, in-browser tools',
    category: 'All-in-One Toolkits',
    verified: true,
    notes: 'The directory covered in your earlier request — good companion list to this one'
  }
];

export const AI_CATEGORIES = [
  'All',
  'Chatbots & General Assistants',
  'Image Generation',
  'Photo & Image Editing',
  'Transcription & Speech-to-Text',
  'Video Generation & Editing',
  'Writing, Grammar & Paraphrasing',
  'PDF & Document Tools',
  'Translation',
  'Coding & Developer Tools',
  'Text-to-Speech & Voice',
  'All-in-One Toolkits'
];
