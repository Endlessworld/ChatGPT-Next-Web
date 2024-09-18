import React, { RefObject, useEffect, useRef, useState } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";
import LoadingIcon from "@/app/icons/three-dots.svg";
import { Theme, useAppConfig } from "@/app/store";
import styles from "./markdown.module.scss";

function VditorPreview(props: { content: string }) {
  const elementId = "preview" + props.content.length;
  const elementRef = useRef<HTMLDivElement>(null);
  const config = useAppConfig();
  const theme = Theme.Dark.includes(config.theme);
  const options = {
    /** 显示模式。默认值: 'both' */
    mode: "dark",
    /** @link https://ld246.com/article/1549638745630#options-preview-hljs */
    hljs: {
      /** 代码块没有指定语言时，使用此值。默认值: "" */
      defaultLang: "java",
      /** 是否启用行号。默认值: false */
      lineNumber: true,
      /** 代码风格，可选值参见 [Chroma](https://xyproto.github.io/splash/docs/longer/all.html)。 默认值: 'github' */
      style: "github-dark",
      /** 是否启用代码高亮。默认值: true */
      enable: true,
      /** 自定义指定语言: CODE_LANGUAGES */
      // langs: CODE_LANGUAGES,
    },
    theme: {
      current: "dark",
    },
    speech: {
      enable: false,
    },
    /** @link https://ld246.com/article/1549638745630#options-preview-markdown */
    markdown: {
      /** 自动空格。默认值: false */
      autoSpace: true,
      /** 段落开头是否空两格。默认值: false */
      paragraphBeginningSpace: true,
      /** 自动矫正术语。默认值: false */
      fixTermTypo: true,
      /** 插入目录。默认值: false */
      toc: true,
      /** 脚注。默认值: true */
      footnotes: true,
      /** wysiwyg & ir 模式代码块是否渲染。默认值: true */
      codeBlockPreview: true,
      /** wysiwyg & ir 模式数学公式块是否渲染。默认值: true */
      mathBlockPreview: true,
      /** 是否启用过滤 XSS。默认值: true */
      sanitize: true,
      /** 链接相对路径前缀。默认值：'' */
      linkBase: "",
      /** 链接强制前缀。默认值：'' */
      linkPrefix: "",
      /** 为列表添加标记，以便[自定义列表样式](https://github.com/Vanessa219/vditor/issues/390) 默认值：false */
      listStyle: true,
      /** 支持 mark 标记 */
      mark: true,
      /** 支持自动链接 */
      gfmAutoLink: true,
    },
    icon: "ant",
    /** @link https://ld246.com/article/1549638745630#options-preview-math */
    math: {
      /** 内联数学公式起始 $ 后是否允许数字。默认值: false */
      inlineDigit: false,
      /** 使用 MathJax 渲染时传入的宏定义。默认值: {} */
      macros: {},
      /** 数学公式渲染引擎。默认值: 'KaTeX' */
      engine: "MathJax",
      /** 数学公式渲染引擎为 MathJax 时传入的参数 */
      mathJaxOptions: {},
    },
    renderers: {
      renderCodeSpanOpenMarker: (node: ILuteNode, entering: boolean) => {
        const classNames = styles["code-font"];
        console.log(classNames);
        if (entering) {
          return [
            `<code className=${classNames}
                style="backgroundColor: "#f9f2f4">`,
            Lute.WalkContinue,
          ];
        } else {
          return [``, Lute.WalkContinue];
        }
      },
    },
  } as IPreviewOptions;

  useEffect(() => {
    if (elementRef.current) {
      Vditor.preview(elementRef.current, props.content, options).then((r) => {
        console.log("preview done");
      });
    }
  }, [props.content]);

  return <div id={elementId} ref={elementRef}></div>;
}

// export const VditorPreviewContent = React.memo(vditorPreview);
export default VditorPreview;

export function FirstMarkdown(
  props: {
    content: string;
    loading?: boolean;
    fontSize?: number;
    parentRef?: RefObject<HTMLDivElement>;
    defaultShow?: boolean;
  } & React.DOMAttributes<HTMLDivElement>,
) {
  const mdRef = useRef<HTMLDivElement>(null);
  console.log(props.fontSize);
  const element = (
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
        <VditorPreview content={props.content} />
      )}
    </div>
  );

  return element;
}
