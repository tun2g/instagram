import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryServiceController } from './cloudinary.controller';

describe('CloudinaryController', () => {
  let controller: CloudinaryServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CloudinaryServiceController],
    }).compile();

    controller = module.get<CloudinaryServiceController>(CloudinaryServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
