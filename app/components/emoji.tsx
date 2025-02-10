import EmojiPicker, {
  Emoji,
  EmojiStyle,
  Theme as EmojiTheme,
} from "emoji-picker-react";

import { ModelType } from "../store";

import BotIconDefault from "../icons/llm-icons/default.svg";
import BotIconOpenAI from "../icons/llm-icons/openai.svg";
import BotIconGemini from "../icons/llm-icons/gemini.svg";
import BotIconClaude from "../icons/llm-icons/claude.svg";
import BotIconDeepseek from "../icons/llm-icons/deepseek.svg";
import BotIconMoonshot from "../icons/llm-icons/moonshot.svg";
import BotIconQwen from "../icons/llm-icons/qwen.svg";
import BotIconWenxin from "../icons/llm-icons/wenxin.svg";
import BotIconGrok from "../icons/llm-icons/grok.svg";
import BotIconHunyuan from "../icons/llm-icons/hunyuan.svg";
import BotIconDoubao from "../icons/llm-icons/doubao.svg";
import BotIconChatglm from "../icons/llm-icons/chatglm.svg";
import BotIconSpark from "../icons/llm-icons/spark.svg";
import BotIcon from "../icons/bot.svg";
import { useUserAvatar } from "@/app/copiolt/copilot";
import { ServiceProvider } from "@/app/constant";
import styles from "@/app/components/ui-lib.module.scss";
import React from "react";

export function getChatAvatarUrl(unified: string, style: EmojiStyle) {
  const UserAvatar = () => {
    return useUserAvatar();
  };
  const userAvatar = UserAvatar();
  if (userAvatar) {
    return userAvatar;
  }
  return `https://forum.xr21.me/wp-content/uploads/2023/05/XIcon-64.png`;
}

export function getEmojiUrl(unified: string, style: EmojiStyle) {
  // Whoever owns this Content Delivery Network (CDN), I am using your CDN to serve emojis
  // Old CDN broken, so I had to switch to this one
  // Author: https://github.com/H0llyW00dzZ
  return `https://fastly.jsdelivr.net/npm/emoji-datasource-apple/img/${style}/64/${unified}.png`;
}

export function AvatarPicker(props: {
  onEmojiClick: (emojiId: string) => void;
}) {
  return (
    <EmojiPicker
      width={"100%"}
      lazyLoadEmojis
      theme={EmojiTheme.AUTO}
      getEmojiUrl={getEmojiUrl}
      onEmojiClick={(e) => {
        props.onEmojiClick(e.unified);
      }}
    />
  );
}

export function Avatar(props: { model?: ModelType; avatar?: string }) {
  let LlmIcon = BotIconDefault;

  if (props.model) {
    console.log("Avatar", props.model);
    const modelName = props.model;
    const serviceProvider = modelName.split("@")[1] as ServiceProvider;
    console.log(
      "Avatar",
      serviceProvider,
      serviceProvider === ServiceProvider.Ollama,
    );
    const isAnthropic = serviceProvider === ServiceProvider.Anthropic;
    const isTencent = serviceProvider === ServiceProvider.Tencent;
    const isMoonshot = serviceProvider === ServiceProvider.Moonshot;
    const isOllama = serviceProvider === ServiceProvider.Ollama;
    const isByteDance = serviceProvider === ServiceProvider.ByteDance;
    const isBaidu = serviceProvider === ServiceProvider.Baidu;
    const isAlibaba = serviceProvider === ServiceProvider.Alibaba;
    const isIflytek = serviceProvider === ServiceProvider.Iflytek;
    const isAzure = serviceProvider === ServiceProvider.Azure;
    const isGoogle = serviceProvider === ServiceProvider.Google;
    const isGlm = serviceProvider === ServiceProvider.ChatGLM;
    const isXAi = serviceProvider === ServiceProvider.XAI;
    const isDeepSeek = serviceProvider === ServiceProvider.DeepSeek;
    const isOpenAI = serviceProvider === ServiceProvider.OpenAI;
    const isSiliconFlow = serviceProvider === ServiceProvider.SiliconFlow;

    if (isOllama) {
      return (
        <div className="no-dark">
          <img
            className={styles["hint-icon"]}
            width={30}
            height={30}
            src={"provider/ollama.png"}
            alt={""}
          />
        </div>
      );
    }
    if (isSiliconFlow) {
      return (
        <div className="no-dark">
          <img
            className={styles["hint-icon"]}
            width={30}
            height={30}
            src={"provider/siliconflow.png"}
            alt={""}
          />
        </div>
      );
    }
    if (isAzure) {
      return (
        <div className="no-dark">
          <img
            className={styles["hint-icon"]}
            width={30}
            height={30}
            src={"provider/azure.png"}
            alt={""}
          />
        </div>
      );
    }
    if (isOpenAI) {
      LlmIcon = BotIconOpenAI;
    }
    if (isAnthropic) {
      LlmIcon = BotIconClaude;
    }
    if (isTencent) {
      LlmIcon = BotIconHunyuan;
    }
    if (isMoonshot) {
      LlmIcon = BotIconMoonshot;
    }
    if (isByteDance) {
      LlmIcon = BotIconDoubao;
    }
    if (isBaidu) {
      LlmIcon = BotIconWenxin;
    }
    if (isAlibaba) {
      LlmIcon = BotIconQwen;
    }
    if (isIflytek) {
      LlmIcon = BotIconSpark;
    }

    if (isGoogle) {
      LlmIcon = BotIconGemini;
    }
    if (isGlm) {
      LlmIcon = BotIconChatglm;
    }
    if (isDeepSeek) {
      LlmIcon = BotIconDeepseek;
    }
    if (isXAi) {
      LlmIcon = BotIconGrok;
    }
    return (
      <div className="no-dark">
        <LlmIcon className="user-avatar" width={30} height={30} />
      </div>
    );
  }

  return (
    <div className="user-avatar no-dark">
      {props.avatar && <EmojiAvatar avatar={props.avatar} />}
    </div>
  );
}

export function EmojiAvatar(props: { avatar: string; size?: number }) {
  return (
    <Emoji
      unified={props.avatar}
      size={props.size ?? 18}
      getEmojiUrl={getEmojiUrl}
    />
  );
}

export function UserAvatar({ size }: { size?: number }) {
  return useUserAvatar() ? (
    <div className="user-avatar no-dark">
      <Emoji
        unified={"1f60e"}
        size={size ? size : 25}
        getEmojiUrl={getChatAvatarUrl}
      />
    </div>
  ) : (
    <div className="user-avatar no-dark">
      <BotIcon />
    </div>
  );
}
