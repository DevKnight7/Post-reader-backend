import { PostsRepository } from './posts.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async getAllPosts() {
    try {
      return await this.postsRepository.getAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findById(id);
    if (!post) {
      throw new NotFoundException(`Post with id: ${id} does not exists`);
    }
    return post;
  }
}
