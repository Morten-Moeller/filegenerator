const a = process.argv[2]
const b = process.argv[3]

function add(a, b) {
  return String(+a + +b)
}

process.stdout.write(add(a, b))
