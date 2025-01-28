import { Injectable } from '@nestjs/common';
import { addressData } from 'src/common/data/address';

@Injectable()
export class AddressService {
  getAddresses() {
    return addressData;
  }
}
