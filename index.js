const writeFile = require('./writeFile')
const inquirer = require('inquirer')

const questions = [
  {
    type: 'input',
    name: 'fileNames',
    message:
      'Which functions and files would you like to create? Please seperate by comma. \n',
  },
]

inquirer.prompt(questions).then(answers => {
  const names = answers['fileNames'].split(',').map(name => name.trim())
  names.forEach(name => writeFile(name))
})
