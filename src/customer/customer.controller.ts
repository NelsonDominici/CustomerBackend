import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  // add a customer
  @Post('/create')
  async addCustomer(@Res() res, @Body() createCustomerDTO: CreateCustomerDTO) {
    const customer = await this.customerService.addCustomer(createCustomerDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been created successfully',
      customer,
    });
  }

  // Retrieve customers
  @Get('customers')
  async getAllCustomer(@Res() res) {
    const customers = await this.customerService.getAllCustomer();
    return res.status(HttpStatus.OK).json(customers);
  }

  // Get a particular customer using ID
  @Get('customer/:customerID')
  async getCustomer(@Res() res, @Param('customerID') customerID) {
    const customer = await this.customerService.getCustomer(customerID);
    if (!customer) throw new NotFoundException('Customer does not exist!');
    return res.status(HttpStatus.OK).json(customer);
  }

  // Update customer's data
  @Put('/update')
  async updateCustomer(
    @Res() res,
    @Query('customerID') customerID,
    @Body() createCustomerDTO: CreateCustomerDTO,
  ) {
    const customer = await this.customerService.updateCustomer(
      customerID,
      createCustomerDTO,
    );
    if (!customer) throw new NotFoundException('Customer does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been successfully updated',
      customer,
    });
  }

  // Delete a customer
  @Delete('/delete')
  async deleteCustomer(@Res() res, @Query('customerID') customerID) {
    const customer = await this.customerService.deleteCustomer(customerID);
    if (!customer) throw new NotFoundException('Customer does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been deleted',
      customer,
    });
  }
}
