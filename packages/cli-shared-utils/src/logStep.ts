import { textGray } from './chalkText';

export const logStep = (msg: string) => {
  console.log('\n', textGray(msg), '\n');
};
