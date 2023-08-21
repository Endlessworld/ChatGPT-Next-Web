import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import styles from "./markdown.module.scss";
import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import RehypeKatex from "rehype-katex";
import RemarkGfm from "remark-gfm";
import hljs from "highlight.js";
import { useRef, useState, RefObject, useEffect } from "react";
import { copyToClipboard, Replace } from "../utils";
import mermaid from "mermaid";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  prism,
  vscDarkPlus,
  xonokai,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import LoadingIcon from "../icons/three-dots.svg";
import React from "react";
import { showImageModal } from "./ui-lib";
import { useThrottledCallback } from "use-debounce";
import { CodeProps } from "react-markdown/lib/ast-to-react";
import {
  github,
  githubGist,
  gml,
  googlecode,
  hybrid,
  idea,
  kimbieLight,
  paraisoLight,
  qtcreatorLight,
  stackoverflowLight,
  tomorrowNight,
  vs2015,
  xt256,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  dark,
  materialDark,
  materialLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import Locale from "@/app/locales";

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

// export function PreCode(props: { children: any }) {
//   const ref = useRef<HTMLPreElement>(null);
//   const [mermaidCode, setMermaidCode] = useState("");
//
//   useEffect(() => {
//     if (!ref.current) return;
//     const mermaidDom = ref.current.querySelector("code.language-mermaid");
//     if (mermaidDom) {
//       setMermaidCode((mermaidDom as HTMLElement).innerText);
//     }
//   }, [props.children]);
//
//   if (mermaidCode) {
//     return <Mermaid code={mermaidCode} onError={() => setMermaidCode("")} />;
//   }
//
//   return (
//     <pre ref={ref}>
//       <span
//         className="copy-code-button"
//         onClick={() => {
//           if (ref.current) {
//             const code = ref.current.innerText;
//             copyToClipboard(code);
//           }
//         }}
//       ></span>
//       {props.children}
//     </pre>
//   );
// }

function _MarkDownContent(props: { content: string }) {
  React.useEffect(() => {
    hljs.highlightAll();
  }, []);
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
          const result = hljs.highlightAuto(codeBlock);
          if (codeProps.inline) {
            return (
              <code
                className={styles["code-font"]}
                style={{ backgroundColor: "#f9f2f4" }}
              >
                {(codeProps as any).children}
              </code>
            );
          }
          let language = codeProps?.className?.replace("language-", "");
          language = !language
            ? hljs.highlightAuto(codeBlock ? codeBlock : "").language
            : language;
          // console.log("language >>> ", language);
          return language === "mermaid" ? (
            <Mermaid code={codeBlock} onError={() => ""} />
          ) : (
            <div>
              <SyntaxHighlighter
                style={vscDarkPlus}
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
      {props.content}
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
