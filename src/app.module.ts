import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [AuthModule, UsersModule, MikroOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
