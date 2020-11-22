const net = require('net')
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

const client = new net.Socket()

client.connect(5000, '127.0.0.1', () => {
  console.log('connected')

  rl.on('line', (request) =>[
    client.write(request)
   ]);
   
  //client.write('USER dylan \n\r')
})


client.on('data', (data) => {
  console.log(data.toString())
  //client.end();
})
