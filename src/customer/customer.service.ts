import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { Customer } from './interfaces/customer.interface';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
  ) {}
  // fetch all customers
  async getAllCustomer(): Promise<Customer[]> {
    const customers = await this.customerModel.find().exec();
    return customers;
  }
  // Get a single customer
  async getCustomer(customerID): Promise<Customer> {
    const customer = await this.customerModel.findById(customerID).exec();
    return customer;
  }
  // post a single customer
  async addCustomer(createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
    const newCustomer = await new this.customerModel(createCustomerDTO);
    console.log(createCustomerDTO);
    return newCustomer.save();
  }
  // Edit customer details
  async updateCustomer(
    customerID,
    createCustomerDTO: CreateCustomerDTO,
    //Promise<Customer> toma el customer como parametro
  ): Promise<Customer> {
    const updatedCustomer = await this.customerModel.findByIdAndUpdate(
      customerID,
      createCustomerDTO,
      { new: true },
    );
    console.log(customerID);
    return updatedCustomer;
  }
  // Delete a customer
  async deleteCustomer(customerID): Promise<any> {
    const deletedCustomer = await this.customerModel.findByIdAndRemove(
      customerID,
    );
    console.log(customerID);
    return deletedCustomer;
  }
}
