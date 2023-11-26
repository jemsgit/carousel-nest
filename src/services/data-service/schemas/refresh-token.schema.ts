import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type RefreshTokenDocument = mongoose.HydratedDocument<RefreshToken>;

@Schema()
export class RefreshToken {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true })
  token: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
