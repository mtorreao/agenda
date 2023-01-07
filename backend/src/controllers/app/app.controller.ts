import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../shared/decorators/public.decorator';

@Public()
@Controller()
export class AppController {
  @ApiTags('Health Check')
  @Get()
  healthCheck(): string {
    return 'Ok';
  }
}
