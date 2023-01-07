import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  @ApiTags('Health Check')
  @Get()
  healthCheck(): string {
    return 'Ok';
  }
}
