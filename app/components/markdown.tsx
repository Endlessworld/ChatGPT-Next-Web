import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";

import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import RehypeKatex from "rehype-katex";
import RemarkGfm from "remark-gfm";
import hljs from "highlight.js";
import React, { RefObject, useEffect, useRef, useMemo } from "react";
import { copyToClipboard } from "../utils";
import mermaid from "mermaid";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import LoadingIcon from "../icons/three-dots.svg";
import { showImageModal } from "./ui-lib";
import { CodeProps } from "react-markdown/lib/ast-to-react";
import styles from "./markdown.module.scss";
import { Theme, useAppConfig } from "@/app/store";
import { CODE_STYLES } from "@/app/constant";

export function Mermaid(props: { code: string; onError: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.code && ref.current) {
      mermaid
        .run({
          nodes: [ref.current],
        })
        .catch((e) => {
          props.onError();
          console.error("[Mermaid] ", e.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.code]);

  function viewSvgInNewWindow() {
    const svg = ref.current?.querySelector("svg");
    if (!svg) return;
    const text = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([text], { type: "image/svg+xml" });
    showImageModal(URL.createObjectURL(blob));
  }

  return (
    <div
      className="no-dark"
      style={{
        cursor: "pointer",
        overflow: "auto",
        backgroundColor: "#fff7f2",
      }}
      ref={ref}
      onClick={() => viewSvgInNewWindow()}
    >
      {props.code}
    </div>
  );
}
function escapeDollarNumber(text: string) {
  let escapedText = "";

  for (let i = 0; i < text.length; i += 1) {
    let char = text[i];
    const nextChar = text[i + 1] || " ";

    if (char === "$" && nextChar >= "0" && nextChar <= "9") {
      char = "\\$";
    }

    escapedText += char;
  }

  return escapedText;
}

function escapeBrackets(text: string) {
  const pattern =
    /(```[\s\S]*?```|`.*?`)|\\\[([\s\S]*?[^\\])\\\]|\\\((.*?)\\\)/g;
  return text.replace(
    pattern,
    (match, codeBlock, squareBracket, roundBracket) => {
      if (codeBlock) {
        return codeBlock;
      } else if (squareBracket) {
        return `$$${squareBracket}$$`;
      } else if (roundBracket) {
        return `$${roundBracket}$`;
      }
      return match;
    },
  );
}

function _MarkDownContent(props: { content: string }) {
  const escapedContent = useMemo(() => {
    console.log("================", props.content);
    return escapeBrackets(escapeDollarNumber(props.content));
  }, [props.content]);

  useEffect(() => {
    hljs.highlightAll();
  }, [props.content]);
  const configStore = useAppConfig();
  return (
    <ReactMarkdown
      remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
      rehypePlugins={[RehypeKatex]}
      components={{
        code: (codeProps: CodeProps) => {
          // console.log(codeProps)
          const codeBlock = (codeProps as any)?.children[0];
          if (!codeBlock) {
            return (
              <code
                className={styles["code-font"]}
                style={{ backgroundColor: "#f9f2f4" }}
              >
                {" "}
              </code>
            );
          }

          const language =
            codeProps?.className?.replace("language-", "") ||
            hljs.highlightAuto(codeBlock ? codeBlock : "").language;
          // console.log(language)
          if (codeProps.inline) {
            return (
              <code
                className={styles["code-font"]}
                style={{
                  backgroundColor: Theme.Dark.includes(configStore.theme)
                    ? "rgb(43, 45, 48)"
                    : "#f9f2f4",
                }}
              >
                {(codeProps as any).children}
              </code>
            );
          }
          // hljs.highlightAll();
          return language === "mermaid" ? (
            <Mermaid code={codeBlock} onError={() => ""} />
          ) : (
            <div>
              <SyntaxHighlighter
                style={
                  CODE_STYLES.find(
                    (style) => style.name === configStore.syntaxHighlighter,
                  )?.style
                }
                language={language}
                // wrapLongLines={true}
                // wrapLines={true}
                showLineNumbers={true}
                startingLineNumber={1}
                showInlineLineNumbers={true}
                lineNumberContainerStyle={{
                  backgroundColor: "#fff7f2",
                  color: "#fa0000",
                  borderRight: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "4px",
                  textAlign: "right",
                  userSelect: "none",
                }}
                customStyle={{
                  border: "0px solid #f1f1f1",
                  margin: "0px",
                  padding: "0px",
                  borderRadius: "3px",
                }}
              >
                {(codeProps as any).children}
              </SyntaxHighlighter>
              <span
                className="copy-code-button"
                onClick={() => {
                  if (codeBlock) {
                    copyToClipboard(codeBlock);
                  }
                }}
              >
                {" "}
              </span>
            </div>
          );
        },
        p: (pProps) => <p {...pProps} dir="auto" />,
        a: (aProps) => {
          const href = aProps.href || "";
          const isInternal = /^\/#/i.test(href) || href.includes("self");
          const target = isInternal ? "_self" : aProps.target ?? "_blank";
          return <a {...aProps} target={target} />;
        },
      }}
    >
      {escapedContent}
    </ReactMarkdown>
  );
}

export const MarkdownContent = React.memo(_MarkDownContent);

export function Markdown(
  props: {
    content: string;
    loading?: boolean;
    fontSize?: number;
    parentRef?: RefObject<HTMLDivElement>;
    defaultShow?: boolean;
  } & React.DOMAttributes<HTMLDivElement>,
) {
  const mdRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="markdown-body"
      style={{
        fontSize: `${props.fontSize ?? 14}px`,
      }}
      ref={mdRef}
      onContextMenu={props.onContextMenu}
      onDoubleClickCapture={props.onDoubleClickCapture}
      dir="auto"
    >
      {props.loading ? (
        <LoadingIcon />
      ) : (
        <MarkdownContent content={props.content} />
      )}
    </div>
  );
}
