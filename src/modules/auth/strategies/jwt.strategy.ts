import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { environment } from 'src/environment/environment';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { JwtPayload } from '../models/jwt.payload';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly service: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environment.JWT_KEY,
    });//valida o jwt da head com a senha do env
  }

  //validar usuario
  public async validate(payload: JwtPayload): Promise<UserEntity> {
    return await this.service.validateJwt(payload);
  }
}
