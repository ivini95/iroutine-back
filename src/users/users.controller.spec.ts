import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

interface User {
  id: string;
  name: string;
  password: string;
}

const fakeUser: User = {
  id: 'id1234',
  name: 'nametest',
  password: '123456',
};

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockReturnValue(fakeUser),
            findOne: jest.fn().mockResolvedValue(fakeUser),
            update: jest.fn().mockResolvedValue(fakeUser),
            remove: jest.fn().mockResolvedValue(fakeUser),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create', () => {
    it('should create user', async () => {
      const response = await usersController.create(fakeUser);

      expect(response).toEqual(fakeUser);
    });
  });

  describe('findOne', () => {
    it('should return user with id equal id param', async () => {
      const id = fakeUser.id;
      const response = await usersController.findOne(id);

      expect(response).toEqual(fakeUser);
    });
  });

  describe('update', () => {
    it('should update user', async () => {
      const id = fakeUser.id;
      const response = await usersController.update(id, fakeUser);

      expect(response).toEqual(fakeUser);
    });
  });

  describe('delete', () => {
    it('should delete user and tasks', async () => {
      const id = fakeUser.id;
      const response = await usersController.remove(id);

      expect(response).toEqual(fakeUser);
    });
  });
});
