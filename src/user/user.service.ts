import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UserService {
  async getUser() {
    try {
      const response = await axios.get(
        'http://www.culture.go.kr/openapi/rest/publicperformancedisplayservice',
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  }
}
