import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string) {
    console.log(value);
    const val = parseFloat(value);
    if (isNaN(val)) {
      throw new BadRequestException(`validation failed. ${value} is not a integer.`);
    }
    return value;
  }
}
