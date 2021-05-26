const writeFile = require('./writeFile')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question(
  'Which functions and files would you like to create? Please seperate by comma. \n',
  answer => {
    answer.split(',').forEach(name => writeFile(name.trim()))

    rl.close()
  }
)
