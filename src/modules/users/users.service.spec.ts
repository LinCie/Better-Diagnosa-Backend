import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  EntityManager,
  MikroORM,
  UniqueConstraintViolationException,
} from '@mikro-orm/sqlite';
import { User } from '@/entities/User.entity';

describe('UsersService', () => {
  let usersService: UsersService;
  let orm: MikroORM;
  let em: EntityManager;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService],
      imports: [MikroOrmModule.forRoot()],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    orm = await MikroORM.init();
    em = orm.em.fork();

    const allUser = await em.findAll(User, {});

    if (allUser) await em.removeAndFlush(allUser);

    const initialuser = new User('initial', 'initial');

    em.persistAndFlush(initialuser);
  });

  describe('find initial user', () => {
    it('should return initial user', async () => {
      const initialUser = await usersService.getUser('initial');
      expect(initialUser).toBeDefined();
    });

    it('should return null when the user is not found', async () => {
      const user = await usersService.getUser('notFound');
      expect(user).toBeNull();
    });
  });

  describe('create user', () => {
    it('should be able to create user', async () => {
      const user = await usersService.createUser('user', 'user');
      expect(user).toBeDefined();
    });

    it("shouldn't be able to create user when username already exist", async () => {
      try {
        await usersService.createUser('initial', 'initial');
      } catch (error) {
        expect(error).toBeInstanceOf(UniqueConstraintViolationException);
      }
    });
  });

  afterAll((done) => {
    orm.close();
    done();
  });
});
