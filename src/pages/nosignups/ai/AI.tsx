import React from 'react';
import { Bot, ArrowUpRight, Cpu } from 'lucide-react';
import styles from './AI.module.css';

interface AIItem {
  name: string;
  url: string;
  desc: string;
}

interface AISection {
  title: string;
  items: AIItem[];
}

const SECTIONS: AISection[] = [
  {
    title: 'Official Model Sites',
    items: [
      { name: 'Qwen Studio', url: 'https://chat.qwen.ai/', desc: 'Official portal to interact with Qwen language models' },
      { name: 'DeepSeek', url: 'https://chat.deepseek.com/', desc: 'Chat interface for DeepSeek V3 and R1 reasoning models' },
      { name: 'Z.ai', url: 'https://chat.z.ai/', desc: 'Official GLM reasoning and chat model sandbox' },
      { name: 'Google AI Studio', url: 'https://aistudio.google.com/app/prompts/new_chat', desc: 'Direct developer access to Gemini Pro and Flash models' },
      { name: 'Gemini', url: 'https://gemini.google/', desc: 'Google consumer chat interface powered by Gemini' },
      { name: 'Kimi', url: 'https://www.kimi.com/', desc: 'High-context length chat client powered by Moonshot AI' },
      { name: 'Meta AI', url: 'https://www.meta.ai/', desc: 'Meta chatbot built on open Llama model stacks' },
      { name: 'ChatGPT', url: 'https://chatgpt.com/', desc: 'OpenAI signature chat interface running GPT-4o models' },
      { name: 'LongCat', url: 'https://longcat.chat/', desc: 'Specialized high-context reasoning model playground' },
      { name: 'MiMo Studio', url: 'https://aistudio.xiaomimimo.com/', desc: 'Official MiMo AI models playground' },
      { name: 'Grok', url: 'https://grok.com/', desc: 'xAI Grok real-time info reasoning chat system' },
      { name: 'Microsoft Copilot', url: 'https://copilot.microsoft.com', desc: 'GPT-integrated creative and search assistant' },
      { name: 'Claude', url: 'https://claude.ai/', desc: 'Anthropic Claude Sonnet high-reasoning writing chat model' }
    ]
  },
  {
    title: 'Multiple Model Sites',
    items: [
      { name: 'ISH', url: 'https://beta.ish.chat/', desc: 'Multi-LLM developer chatbot playground' },
      { name: 'Arena', url: 'https://arena.ai/text/direct', desc: 'Compare LLM models side-by-side in direct chat' },
      { name: 'Indic LLM Arena', url: 'https://arena.ai4bharat.org/#/chat', desc: 'LMSYS-style chatbot arena for Indic regional languages' },
      { name: 'Woozlit', url: 'https://woozlit.com/', desc: 'Aggregator portal running multiple open-weight models' },
      { name: 'NVIDIA NIM', url: 'https://build.nvidia.com/models', desc: 'Run optimized inference on NVIDIA hardware models' },
      { name: 'Together.ai', url: 'https://chat.together.ai/', desc: 'Fast inference sandbox for open models' },
      { name: 'Lumo', url: 'https://lumo.proton.me/', desc: 'Privacy-focused multi-model chat dashboard' },
      { name: 'AI Assistant', url: 'https://aiassistantbot.pages.dev/', desc: 'Simple chat interface utilizing several AI models' },
      { name: 'Cerebras Chat', url: 'https://chat.cerebras.ai/', desc: 'Ultra-fast inference platform running open LLMs' }
    ]
  },
  {
    title: 'Specialized Chatbots',
    items: [
      { name: 'NotebookLM', url: 'https://notebooklm.google.com/', desc: 'Upload documents to generate notes, summaries, and audio podcasts' },
      { name: 'Google AI Mode', url: 'https://google.com/aimode', desc: 'AI search query visualizer and summarizer' },
      { name: 'Ask Brave', url: 'https://search.brave.com/ask', desc: 'Privacy-first search query answer engine' },
      { name: 'TextFX', url: 'https://textfx.withgoogle.com/', desc: 'AI-assisted creative writing and wordplay tool suite' },
      { name: 'Perplexity', url: 'https://www.perplexity.ai/', desc: 'AI conversational search engine returning cited sources' },
      { name: 'iAsk AI', url: 'https://iask.ai/', desc: 'Free research chatbot answering queries with formatted papers references' },
      { name: 'Exa', url: 'https://exa.ai/search', desc: 'AI-powered search query index for research datasets' },
      { name: 'Sci-Bot', url: 'https://sci-bot.ru/', desc: 'Research assistant integrated with Sci-Hub index databases' },
      { name: 'SciSpace', url: 'https://scispace.com/', desc: 'AI research assistant to parse papers and explain calculations' },
      { name: 'Elicit', url: 'https://elicit.com/', desc: 'Automate research workflows by summarizing academic papers' }
    ]
  },
  {
    title: 'Local AI Frontends',
    items: [
      { name: 'SillyTavern', url: 'https://docs.sillytavern.app/', desc: 'Advanced frontend for power-users, supporting multiple API integrations' },
      { name: 'Open WebUI', url: 'https://openwebui.com/', desc: 'Extremely rich self-hosted ChatGPT-like web interface' },
      { name: 'Jan', url: 'https://jan.ai/', desc: 'Open-source desktop launcher to run offline LLMs on your computer' },
      { name: 'LM Studio', url: 'https://lmstudio.ai/', desc: 'Run and build custom configurations around local LLMs offline' },
      { name: 'TextGen', url: 'https://github.com/oobabooga/textgen', desc: 'Gradio web UI client for running local models' },
      { name: 'GPT4Free', url: 'https://github.com/xtekky/gpt4free', desc: 'Developer tool bypassing chat service limitations' },
      { name: 'Msty', url: 'https://msty.app/', desc: 'Offline desktop launcher to converse with multiple local and cloud models' },
      { name: 'Cherry Studio', url: 'https://www.cherry-ai.com/', desc: 'Cross-platform developer frontend client for various AI APIs' },
      { name: 'Chatbox', url: 'https://chatboxai.app/', desc: 'Multiplatform desktop client supporting API keys' },
      { name: 'LobeHub', url: 'https://lobechat.com/chat', desc: 'Modern UI framework dashboard for AI chat apps' },
      { name: 'LibreChat', url: 'https://librechat.ai/', desc: 'Enhanced cloning client replicating ChatGPT user features' },
      { name: 'AnythingLLM', url: 'https://anythingllm.com/', desc: 'Document chat client supporting local vectors and models' }
    ]
  },
  {
    title: 'Self-Hosting Tools',
    items: [
      { name: 'llama.cpp', url: 'https://llama.app/', desc: 'Inference engine for Llama models in pure C/C++' },
      { name: 'KoboldCpp', url: 'https://github.com/LostRuins/koboldcpp', desc: 'llama.cpp build bundled with an offline roleplay GUI' },
      { name: 'Petals', url: 'https://petals.dev/', desc: 'Run large language models collectively via BitTorrent-style sharing' },
      { name: 'Ollama', url: 'https://ollama.com/', desc: 'Simple CLI server to run, pull, and compile local LLM packages' },
      { name: 'GPT4All', url: 'https://www.nomic.ai/gpt4all', desc: 'Free-to-use local chatbot launcher with built-in privacy' },
      { name: 'LocalAI', url: 'https://localai.io/', desc: 'Self-hosted OpenAI-compliant REST API server for local models' }
    ]
  },
  {
    title: 'Roleplaying Chatbots',
    items: [
      { name: 'Perchance', url: 'https://perchance.org/ai-character-chat', desc: 'Free, un-moderated AI character chat runner with image outputs' },
      { name: 'PygmalionAI', url: 'https://pygmalion.chat/', desc: 'Open roleplay models and community dataset logs' },
      { name: 'Agnai', url: 'https://agnai.chat/', desc: 'Multi-character chat client supporting local and cloud APIs' },
      { name: 'FlowGPT', url: 'https://flowgpt.com', desc: 'Prompt sharing repository and active character simulator' },
      { name: 'HammerAI', url: 'https://www.hammerai.com/characters', desc: 'Run character simulations directly in your web browser' },
      { name: 'AI Dungeon', url: 'https://aidungeon.com/', desc: 'Text-adventure RPG simulator powered by AI models' },
      { name: 'KoboldAI', url: 'https://koboldai.com/', desc: 'Front-end client for AI story writing and text adventures' }
    ]
  },
  {
    title: 'Video Generation',
    items: [
      { name: 'Snapgen AI', url: 'https://snapgen.ai/app/video-gen/', desc: 'Generate high-definition video clips using Veo and Sora models' },
      { name: 'Google Flow', url: 'https://labs.google/fx/tools/flow', desc: 'Creative Google Labs video synthesis tools' },
      { name: 'Bing Create (Video)', url: 'https://www.bing.com/images/create/ai-video-generator', desc: 'Microsoft Copilot video generator portal' },
      { name: 'Wan AI', url: 'https://create.wan.video/explore/video/generate?model=wan2.7', desc: 'Interactive Wan 2.7 model video generator' },
      { name: 'HunyuanVideo', url: 'https://aistudio.tencent.com/modelSquare/home/play?modelId=303&from=/visual', desc: 'Tencent Hunyuan video generation platform' },
      { name: 'Klipy', url: 'https://klipy.com/create/gif-maker/', desc: 'Veo-powered GIF and video creator' },
      { name: 'PixVerse', url: 'https://pixverse.ai/', desc: 'AI-assisted video generation tool for short cinematic clips' },
      { name: 'Genmo', url: 'https://www.genmo.ai/', desc: 'Synthesize images and text prompts into animations' }
    ]
  },
  {
    title: 'Image Generation',
    items: [
      { name: 'Google Flow (Image)', url: 'https://labs.google/fx/tools/flow', desc: 'Google creative lab image generator' },
      { name: 'Hunyuan Image Generation', url: 'https://aistudio.tencent.com/chat/HunyuanDefault?modelId=Hunyuan-Image-3.0-Instruct', desc: 'Tencent Hunyuan 3.0 image generation chat' },
      { name: 'Bing Create (Images)', url: 'https://www.bing.com/images/create', desc: 'High-quality DALL-E 3 image generator' },
      { name: 'Design Arena', url: 'https://www.designarena.ai/', desc: 'Aggregated list of Stable Diffusion image generation hubs' }
    ]
  }
];

const AI: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <Bot size={26} className={styles.icon} />
          <h2>Artificial Intelligence</h2>
        </div>
        <p className={styles.subtitle}>
          Browse official LLM platforms, specialized research assistants, self-hosting software, and creative image/video generators.
        </p>
      </header>

      <div className={styles.sectionsGrid}>
        {SECTIONS.map((sec) => (
          <section key={sec.title} className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <Cpu size={18} className={styles.sectionIcon} />
              <h3>{sec.title}</h3>
            </div>
            
            <div className={styles.cardsGrid}>
              {sec.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.card} glass`}
                >
                  <div className={styles.cardInfo}>
                    <h4 className={styles.cardName}>
                      {item.name}
                      <ArrowUpRight size={14} className={styles.arrow} />
                    </h4>
                    <p className={styles.cardDesc}>{item.desc}</p>
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.hostname}>{new URL(item.url).hostname}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default AI;
