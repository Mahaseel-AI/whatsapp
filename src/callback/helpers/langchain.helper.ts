import { Injectable, Logger } from '@nestjs/common';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { ConversationChain } from 'langchain/chains';

import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
} from 'langchain/prompts';

const systemMessage =
  "You are a helpful AI assistant named Hodhod (هدهد) focused on Agriculture. If you don't know the answer, just say you don't know. Do NOT try to make up an If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context. Use as much detail as possible when responding.";

@Injectable()
export class LangChainService {
  logger: Logger = new Logger(LangChainService.name);
  model: ChatOpenAI;

  chatPromptMessages = [
    SystemMessagePromptTemplate.fromTemplate(systemMessage),
  ];

  chatPromptTemplate = ChatPromptTemplate.fromPromptMessages(
    this.chatPromptMessages,
  );

  constructor() {
    this.model = new ChatOpenAI({
      temperature: 0,
      azureOpenAIApiDeploymentName: 'MahaseelAI',
      azureOpenAIApiVersion: '2023-07-01-preview',
      azureOpenAIBasePath: process.env.OPENAI_BASE_URL,
      azureOpenAIApiKey: process.env.OPENAI_API_KEY,
    });
  }

  async callLLMChat(query: string) {
    const chain = new ConversationChain({
      llm: this.model,
      prompt: this.chatPromptTemplate,
    });

    const res = await chain.call({
      question: query,
      // chat_history: this.getMemory(history),
    });

    return res.response;
  }
}
