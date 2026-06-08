"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Heading,
  Section,
  Text,
  Textarea
} from "@repo/ui";

interface Message {
  id: string;
  role: string;
  content: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  title: string;
  updatedAt: string;
  messages: Message[];
}

export default function AssistantPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadConversations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/assistant");
      if (res.ok) {
        const data = await res.json();
        setConversations(data);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const selectConversation = async (conv: Conversation) => {
    // Load full messages by creating a temporary fetch
    try {
      const res = await fetch(`/api/assistant?id=${conv.id}`);
      if (res.ok) {
        const fullConv: Conversation = await res.json();
        if (fullConv) {
          setActiveConversation(fullConv);
          setMessages(fullConv.messages || []);
        }
      }
    } catch {
      // silently fail
    }
  };

  const createConversation = async () => {
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", title: "New Conversation" })
      });
      if (res.ok) {
        const conv = await res.json();
        setActiveConversation(conv);
        setMessages([]);
        await loadConversations();
      }
    } catch {
      // silently fail
    }
  };

  const deleteConversation = async (id: string) => {
    try {
      await fetch(`/api/assistant?id=${id}`, { method: "DELETE" });
      if (activeConversation?.id === id) {
        setActiveConversation(null);
        setMessages([]);
      }
      await loadConversations();
    } catch {
      // silently fail
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !activeConversation || sending) return;

    const userContent = input.trim();
    setInput("");
    setSending(true);

    // Optimistic user message
    const tempUserMsg: Message = {
      id: `temp-${Date.now()}`,
      role: "user",
      content: userContent,
      createdAt: new Date().toISOString()
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "message",
          conversationId: activeConversation.id,
          content: userContent
        })
      });

      if (res.ok) {
        const data = await res.json();
        // Replace temp message with real ones
        setMessages((prev) => {
          const withoutTemp = prev.filter((m) => m.id !== tempUserMsg.id);
          return [...withoutTemp, data.userMessage, data.assistantMessage];
        });
      }
    } catch {
      // keep the temp message on error
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Section>
      <Container>
        <div className="space-y-4">
          <div>
            <Heading level={1} size="xl">
              AI Assistant
            </Heading>
            <Text className="mt-1" tone="muted">
              Ask ARIA about markets, investing, economics, and financial concepts.
            </Text>
          </div>

          <div
            className="grid gap-4 lg:grid-cols-[280px_1fr]"
            style={{ minHeight: "70vh" }}
          >
            {/* Sidebar - Conversations */}
            <div className="space-y-3">
              <Button className="w-full" onClick={createConversation} variant="primary">
                + New Conversation
              </Button>
              <div className="space-y-1">
                {loading && <Text tone="muted">Loading...</Text>}
                {conversations.map((conv) => (
                  <div
                    className={`group flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors ${
                      activeConversation?.id === conv.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-muted/50"
                    }`}
                    key={conv.id}
                    onClick={() => selectConversation(conv)}
                  >
                    <span className="truncate font-medium">{conv.title}</span>
                    <button
                      className="ml-2 hidden text-xs text-muted-foreground hover:text-danger group-hover:inline"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(conv.id);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat area */}
            <Card className="flex flex-col">
              <CardContent className="flex flex-1 flex-col p-4">
                {!activeConversation ? (
                  <div className="flex flex-1 items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
                        🤖
                      </div>
                      <Heading level={3} size="lg">
                        Welcome to ARIA
                      </Heading>
                      <Text className="mt-2 mb-8 max-w-md" tone="muted">
                        Your AI-powered market intelligence assistant. Select a topic or
                        start typing to begin.
                      </Text>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                        {[
                          "Analyze Apple stock",
                          "Explain inflation",
                          "What is a recession?",
                          "Compare ETFs vs Index Funds"
                        ].map((prompt) => (
                          <button
                            key={prompt}
                            onClick={async () => {
                              // Optimistically set the input and create a conversation
                              setInput(prompt);
                              try {
                                const res = await fetch("/api/assistant", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({
                                    action: "create",
                                    title: prompt
                                  })
                                });
                                if (res.ok) {
                                  const conv = await res.json();
                                  setActiveConversation(conv);
                                  setMessages([]);
                                  await loadConversations();
                                }
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            className="p-3 text-sm text-left border border-border rounded-lg bg-card hover:bg-muted/50 transition-colors"
                          >
                            <span className="text-primary font-medium block mb-1">
                              Suggest
                            </span>
                            <span className="text-muted-foreground block truncate">
                              "{prompt}"
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Messages */}
                    <div
                      className="flex-1 space-y-4 overflow-y-auto pb-4"
                      style={{ maxHeight: "55vh" }}
                    >
                      {messages.length === 0 && (
                        <div className="flex h-full items-center justify-center">
                          <Text tone="muted">
                            Send a message to start the conversation.
                          </Text>
                        </div>
                      )}
                      {messages.map((msg) => (
                        <div
                          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                          key={msg.id}
                        >
                          <div
                            className={`max-w-[75%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                              msg.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "border border-border bg-muted/50"
                            }`}
                          >
                            <div className="whitespace-pre-wrap">{msg.content}</div>
                          </div>
                        </div>
                      ))}
                      {sending && (
                        <div className="flex justify-start">
                          <div className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm">
                            <span className="inline-flex items-center gap-1">
                              <span className="animate-pulse">●</span>
                              <span
                                className="animate-pulse"
                                style={{ animationDelay: "0.2s" }}
                              >
                                ●
                              </span>
                              <span
                                className="animate-pulse"
                                style={{ animationDelay: "0.4s" }}
                              >
                                ●
                              </span>
                            </span>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="flex items-end gap-2 border-t border-border pt-4">
                      <Textarea
                        className="min-h-[44px] flex-1 resize-none"
                        disabled={sending}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about markets, investing, economics..."
                        rows={1}
                        value={input}
                      />
                      <Button
                        disabled={!input.trim() || sending}
                        onClick={sendMessage}
                        variant="primary"
                      >
                        Send
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
