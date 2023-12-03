import { Injectable, Logger } from '@nestjs/common';
import { BufferMemory } from 'langchain/memory';
import { RedisChatMessageHistory } from 'langchain/stores/message/ioredis';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { ConversationChain } from 'langchain/chains';

import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
} from 'langchain/prompts';

const systemMessage = 'You are an expert in agriculture called Mahseel';

@Injectable()
export class LangChainService {
  logger: Logger = new Logger(LangChainService.name);
  model: ChatOpenAI;
  memory: BufferMemory;

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

    this.memory = new BufferMemory({
      chatHistory: new RedisChatMessageHistory({
        // config: {
        //   username: 'default',
        //   password: 'wV0vrY9ySrDJEftYlultlcAX7rTRrNYMlAzCaONgWes',
        // },
        sessionId: new Date().toISOString(), // Or some other unique identifier for the conversation
        sessionTTL: 300, // 5 minutes, omit this parameter to make sessions never expire
        url: 'redis://localhost:6379', // Default value, override with your own instance's URL
      }),
    });
  }

  async callLLMChat(query: string): Promise<string> {
    const chain = new ConversationChain({
      llm: this.model,
      memory: this.memory,
    });
    const res = await chain.call({ input: query });
    //  const res = await this.model.call(query);
    console.log(res);
    return res.response;
  }
}
