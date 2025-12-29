'use client';

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageContent,
  MessageResponse,
  MessageActions,
  MessageAction,
} from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
} from '@/components/ai-elements/prompt-input';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { CopyIcon, GlobeIcon, RefreshCcwIcon } from 'lucide-react';
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@/components/ai-elements/sources';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import { Loader } from '@/components/ai-elements/loader';

const models = [
  {
    name: 'GPT 4o',
    value: 'openai/gpt-4o',
  },
  {
    name: 'Deepseek R1',
    value: 'deepseek/deepseek-r1',
  },
  {
    name: 'claude',
    value: 'anthropic/claude-3-haiku'
  }
];

type ChatBotProps = {
  showChat: boolean;
  setShowChat: Dispatch<SetStateAction<boolean>>;
};

export default function ChatBot ({ showChat, setShowChat }: ChatBotProps) {
    const [input, setInput] = useState('');
    const [model, setModel] = useState<string>(models[2].value);
    const { messages, sendMessage, status, regenerate } = useChat();
    const [isMultiline, setIsMultiline] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (message: PromptInputMessage) => {
        const hasText = Boolean(message.text);
        const hasAttachments = Boolean(message.files?.length);
        if (!(hasText || hasAttachments)) {
        return;
        }

        if (!showChat) setShowChat(true);

        sendMessage(
        { 
            text: message.text || 'Sent with attachments',
            files: message.files 
        },
        {
            body: {
            model: model,
            webSearch: false,
            },
        },
        );
        setInput('');
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);

        const el = textareaRef.current;
        if (!el) return;

        // Reset height so scrollHeight is accurate
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;

        const singleLineHeight = 50; // adjust to your font/line-height
        setIsMultiline(el.scrollHeight > singleLineHeight * 1.5);
    };

    
    return (
        <div className="w-full md:w-[50vw] lg:w-[40vw] xl:w-[40vw] mx-auto md:py-6 relative flex flex-col h-full">
            { showChat && 
                <Conversation className="h-full">
                <ConversationContent>
                    {messages.map((message) => (
                    <div key={message.id}>
                        {message.role === 'assistant' && message.parts.filter((part) => part.type === 'source-url').length > 0 && (
                        <Sources>
                            <SourcesTrigger
                            count={
                                message.parts.filter(
                                (part) => part.type === 'source-url',
                                ).length
                            }
                            />
                            {message.parts.filter((part) => part.type === 'source-url').map((part, i) => (
                            <SourcesContent key={`${message.id}-${i}`}>
                                <Source
                                key={`${message.id}-${i}`}
                                href={part.url}
                                title={part.url}
                                />
                            </SourcesContent>
                            ))}
                        </Sources>
                        )}
                        {message.parts.map((part, i) => {
                        switch (part.type) {
                            case 'text':
                            return (
                                <Message key={`${message.id}-${i}`} from={message.role}>
                                <MessageContent>
                                    <MessageResponse>
                                    {part.text}
                                    </MessageResponse>
                                </MessageContent>
                                {message.role === 'assistant' && i === messages.length - 1 && (
                                    <MessageActions>
                                    <MessageAction
                                        onClick={() => regenerate()}
                                        label="Retry"
                                    >
                                        <RefreshCcwIcon className="size-3" />
                                    </MessageAction>
                                    <MessageAction
                                        onClick={() =>
                                        navigator.clipboard.writeText(part.text)
                                        }
                                        label="Copy"
                                    >
                                        <CopyIcon className="size-3" />
                                    </MessageAction>
                                    </MessageActions>
                                )}
                                </Message>
                            );
                            case 'reasoning':
                            return (
                                <Reasoning
                                key={`${message.id}-${i}`}
                                className="w-full"
                                isStreaming={status === 'streaming' && i === message.parts.length - 1 && message.id === messages.at(-1)?.id}
                                >
                                <ReasoningTrigger />
                                <ReasoningContent>{part.text}</ReasoningContent>
                                </Reasoning>
                            );
                            default:
                            return null;
                        }
                        })}
                    </div>
                    ))}
                    {status === 'submitted' && <Loader />}
                </ConversationContent>
                <ConversationScrollButton />
                </Conversation>
            }

            <PromptInput onSubmit={handleSubmit} globalDrop multiple className="mt-auto mb-4 md:mb-8">
                <PromptInputBody>
                    <PromptInputTextarea
                        ref={textareaRef}
                        rows={1}
                        onChange={handleChange}
                        value={input}
                        className='items-center text-xs md:text-sm lg:text-lg'
                    />
                </PromptInputBody>
                {isMultiline ?
                    <PromptInputFooter align='block-end'>
                        <PromptInputSubmit disabled={!input && !status} status={status}/> 
                    </PromptInputFooter>
                    : 
                    <PromptInputFooter className="pr-4" align='inline-end'>
                        <PromptInputSubmit disabled={!input && !status} status={status}/> 
                    </PromptInputFooter>
                }
            </PromptInput>
        </div>
    );
};