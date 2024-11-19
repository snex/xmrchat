import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserToken } from './user-token.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { UserTokenType } from 'src/shared/constants/enum';
import { generateOtp } from 'src/shared/utils';

@Injectable()
export class UserTokensService {
  private logger = new Logger(UserTokensService.name);

  constructor(
    @InjectRepository(UserToken) private repo: Repository<UserToken>,
  ) {}

  async createToken(payload: { type: UserTokenType; userId: number }) {
    const token = generateOtp();
    const currentDate = new Date();
    const expiresAt = new Date(
      currentDate.setMinutes(currentDate.getMinutes() + 10),
    ).toISOString();

    const created = this.repo.create({
      token,
      type: payload.type,
      user: { id: payload.userId },
      expiresAt,
    });

    return this.repo.save(created);
  }

  async findById(id: number) {
    if (!id) return null;
    return this.repo.findOneBy({ id });
  }

  async findValidForUser(userId: number, type: UserTokenType) {
    if (!userId) return null;
    const validToken = await this.repo.findOne({
      where: { user: { id: userId }, expiresAt: MoreThanOrEqual(new Date()) },
    });

    if (!validToken) return null;
    return validToken;
  }

  async findByToken(token: string) {
    return this.repo.findOneBy({ token });
  }

  async remove(id: number) {
    const userToken = await this.repo.findOneBy({ id });
    if (!userToken) throw new NotFoundException('Token is not found.');

    return this.repo.remove(userToken);
  }

  async validateToken(token: string, type: UserTokenType) {
    const userToken = await this.findByToken(token);

    if (!userToken) throw new BadRequestException('Invalid / Expired token.');

    if (userToken.type !== type)
      throw new BadRequestException('Validation type is incorrect.');

    const isExpired = userToken.expiresAt < new Date();

    if (isExpired) throw new BadRequestException('Token is expired.');

    return userToken;
  }
}