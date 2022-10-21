// const _ = require('lodash')

import _ from 'lodash';

// const chalk = require('chalk');
import Chalk from 'chalk';



const a = [1, 9, 3, 7, 5];
const b = [6, 7, 8, 9, 0];

const diff = _.difference(a, b);

console.log(Chalk.red.bold(diff));