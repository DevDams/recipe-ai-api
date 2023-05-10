import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { MailsService } from 'src/mails/mails.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private mailService: MailsService,
  ) {}

  // inscription
  async signUp(signUpDto: SignupDto): Promise<{ token: string; user: {} }> {
    const { name, email, contact, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      contact,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({ id: user._id });

    const verifyUrl = `http://localhost:9993/auth/confirm/${token}`;

    const html = `<p>Cliquer <a href="${verifyUrl}">ici</a> pour confirmer votre adresse mail</p>`;

    await this.mailService.sendMail({
      html,
      to: email,
      subject: "Confirmation d'adresse email",
    });

    return { token, user: user };
  }

  // confirmation d'email
  async confirmEmail(token: string): Promise<any> {
    const result: any = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    if (
      !result ||
      typeof result !== 'object' ||
      !result.id ||
      typeof result.id !== 'string'
    ) {
      throw new UnauthorizedException('Token invalide');
    }

    let user: User;
    try {
      user = await this.userModel.findOne({ id: result.id });
    } catch (error) {
      throw new UnauthorizedException('Token invalide');
    }

    await this.userModel.findByIdAndUpdate(result.id, { isEmailConfirmed: true });
    return { message: 'Email confirmé avec succès' };
  }

  // connexion
  async login(loginDto: LoginDto): Promise<{ token: string; user: {} }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    const token = this.jwtService.sign({ id: user._id });

    return { token, user: user };
  }
}
