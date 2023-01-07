import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type acceptedDbs = 'mongo' | 'postgres';

@Injectable()
export default class Configuration {
  constructor(private readonly configService: ConfigService) {}

  whichDb() {
    return this.configService.getOrThrow<acceptedDbs>('WHICH_DB');
  }
  mongoDBConnectionString() {
    return this.configService.getOrThrow<string>('MONGODB_CONNECTION_STRING');
  }
  jwtSecret() {
    return this.configService.getOrThrow<string>('JWT_SECRET');
  }
}
