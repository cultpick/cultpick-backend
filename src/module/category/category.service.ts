import { Injectable } from '@nestjs/common';
import { categoryData } from 'src/module/category/category';

@Injectable()
export class CategoryService {
  getCategoryList() {
    return categoryData;
  }
}
