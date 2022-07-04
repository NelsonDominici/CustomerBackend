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
    token = bcrypt.hashSync(password, 256);
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
    console.log(username, email, password, token);
    return 'Good';
  }

  async logUser(email: string, password: string) {
    console.log(password);
    const user = await this.UserModel.findOne({ email: email });
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
