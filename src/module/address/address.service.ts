import { Injectable } from '@nestjs/common';
import { addressData } from 'src/module/address/address';

@Injectable()
export class AddressService {
  getAddresses() {
    return addressData;
  }
}
