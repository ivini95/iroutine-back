import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const fakeToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTMyZjU0ZTYzOWI2ZWExYjAwNjJlMTgiLCJpYXQiOjE2OTgwODEyNzksImV4cCI6MTY5ODE2NzY3OX0.HMwmA_vWpE_9XCKuCs8XWFepyeKIvn-ag323cQjq-bA';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue(fakeToken),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should login account', async () => {
      const response = await authController.login({
        name: 'fakeName',
        password: 'fakepassword',
      });

      expect(response).toEqual(fakeToken);
    });
  });
});
