const writeFile = require('./writeFile')
const inquirer = require('inquirer')

const questions = [
  {
    type: 'input',
    name: 'fileNames',
    message:
      'Which functions and files would you like to create? Please seperate by comma. \n',
  },
  {
    type: 'checkbox',
    message: 'Select filetypes',
    name: 'fileTypes',
    choices: [{ name: 'component' }, { name: 'spec' }, { name: 'stories' }],
    validate(answer) {
      if (answer.length < 1) {
        return 'You must chose atleast one'
      }
      return true
    },
  },
]

inquirer.prompt(questions).then(answers => {
  const names = answers['fileNames'].split(',').map(name => name.trim())
  names.forEach(name => writeFile(name))
})
