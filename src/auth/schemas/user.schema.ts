import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
  timestamps: true
})

export class User {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Cette email est déjà utilisé par un autre utilisateur'] })
  email: string

  @Prop({ default: false })
  isEmailConfirmed: boolean;

  @Prop()
  contact: string
  
  @Prop()
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)