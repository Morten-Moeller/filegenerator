const writeFile = require('./writeFile')
const inquirer = require('inquirer')

const templates = {
  component: name => `import styled from 'styled-component'

    export default function ${name}() { 
      return <div>${name}</div>
  }`,
  spec: name => `import ${name} from './${name}'
      
      describe('${name}', => {
          it('should', () => {
  
          }
      })`,
  stories: name => `import ${name} from './${name}'
      ...
      `,
}

const questions = [
  {
    type: 'input',
    name: 'name',
    message:
      'Which functions and files would you like to create? Please seperate by comma. \n',
  },
  {
    type: 'checkbox',
    message: 'Select filetypes',
    name: 'fileTypes',
    choices: [
      { name: 'component', checked: true },
      { name: 'spec', checked: true },
      { name: 'stories', checked: true },
    ],
    validate(answer) {
      if (answer.length < 1) {
        return 'You must chose atleast one'
      }
      return true
    },
  },
]

inquirer.prompt(questions).then(answers => {
  answers.fileTypes.forEach(fileType => {
    const fileString = templates[fileType](answers.name)
    writeFile(answers.name, fileType, fileString)
  })
})
