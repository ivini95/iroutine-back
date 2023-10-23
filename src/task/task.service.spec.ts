import { Test, TestingModule } from '@nestjs/testing';
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

describe('TaskService', () => {
  let taskService: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TaskService,
          useValue: {
            create: jest.fn().mockReturnValue(fakeTasks[0]),
            findToday: jest.fn().mockResolvedValue(fakeTasks[0]),
            findAll: jest.fn().mockReturnValue(fakeTasks),
            findOne: jest.fn().mockResolvedValue(fakeTasks[0]),
            update: jest.fn().mockResolvedValue(fakeTasks[0]),
            remove: jest.fn().mockReturnValue(fakeTasks[0]),
          },
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
  });

  it('should be defined', async () => {
    expect(taskService).toBeDefined();
  });

  describe('create a task', () => {
    it('should be create a new task', async () => {
      const response = await taskService.create(fakeTasks[0]);

      expect(response).toEqual(fakeTasks[0]);
    });
  });

  describe('find all tasks', () => {
    it('should be return all tasks', () => {
      const response = taskService.findAll(fakeTasks[0].userId);

      expect(response).toEqual(fakeTasks);
    });
  });

  describe('find one task', () => {
    it('should return one task to id equal id params', async () => {
      const id = fakeTasks[0].id;
      const response = await taskService.findOne(id);

      expect(id).toEqual(response.id);
    });
  });

  describe('findToday', () => {
    it('should return task with day parm equal true', async () => {
      const day = 'fri';
      const response = await taskService.findToday(fakeTasks[0].userId, day);

      expect(response).toEqual(fakeTasks[0]);
    });
  });

  describe('update a task', () => {
    it('should update task and return updated task', async () => {
      const id = fakeTasks[0].id;
      const response = await taskService.update(id, fakeTasks[0]);

      expect(id).toEqual(response.id);
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      const id = fakeTasks[0].id;
      const response = await taskService.remove(id);

      expect(response).toEqual(fakeTasks[0]);
    });
  });
});
