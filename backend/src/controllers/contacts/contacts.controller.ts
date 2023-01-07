import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateContactDto } from '../../shared/dto/create-contact.dto';
import { UpdateContactDto } from '../../shared/dto/update-contact.dto';
import { ContactUseCasesService } from '../../use-cases/contact/contact.use-case';

@ApiTags('Contatos')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactUseCases: ContactUseCasesService) {}

  @ApiOperation({
    summary: 'Cria um novo contato',
  })
  @ApiOkResponse({ description: 'Contato criado com sucesso' })
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactUseCases.create(createContactDto);
  }

  @ApiOperation({
    summary: 'Lista todos os contatos',
  })
  @Get()
  findAll() {
    return this.contactUseCases.findAll();
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
