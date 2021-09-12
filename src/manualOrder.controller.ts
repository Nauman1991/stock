// products.controller.ts
import { Controller, Get , Post} from '@nestjs/common';
import { Ctx, RequestContext } from '@vendure/core'; 

@Controller('products')
export class ManualOrderController {
  constructor() {}

  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  saveManualOrder(@Ctx() ctx: RequestContext) {
        console.log("Manual Order") ;
        return true;
  }
}