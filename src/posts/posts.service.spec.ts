import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import * as postsData from './data/posts.json';
import { PostsRepository } from './posts.repository';
import { mockPostData } from './posts.controller.spec';
import { NotFoundException } from '@nestjs/common';

describe('PostsService', () => {
  let postService: PostsService;

  class mockPostService {
    getAllPosts = () => {
      return postsData;
    };
    getPostById = (id: number) => {
      return postsData.find((post) => post.id === Number(id));
    };
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService, PostsRepository],
    }).compile();

    postService = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(postService).toBeDefined();
  });
  it(' should return all post when no data passed', async () => {
    expect(await postService.getAllPosts()).toEqual(postsData);
  });
  it(' should return post with right id', async () => {
    expect(await postService.getPostById(1)).toEqual(mockPostData);
  });
  it('should throw error if the post is not found', async () => {
    try {
      await postService.getPostById(100);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
