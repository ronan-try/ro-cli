import { gray } from 'chalk';

const textGray = msg => gray(msg);

const logStep = msg => {
  console.log('\n', textGray(msg), '\n');
};

export { logStep };
