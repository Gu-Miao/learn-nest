import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonsModule } from './persons/persons.module';
import { CommonModule } from './common/common.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USERNAME: Joi.string().default('postgres'),
        DATABASE_PASSWORD: Joi.required(),
        DATABASE_DATABASE: Joi.string().default('postgres'),
      }),
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    PersonsModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
