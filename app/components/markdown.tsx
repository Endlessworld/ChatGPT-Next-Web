import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import RehypeKatex from "rehype-katex";
import RemarkGfm from "remark-gfm";
import RehypeHighlight from "rehype-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { useRef, useState, RefObject, useEffect, useMemo } from "react";
import { copyToClipboard, useWindowSize } from "../utils";
import mermaid from "mermaid";
import Locale from "../locales";
import LoadingIcon from "../icons/three-dots.svg";
import ReloadButtonIcon from "../icons/reload.svg";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { showImageModal, FullScreen } from "./ui-lib";
import {
  ArtifactsShareButton,
  HTMLPreview,
  HTMLPreviewHander,
} from "./artifacts";
import { useChatStore } from "../store";
import { IconButton } from "./button";

import { useAppConfig } from "../store/config";
import clsx from "clsx";

// Tool Result Component - Collapsible display of tool call results
export function ToolResult(props: {
  tool: {
    id: string;
    function?: { name: string };
    content?: string;
    isError?: boolean;
  };
}) {
  const [collapsed, setCollapsed] = useState(true);
  const codeRef = useRef<HTMLElement>(null);
  const { tool } = props;
  const content = tool.content;

  // Detect content format for syntax highlighting
  const detectLanguage = (text: string): string => {
    if (!text) return "";
    const trimmed = text.trim();
    if (trimmed.startsWith("{")) return "json";
    if (trimmed.startsWith("<")) return "xml";
    if (trimmed.startsWith("<?xml")) return "xml";
    if (trimmed.startsWith("<?php")) return "php";
    if (trimmed.startsWith("<!DOCTYPE")) return "html";
    if (trimmed.startsWith("SELECT") || trimmed.startsWith("INSERT"))
      return "sql";
    return "";
  };

  const language = detectLanguage(content || "");

  // Highlight content when expanded
  useEffect(() => {
    if (!content || !codeRef.current) return;
    if (!collapsed) {
      if (language) {
        try {
          const result = hljs.highlightAuto(content);
          codeRef.current.innerHTML = result.value;
        } catch {
          codeRef.current.textContent = content;
        }
      } else {
        codeRef.current.textContent = content;
      }
    }
  }, [collapsed, content, language]);

  // If no content, don't render
  if (!content) return null;

  return (
    <div className="tool-result-container" style={{ margin: "8px 0" }}>
      <div
        className="tool-result-header"
        onClick={() => setCollapsed(!collapsed)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          userSelect: "none",
          padding: "4px 0",
        }}
      >
        <span
          className={clsx("tool-result-arrow", { collapsed })}
          style={{
            display: "inline-flex",
            transition: "transform 0.2s",
            transform: collapsed ? "rotate(0deg)" : "rotate(90deg)",
          }}
        >
          ▶
        </span>
        <span className="tool-result-name" style={{ fontWeight: 500 }}>
          {tool.function?.name || "Tool Call"}
        </span>
        {/*{language && (*/}
        {/*  <span*/}
        {/*    className="tool-result-lang"*/}
        {/*    style={{*/}
        {/*      fontSize: "11px",*/}
        {/*      color: "var(--secondary-text)",*/}
        {/*      backgroundColor: "var(--hover-color)",*/}
        {/*      padding: "2px 6px",*/}
        {/*      borderRadius: "4px",*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    {language.toUpperCase()}*/}
        {/*  </span>*/}
        {/*)}*/}
        <span
          className="tool-result-status"
          style={{
            fontSize: "12px",
            color: tool.isError ? "#ef4444" : "#22c55e",
          }}
        >
          {tool.isError === false
            ? "✓ Success"
            : tool.isError
              ? "✗ Error"
              : "..."}
        </span>
      </div>
      {!collapsed && (
        <div
          className="tool-result-content"
          style={{
            marginLeft: "24px",
            padding: "8px",
            backgroundColor: "var(--gray)",
            borderRadius: "6px",
            fontSize: "13px",
            maxHeight: "400px",
            overflow: "auto",
          }}
        >
          <pre
            style={{
              margin: 0,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            }}
          >
            <code
              ref={codeRef}
              className={language ? `hljs language-${language}` : ""}
              style={{ display: "block" }}
            >
              {!language && content}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}

export function Mermaid(props: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (props.code && ref.current) {
      mermaid
        .run({
          nodes: [ref.current],
          suppressErrors: true,
        })
        .catch((e) => {
          setHasError(true);
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

  if (hasError) {
    return null;
  }

  return (
    <div
      className={clsx("no-dark", "mermaid")}
      style={{
        cursor: "pointer",
        overflow: "auto",
      }}
      ref={ref}
      onClick={() => viewSvgInNewWindow()}
    >
      {props.code}
    </div>
  );
}

export function PreCode(props: { children: any }) {
  const ref = useRef<HTMLPreElement>(null);
  const previewRef = useRef<HTMLPreviewHander>(null);
  const [mermaidCode, setMermaidCode] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const { height } = useWindowSize();
  const chatStore = useChatStore();
  const session = chatStore.currentSession();

  const renderArtifacts = useDebouncedCallback(() => {
    if (!ref.current) return;
    const mermaidDom = ref.current.querySelector("code.language-mermaid");
    if (mermaidDom) {
      setMermaidCode((mermaidDom as HTMLElement).innerText);
    }
    const htmlDom = ref.current.querySelector("code.language-html");
    const refText = ref.current.querySelector("code")?.innerText;
    if (htmlDom) {
      setHtmlCode((htmlDom as HTMLElement).innerText);
    } else if (
      refText?.startsWith("<!DOCTYPE") ||
      refText?.startsWith("<svg") ||
      refText?.startsWith("<?xml")
    ) {
      setHtmlCode(refText);
    }
  }, 600);

  const config = useAppConfig();
  const enableArtifacts =
    session.mask?.enableArtifacts !== false && config.enableArtifacts;

  //Wrap the paragraph for plain-text
  useEffect(() => {
    if (ref.current) {
      const codeElements = ref.current.querySelectorAll(
        "code",
      ) as NodeListOf<HTMLElement>;
      const wrapLanguages = [
        "",
        "md",
        "markdown",
        "text",
        "txt",
        "plaintext",
        "tex",
        "latex",
      ];
      codeElements.forEach((codeElement) => {
        let languageClass = codeElement.className.match(/language-(\w+)/);
        let name = languageClass ? languageClass[1] : "";
        if (wrapLanguages.includes(name)) {
          codeElement.style.whiteSpace = "pre-wrap";
        }
      });
      setTimeout(renderArtifacts, 1);
    }
  }, [renderArtifacts]);

  return (
    <>
      <pre ref={ref}>
        <span
          className="copy-code-button"
          onClick={() => {
            if (ref.current) {
              copyToClipboard(
                ref.current.querySelector("code")?.innerText ?? "",
              );
            }
          }}
        ></span>
        {props.children}
      </pre>
      {mermaidCode.length > 0 && (
        <Mermaid code={mermaidCode} key={mermaidCode} />
      )}
      {htmlCode.length > 0 && enableArtifacts && (
        <FullScreen className="no-dark html" right={70}>
          <ArtifactsShareButton
            style={{ position: "absolute", right: 20, top: 10 }}
            getCode={() => htmlCode}
          />
          <IconButton
            style={{ position: "absolute", right: 120, top: 10 }}
            bordered
            icon={<ReloadButtonIcon />}
            shadow
            onClick={() => previewRef.current?.reload()}
          />
          <HTMLPreview
            ref={previewRef}
            code={htmlCode}
            autoHeight={!document.fullscreenElement}
            height={!document.fullscreenElement ? 600 : height}
          />
        </FullScreen>
      )}
    </>
  );
}

function CustomCode(props: { children: any; className?: string }) {
  const chatStore = useChatStore();
  const session = chatStore.currentSession();
  const config = useAppConfig();
  const enableCodeFold =
    session.mask?.enableCodeFold !== false && config.enableCodeFold;

  const ref = useRef<HTMLPreElement>(null);
  const [collapsed, setCollapsed] = useState(true);
  const [showToggle, setShowToggle] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const codeHeight = ref.current.scrollHeight;
      setShowToggle(codeHeight > 400);
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [props.children]);

  const toggleCollapsed = () => {
    setCollapsed((collapsed) => !collapsed);
  };
  const renderShowMoreButton = () => {
    if (showToggle && enableCodeFold && collapsed) {
      return (
        <div
          className={clsx("show-hide-button", {
            collapsed,
            expanded: !collapsed,
          })}
        >
          <button onClick={toggleCollapsed}>{Locale.NewChat.More}</button>
        </div>
      );
    }
    return null;
  };
  return (
    <>
      <code
        className={clsx(props?.className)}
        ref={ref}
        style={{
          maxHeight: enableCodeFold && collapsed ? "400px" : "none",
          overflowY: "hidden",
        }}
      >
        {props.children}
      </code>

      {renderShowMoreButton()}
    </>
  );
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

function tryWrapHtmlCode(text: string) {
  // try add wrap html code (fixed: html codeblock include 2 newline)
  // ignore embed codeblock
  if (text.includes("```")) {
    return text;
  }
  return text
    .replace(
      /([`]*?)(\w*?)([\n\r]*?)(<!DOCTYPE html>)/g,
      (match, quoteStart, lang, newLine, doctype) => {
        return !quoteStart ? "\n```html\n" + doctype : match;
      },
    )
    .replace(
      /(<\/body>)([\r\n\s]*?)(<\/html>)([\n\r]*)([`]*)([\n\r]*?)/g,
      (match, bodyEnd, space, htmlEnd, newLine, quoteEnd) => {
        return !quoteEnd ? bodyEnd + space + htmlEnd + "\n```\n" : match;
      },
    );
}

function MarkDownContent(props: {
  content: string;
  tools?: Array<{
    id: string;
    function?: { name: string };
    content?: string;
    isError?: boolean;
  }>;
}) {
  const { content, tools } = props;

  // Prepare escaped content
  const escapedContent = useMemo(() => {
    return tryWrapHtmlCode(escapeBrackets(content));
  }, [content]);

  // If no tools, render normally
  if (!tools || tools.length === 0) {
    return (
      <ReactMarkdown
        remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
        rehypePlugins={[
          RehypeKatex,
          [
            RehypeHighlight,
            {
              detect: true,
              ignoreMissing: true,
            },
          ],
        ]}
        components={{
          pre: PreCode,
          code: CustomCode,
          p: (pProps) => <p {...pProps} dir="auto" />,
          a: (aProps) => {
            const href = aProps.href || "";
            if (/\.(aac|mp3|opus|wav)$/.test(href)) {
              return (
                <figure>
                  <audio controls src={href}></audio>
                </figure>
              );
            }
            if (/\.(3gp|3g2|webm|ogv|mpeg|mp4|avi)$/.test(href)) {
              return (
                <video controls width="99.9%">
                  <source src={href} />
                </video>
              );
            }
            const isInternal = /^\/#/i.test(href) || href.includes("self");
            const target = isInternal ? "_self" : (aProps.target ?? "_blank");
            return <a {...aProps} target={target} />;
          },
        }}
      >
        {escapedContent}
      </ReactMarkdown>
    );
  }

  // Split content by tool placeholders
  const parts = content.split(/%%tool_call_(\d+)%%/g);
  const result: React.ReactNode[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const isPlaceholder = i % 2 === 1;

    if (isPlaceholder) {
      const toolIndex = parseInt(part, 10);
      const tool = tools[toolIndex];
      if (tool) {
        result.push(<ToolResult key={`tool-${toolIndex}`} tool={tool} />);
      }
    } else if (part) {
      const escapedContent = tryWrapHtmlCode(escapeBrackets(part));
      result.push(
        <ReactMarkdown
          key={`md-${i}`}
          remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
          rehypePlugins={[
            RehypeKatex,
            [
              RehypeHighlight,
              {
                detect: true,
                ignoreMissing: true,
              },
            ],
          ]}
          components={{
            pre: PreCode,
            code: CustomCode,
            p: (pProps) => <p {...pProps} dir="auto" />,
            a: (aProps) => {
              const href = aProps.href || "";
              if (/\.(aac|mp3|opus|wav)$/.test(href)) {
                return (
                  <figure>
                    <audio controls src={href}></audio>
                  </figure>
                );
              }
              if (/\.(3gp|3g2|webm|ogv|mpeg|mp4|avi)$/.test(href)) {
                return (
                  <video controls width="99.9%">
                    <source src={href} />
                  </video>
                );
              }
              const isInternal = /^\/#/i.test(href) || href.includes("self");
              const target = isInternal ? "_self" : (aProps.target ?? "_blank");
              return <a {...aProps} target={target} />;
            },
          }}
        >
          {escapedContent}
        </ReactMarkdown>,
      );
    }
  }

  return <>{result}</>;
}

export const MarkdownContent = React.memo(MarkDownContent);

export function Markdown(
  props: {
    content: string;
    loading?: boolean;
    fontSize?: number;
    fontFamily?: string;
    parentRef?: RefObject<HTMLDivElement>;
    defaultShow?: boolean;
    tools?: Array<{
      id: string;
      function?: { name: string };
      content?: string;
      isError?: boolean;
    }>;
  } & React.DOMAttributes<HTMLDivElement>,
) {
  const mdRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="markdown-body"
      style={{
        fontSize: `${props.fontSize ?? 14}px`,
        fontFamily: props.fontFamily || "inherit",
      }}
      ref={mdRef}
      onContextMenu={props.onContextMenu}
      onDoubleClickCapture={props.onDoubleClickCapture}
      dir="auto"
    >
      {props.loading ? (
        <LoadingIcon />
      ) : (
        <MarkdownContent content={props.content} tools={props.tools} />
      )}
    </div>
  );
}
