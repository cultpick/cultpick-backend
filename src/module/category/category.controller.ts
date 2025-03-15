import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';

@ApiTags('Category (카테고리)')
@Controller('/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: '카테고리 목록 조회',
  })
  @Get('/')
  getCategoryList() {
    return this.categoryService.getCategoryList();
  }
}
