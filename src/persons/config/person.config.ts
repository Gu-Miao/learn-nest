import { registerAs } from '@nestjs/config';

export default registerAs('person', () => ({
  type: 'person',
}));
