import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './v1/users/users.module';
import { AuthModule } from './v1/auth/auth.module';
import { HistoriesModule } from './v1/histories/histories.module';
import { QuestionsModule } from './v1/questions/questions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot(),
    UsersModule,
    AuthModule,
    HistoriesModule,
    QuestionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
