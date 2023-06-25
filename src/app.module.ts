import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvPath } from './helpers/env.helper';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { PassportModule } from '@nestjs/passport';
import { LoggerModule } from './shared/logger/logger.module';
import { AuthModule } from './auth/auth.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({ 
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AuthorsModule, 
    BooksModule,
    UsersModule,
    PassportModule,
    LoggerModule,
    UsersModule,
    AuthModule,
  ], 
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService
  ],
})
export class AppModule {}
