const writeFile = require('./writeFile')
const inquirer = require('inquirer')

const templates = {
  component: name => `import styled from 'styled-component'

    export default function ${name}() { 
      return <div>${name}</div>
  }`,
  spec: name => `import { render, screen } from '@testing-library/react'
  import ${name} from './${name}'
  
  describe('${name}', () => {
    it('has af Carcasonne as text', () => {
      const { container } = render(<${name} />)
  
      expect(container.firstChild).toHaveTextContent('${name}')
    })
  })
  `,
  stories: name => `import React from 'react'
  import ${name} from './${name}'
  
  export default {
    title: '${name}',
    component: ${name},
  }
  
  const Template = args => <${name} {...args} />
  
  export const Default${name} = Template.bind({})
  Default${name}.args = {}`,
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
