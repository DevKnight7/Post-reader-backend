import { GetPostByIdDto } from './dto';
import { PostsService } from './posts.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/')
  async getAllPosts() {
    return await this.postsService.getAllPosts();
  }

  @ApiParam({ name: 'id' })
  @Get('/:id')
  async getPostById(@Param() params: GetPostByIdDto) {
    return await this.postsService.getPostById(params.id);
  }
}
