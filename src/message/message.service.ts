import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { LangChainService } from 'src/callback/helpers/langchain.helper';

@Injectable()
export class MessageService {
  constructor(private readonly langChainService: LangChainService) {}

  create(createMessageDto: CreateMessageDto) {
    return 'This action adds a new message';
  }

  async test(question: string): Promise<string> {
    return this.langChainService.callLLMChat(question);
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
