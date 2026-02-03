import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  private readonly saltRounds = 10;

  hashPassword(password: string) {
    return bcrypt.hash(password, this.saltRounds);
  }

  comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
