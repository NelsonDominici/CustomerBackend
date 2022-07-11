/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

//import bcrypt from 'bcrypt';
//import jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/*
const payload = {
  sub: '2341325',
  name: 'jose perez',
  admin: false,
};

const secretpasswordkey = process.env.SECRET;
const token = jwt.sign(payload, secretpasswordkey, {
algorithm: 'HS256',
});
*/
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async findAll() {
    const users = this.UserModel.find({});
    return users;
  }

  async findById(id: string) {
    return await this.UserModel.findOne({ _id: id });
  }

  async createUsers(
    username: string,
    email: string,
    password: string,
    token: string,
  ) {
    const user = await this.UserModel.findOne({ email });
    if (user) {
      return 'This user already exists';
    } else {
      token = bcrypt.hashSync(password, 10);
      jwt.sign(
        { username: username, email: email, password: password },
        'secretpasswordkey',
      );
      const newUser = new this.UserModel({
        username,
        email,
        password: token,
        token,
      });
      newUser.save();
      return 'Good';
    }
  }

  async logUser(email: string, password: string) {
    const user = await this.UserModel.findOne({ email });
    const match = bcrypt.compareSync(password, user.password);
    if (match) {
      return {
        token: user.token,
        id: user._id,
      };
    } else {
      return 'login has failed';
    }
  }
}
