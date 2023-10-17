import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

interface Task {
  id: string;
  description: string;
  type: 'timer' | 'counter';
  totalTime: number;
  currentTime: number;
  status: 'progress' | 'completed' | 'initial';
  start: string;
  days: {
    sun: boolean;
    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
  };
  userId: string;
}

const fakeTasks: Task[] = [
  {
    id: 'id1234mock',
    description: 'description mock',
    type: 'timer',
    totalTime: 9000,
    currentTime: 3000,
    status: 'progress',
    start: '9999-11-11T11:11:11.111Z',
    days: {
      sun: false,
      mon: true,
      tue: true,
      wed: true,
      thu: true,
      fri: true,
      sat: true,
    },
    userId: 'userid1234',
  },
];

describe('TaskController', () => {
  let taskController: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            create: jest.fn().mockReturnValue(fakeTasks[0]),
            findToday: jest.fn().mockReturnValue(fakeTasks[0]),
            findAll: jest.fn().mockReturnValue(fakeTasks),
            findOne: jest.fn().mockReturnValue(fakeTasks[0]),
            update: jest.fn().mockReturnValue(fakeTasks[0]),
            remove: jest.fn().mockReturnValue(fakeTasks[0]),
          },
        },
      ],
    }).compile();

    taskController = module.get<TaskController>(TaskController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const response = await taskController.create(fakeTasks[0]);

      expect(response).toEqual(fakeTasks[0]);
    });
  });

  describe('findAll', () => {
    it('should return all tasks', async () => {
      const response = await taskController.findAll();

      expect(response).toEqual(fakeTasks);
    });
  });

  describe('findOne', () => {
    it('should return task with id equal id param', async () => {
      const id = fakeTasks[0].id;
      const response = await taskController.findOne(id);

      expect(response).toEqual(fakeTasks[0]);
    });
  });

  describe('findToday', () => {
    it('should return task with day parm equal true', async () => {
      const day = 'fri';
      const response = await taskController.findToday(day);

      expect(response).toEqual(fakeTasks[0]);
    });
  });

  describe('update a task', () => {
    it('should update task and return updated task', async () => {
      const id = fakeTasks[0].id;
      const response = await taskController.update(id, fakeTasks[0]);

      expect(id).toEqual(response.id);
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      const id = fakeTasks[0].id;
      const response = await taskController.remove(id);

      expect(response).toEqual(fakeTasks[0]);
    });
  });
});
