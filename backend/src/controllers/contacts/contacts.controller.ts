import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateContactDto } from '../../shared/dto/create-contact.dto';
import { UpdateContactDto } from '../../shared/dto/update-contact.dto';
import { Contact } from '../../shared/entities/contact.entity';
import { ContactUseCasesService } from '../../use-cases/contact/contact-use-cases.service';

@ApiTags('Contatos')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactUseCases: ContactUseCasesService) {}

  @ApiOperation({
    summary: 'Cria um novo contato',
  })
  @ApiOkResponse({ description: 'Contato criado com sucesso' })
  @Post()
  create(@Body() createContactDto: CreateContactDto, @Request() req) {
    return this.contactUseCases.create(createContactDto, req.user.userId);
  }

  @ApiOperation({
    summary: 'Lista todos os contatos',
  })
  @Get()
  findAll(@Request() req): Promise<Contact[]> {
    return this.contactUseCases.findAll({
      userId: req.user.userId,
    });
  }

  @ApiOperation({
    summary: 'Busca um contato pelo ID',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactUseCases.findOne(id);
  }

  @ApiOperation({
    summary: 'Atualiza um contato pelo ID',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactUseCases.update(id, updateContactDto);
  }

  @ApiOperation({
    summary: 'Remove um contato pelo ID',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactUseCases.remove(id);
  }
}
