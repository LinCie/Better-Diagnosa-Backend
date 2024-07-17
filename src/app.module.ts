import { Module } from '@nestjs/common';
import { AuthModule as AuthModuleOld } from './modules/auth/auth.module';
import { UsersModule as UsersModuleOld } from './modules/users/users.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { QuestionModule } from './modules/question/question.module';
import { HistoryModule } from './modules/history/history.module';
import { UsersModule } from './v1/users/users.module';
import { AuthModule } from './v1/auth/auth.module';
import { HistoriesModule } from './v1/histories/histories.module';
import { QuestionsModule } from './v1/questions/questions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot(),
    UsersModuleOld,
    UsersModule,
    AuthModuleOld,
    AuthModule,
    QuestionModule,
    HistoryModule,
    HistoriesModule,
    QuestionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
