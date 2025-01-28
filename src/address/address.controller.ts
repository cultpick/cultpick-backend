import { Controller, Get } from '@nestjs/common';
import { AddressService } from './address.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Address (주소)')
@Controller('/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({
    summary: '주소 목록 조회',
  })
  @Get('/')
  getAddresses() {
    return this.addressService.getAddresses();
  }
}
