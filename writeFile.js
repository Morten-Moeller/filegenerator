const fs = require('fs')

function writeFile(name = 'myFunction') {
  fs.writeFileSync(
    `./${name}.js`,
    `function ${name}() { 
          
}`
  )
}

module.exports = writeFile
