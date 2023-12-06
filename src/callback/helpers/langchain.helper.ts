import { Injectable, Logger } from '@nestjs/common';
import { BufferWindowMemory } from 'langchain/memory';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { ConversationChain } from 'langchain/chains';
import { ChatPromptTemplate, MessagesPlaceholder } from 'langchain/prompts';

@Injectable()
export class LangChainService {
  logger: Logger = new Logger(LangChainService.name);
  model: ChatOpenAI;
  memory: BufferWindowMemory;

  promptTemplate = ChatPromptTemplate.fromPromptMessages([
    [
      'system',
      'The following is a friendly conversation between a human and Mahseel AI an expert in agriculture. Mahseel is talkative and provides lots of specific details from its context. If Mahseel does not know the answer to a question, it truthfully says it does not know.',
    ],
    new MessagesPlaceholder('history'),
    ['human', '{input}'],
  ]);

  constructor() {
    this.model = new ChatOpenAI({
      temperature: 0,
      azureOpenAIApiDeploymentName: 'MahaseelAI',
      azureOpenAIApiVersion: '2023-07-01-preview',
      azureOpenAIBasePath: process.env.OPENAI_BASE_URL,
      azureOpenAIApiKey: process.env.OPENAI_API_KEY,
    });

    this.memory = new BufferWindowMemory({
      k: 3,
      returnMessages: true,
      memoryKey: 'history',
    });
  }

  async callLLMChat(query: string): Promise<string> {
    const chain = new ConversationChain({
      llm: this.model,
      prompt: this.promptTemplate,
      memory: this.memory,
    });
    const res = await chain.call({ input: query });
    return res.response;
  }
}
