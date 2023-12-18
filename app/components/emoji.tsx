import EmojiPicker, {
  Emoji,
  EmojiStyle,
  Theme as EmojiTheme,
} from "emoji-picker-react";

import { ModelType } from "../store";
import { useUserAvatar } from "../utils";
import BotIcon from "../icons/bot.svg";
import BlackBotIcon from "../icons/black-bot.svg";
import { ChatControllerPool } from "@/app/client/controller";

export function getChatAvatarUrl(unified: string, style: EmojiStyle) {
  const UserAvatar = () => {
    return useUserAvatar();
  };
  const userAvatar = UserAvatar();
  if (
    userAvatar &&
    userAvatar !==
      "https://secure.gravatar.com/avatar/cfc1390c122d303c4ca31151bb3bbf9d?s=96&d=mm&r=g"
  ) {
    return userAvatar;
  }
  return `https://cdn.staticfile.org/emoji-datasource-apple/15.0.1/img/${style}/64/${unified}.png`;
}

export function getEmojiPickerUrl(unified: string, style: EmojiStyle) {
  return `https://cdn.staticfile.org/emoji-datasource-apple/15.0.1/img/${style}/64/${unified}.png`;
}

export function AvatarPicker(props: {
  onEmojiClick: (emojiId: string) => void;
}) {
  return (
    <EmojiPicker
      lazyLoadEmojis
      theme={EmojiTheme.AUTO}
      getEmojiUrl={getEmojiPickerUrl}
      onEmojiClick={(e) => {
        props.onEmojiClick(e.unified);
      }}
    />
  );
}

export function Avatar(props: {
  model?: ModelType;
  avatar?: string;
  size?: number;
  isChatAvatar?: boolean;
}) {
  if (props.model) {
    return (
      <div className="no-dark">
        {props.model?.startsWith("gpt-4") ? (
          <BlackBotIcon className="user-avatar" />
        ) : (
          <BotIcon
            className={
              ChatControllerPool.hasPending()
                ? "user-avatar-pending"
                : "user-avatar"
            }
          />
        )}
      </div>
    );
  }

  return (
    <div className="user-avatar">
      {props.avatar && (
        <EmojiAvatar
          avatar={props.avatar}
          size={props.size}
          isChatAvatar={props.isChatAvatar}
        />
      )}
    </div>
  );
}

export function EmojiAvatar(props: {
  avatar: string;
  size?: number;
  isChatAvatar?: boolean;
}) {
  return (
    <Emoji
      unified={props.avatar}
      size={props.size ?? 18}
      getEmojiUrl={props.isChatAvatar ? getChatAvatarUrl : getEmojiPickerUrl}
    />
  );
}
