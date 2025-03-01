import { Injectable } from '@nestjs/common';
import { categoryData } from 'src/common/data/category';

@Injectable()
export class CategoryService {
  getCategoryList() {
    return categoryData;
  }
}
