import EmojiPicker, {
  Emoji,
  EmojiStyle,
  Theme as EmojiTheme,
} from "emoji-picker-react";

import { ModelType } from "../store";

import BotIcon from "../icons/bot.svg";
import BlackBotIcon from "../icons/black-bot.svg";
import { useUserAvatar } from "@/app/copiolt/copilot";

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
  if (props.model) {
    return (
      <div className="no-dark">
        {props.model?.startsWith("gpt-4") ||
        props.model?.startsWith("chatgpt-4o") ? (
          <BlackBotIcon className="user-avatar" />
        ) : (
          <BotIcon className="user-avatar" />
        )}
      </div>
    );
  }

  return (
    <div className="user-avatar">
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
    <div className="user-avatar">
      <Emoji
        unified={"1f60e"}
        size={size ? size : 25}
        getEmojiUrl={getChatAvatarUrl}
      />
    </div>
  ) : (
    <div className="user-avatar">
      <BotIcon />
    </div>
  );
}
