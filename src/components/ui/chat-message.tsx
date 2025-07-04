"use client"

import type React from "react"
import { useMemo } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Code2, Loader2, Terminal } from "lucide-react"

import { cn } from "@/lib/utils"
import { FilePreview } from "@/components/ui/file-preview"
import { MarkdownRenderer } from "@/components/ui/markdown-renderer"
import Image from "next/image"
import { getPayloadFromToken } from '@/lib/jwt'

const chatBubbleVariants = cva(
  "group/message relative break-words rounded-lg p-3 text-sm sm:max-w-[90%]",
  {
    variants: {
      isUser: {
        true: "bg-white border border-black text-primary-foreground",
        false: "bg-white border border-black text-foreground",
      },
      animation: {
        none: "",
        slide: "duration-300 animate-in fade-in-0",
        scale: "duration-300 animate-in fade-in-0 zoom-in-75",
        fade: "duration-500 animate-in fade-in-0",
      },
    },
    compoundVariants: [
      {
        isUser: true,
        animation: "slide",
        class: "slide-in-from-right",
      },
      {
        isUser: false,
        animation: "slide",
        class: "slide-in-from-left",
      },
      {
        isUser: true,
        animation: "scale",
        class: "origin-bottom-right",
      },
      {
        isUser: false,
        animation: "scale",
        class: "origin-bottom-left",
      },
    ],
  }
)

type Animation = VariantProps<typeof chatBubbleVariants>["animation"]

interface Attachment {
  name?: string
  contentType?: string
  url: string
}

interface PartialToolCall {
  state: "partial-call"
  toolName: string
}

interface ToolCall {
  state: "call"
  toolName: string
}

interface ToolResult {
  state: "result"
  toolName: string
  result: any
}

type ToolInvocation = PartialToolCall | ToolCall | ToolResult

export interface Message {
  id: string
  role: "user" | "assistant" | (string & {})
  content: string
  createdAt?: Date
  experimental_attachments?: Attachment[]
  toolInvocations?: ToolInvocation[]
}

export interface ChatMessageProps extends Message {
  showTimeStamp?: boolean
  animation?: Animation
  actions?: React.ReactNode
  className?: string
  userData?: any
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  content,
  createdAt,
  showTimeStamp = false,
  animation = "scale",
  actions,
  className,
  experimental_attachments,
  toolInvocations,
  userData,
}) => {
  // Render attachments directly from URL
  const files = experimental_attachments ?? [];

  const isUser = role === "user"

  // Use userData from prop for user info
  let userName = "User";
  let userAvatar = "/assets/img/default-avatar.png";
  if (isUser && userData) {
    userName = userData.name || "User";
    userAvatar = userData.profile_picture || "/assets/img/default-avatar.png";
  }

  const dateObj = createdAt ? new Date(createdAt) : undefined;
  const formattedTime = dateObj?.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
      <div className={cn("flex gap-2 items-center", isUser ? "flex-row-reverse": "flex-row")}>
        <div>
          {isUser ? (
            <img alt={userName} src={userAvatar} width={30} height={30} className="rounded-full object-cover aspect-square border border-black" />
          ) : (
            <Image alt="NuBo Image" src={"/assets/img/nubo.png"} width={30} height={30} />
          )}
        </div>
        <p>{isUser ? userName : "Nubo"}</p>
      </div>
      {files.length > 0 && (
        <div className="mb-1 flex flex-wrap gap-2">
          {files.map((file, index) => {
            if (file.contentType?.startsWith("image/")) {
              return (
                <img
                  key={index}
                  src={file.url}
                  alt={file.name || `attachment-${index}`}
                  className="max-h-40 rounded-lg border border-black "
                />
              );
            }
            // Untuk file lain, bisa tambahkan preview/link
            return (
              <a
                key={index}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600"
              >
                {file.name || `File ${index + 1}`}
              </a>
            );
          })}
        </div>
      )}
      <div className={cn(chatBubbleVariants({ isUser, animation }), className)}>
        <div className="space-y-3">
          <MarkdownRenderer>{content}</MarkdownRenderer>
        </div>

        {role === "assistant" && actions ? (
          <div className="absolute bg-white -bottom-4 right-2 flex space-x-2 rounded-lg border border-black p-1 text-foreground opacity-0 transition-opacity group-hover/message:opacity-100">
            {actions}
          </div>
        ) : null}
      </div>
      {showTimeStamp && createdAt ? (
        <time
          dateTime={dateObj instanceof Date && !isNaN(dateObj.getTime()) ? dateObj.toISOString() : ""}
          className={cn(
            "mt-1 block px-1 text-xs opacity-50",
            animation !== "none" && "duration-500 animate-in fade-in-0"
          )}
        >
          {formattedTime}
        </time>
      ) : null}
    </div>
  )
}

function dataUrlToUint8Array(data: string) {
  const base64 = data.split(",")[1]
  const buf = Buffer.from(base64, "base64")
  return new Uint8Array(buf)
}

function ToolCall({
  toolInvocations,
}: Pick<ChatMessageProps, "toolInvocations">) {
  if (!toolInvocations?.length) return null

  return (
    <div className="flex flex-col items-start gap-2">
      {toolInvocations.map((invocation, index) => {
        switch (invocation.state) {
          case "partial-call":
          case "call":
            return (
              <div
                key={`toolcall ${index + 1}`}
                className="flex items-center gap-2 rounded-lg border bg-muted px-3 py-2 text-sm text-muted-foreground"
              >
                <Terminal className="h-4 w-4" />
                <span>Calling {invocation.toolName}...</span>
                <Loader2 className="h-3 w-3 animate-spin" />
              </div>
            )
          case "result":
            return (
              <div
                key={`result ${index + 1}`}
                className="flex flex-col gap-1.5 rounded-lg border bg-muted px-3 py-2 text-sm"
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Code2 className="h-4 w-4" />
                  <span>Result from {invocation.toolName}</span>
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap text-foreground">
                  {JSON.stringify(invocation.result, null, 2)}
                </pre>
              </div>
            )
        }
      })}
    </div>
  )
}
