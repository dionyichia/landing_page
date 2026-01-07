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
import { SmallText } from './typography';

const chat_models = [
    {
        name: 'gemini flash lite',
        value: 'google/gemini-2.5-flash-lite',
    },
    {
        name: 'GPT 4o mini',
        value: 'openai/gpt-4o-mini',
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

const embedding_model = 'text-embedding-3-small';
const query_expansion_model = "google/gemini-2.5-flash-lite";

type ChatBotProps = {
  showChat: boolean;
  setShowChat: Dispatch<SetStateAction<boolean>>;
};

export default function ChatBot ({ showChat, setShowChat }: ChatBotProps) {
    const [input, setInput] = useState('');
    const [chat_model, setModel] = useState<string>(chat_models[1].value);
    const [embed_model, setEmbedModel] = useState<string>(embedding_model);
    const [query_model, setQueryModel] = useState<string>(query_expansion_model);
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
            chat_model: chat_model,
            embedding_model: embed_model,
            query_expansion_model: query_model,
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
        <div className={`
            relative w-[70vw] md:w-[60vw] lg:w-[50vw] max-w-[640px] flex flex-col h-full,
            ${ showChat ? 
                'block h-[65vh] md:h-[60vh] xl:h-[75vh] max-w-[640px]'
                :
                ''
            }
            `}>
            <div className={`
                transition-all duration-700 ease-in-out delay-400
                overflow-hidden
                ${showChat 
                    ? 'opacity-100'
                    : 'opacity-0'
                }
            `}>
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
            </div>

            <PromptInput onSubmit={handleSubmit} globalDrop multiple className="mt-auto mb-2 md:mb-4">
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

            <div className={`
                transition-all duration-700 ease-in-out 
                flex flex-row justify-end pointer-events-none pr-2 md:pr-4 
                overflow-hidden
                ${ showChat ? 
                'opacity-100 max-h-20 mb-4 md:mb-8'
                : 'opacity-0 max-h-0 mb-0'}
            `}>
                <SmallText>* Tip: Hit the "ESC" to return! </SmallText>
            </div>  
        </div>
    );
};