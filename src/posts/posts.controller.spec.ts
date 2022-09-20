import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import * as postsData from './data/posts.json';

export const mockPostData = {
  userId: 1,
  id: 1,
  title:
    'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
};

describe('PostsController', () => {
  let controller: PostsController;

  const mockPostService = {
    getAllPosts: jest.fn(() => {
      return postsData;
    }),
    getPostById: jest.fn((id: number) => {
      return postsData.find((post) => post.id === Number(id));
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    })
      .overrideProvider(PostsService)
      .useValue(mockPostService)
      .compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return all post if nothing is passed', async () => {
    expect(await controller.getAllPosts()).toEqual(postsData);
  });
  it('should return post respective to id passed', async () => {
    expect(await controller.getPostById({ id: 1 })).toEqual(mockPostData);
  });
});
