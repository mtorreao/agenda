import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type acceptedDbs = 'mongo' | 'postgres';

@Global()
@Injectable()
export default class Configuration {
  constructor(private readonly configService: ConfigService) {}

  whichDb() {
    return this.configService.getOrThrow<acceptedDbs>('WHICH_DB');
  }
  mongoDBConnectionString() {
    return this.configService.getOrThrow<string>('MONGODB_CONNECTION_STRING');
  }
}
