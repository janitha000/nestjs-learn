import { Injectable } from '@nestjs/common';

@Injectable()
export class Connection {
  constructor() {
    console.log('Connection class initiated');
  }
}
