import { Injectable } from '@nestjs/common';
import * as postsData from './data/posts.json';

@Injectable()
export class PostsRepository {
  async getAll() {
    return postsData;
  }

  async findById(id: number) {
    return postsData.find((post) => post.id === Number(id));
  }
}
