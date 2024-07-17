import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule as UsersModuleOld } from './modules/users/users.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { QuestionModule } from './modules/question/question.module';
import { HistoryModule } from './modules/history/history.module';
import { UsersModule } from './v1/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot(),
    UsersModuleOld,
    UsersModule,
    AuthModule,
    QuestionModule,
    HistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
