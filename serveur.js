const net = require('net')
const fs = require('fs');
const process = require('process'); 
//const test = require('client.js')
filenames = fs.readdirSync(__dirname); 
  

const server = net.createServer((socket) => {
  console.log('new connection')

  socket.on('data', (data) => {
    const [directive, parameter] = data.toString().split(' ')

    switch(directive) {
        case 'USER':
            // check if user exist in database
            // if true
            const rd = fs.readFileSync('login.json');
            const contenu = JSON.parse(rd);

            contenu.forEach(element => {
                if(element["username"] == parameter){
                    socket.username = parameter;
                    socket.write('user existe');
                }
            });
            if(socket.username == null){
                    socket.write('user dont existe');
                }
            break;
            
                
            

        case 'PASS':
            const rd2 = fs.readFileSync('login.json');
            const contenu2 = JSON.parse(rd2);
            contenu2.forEach(element => {
                if(element["password"] == parameter && element['username'] == socket.username){
                    socket.write('good password')
                    socket.pass = true;
                    
                }
            });
            if(socket.pass == false){
                    socket.write('try another password')
                }
            break;
                
            
        
        case 'LIST':

            socket.write("\nCurrent directory filenames:"); 
            filenames.forEach(file => { 
              socket.write(file+" "); 
            }); 

            break;

        case 'CWD':
            // Printing current directory 
            socket.write("current working directory: " + process.cwd()); 
            try { 

            // Change the directory 
            process.chdir(parameter); 
            socket.write("working directory after "+ "changing: " + process.cwd()); 
            } catch (err) { 

            // Printing error if occurs 
            socket.write("error occured while "
            + "changing directory: " + err); 
            }
            
            break;
        
        case 'RETR':
            let path = process.cwd()
            
            if(fs.existsSync('C:/Users/ABELHAJ/Desktop/efrei/codeflix/onecode/season.03/projet'+parameter) && fs.existsSync(path+'\\'+parameter)){
              
              fs.copyFileSync(path+'\\'+parameter, 'C:/Users/ABELHAJ/Desktop/efrei/codeflix/onecode/season.03/projet/files/'+parameter);
              
            }else{
              socket.write('please retry there was an error');
            }
            
        case 'PWD':
            socket.write(process.cwd())



            socket.write('200 successfuly connected')
            break;
        
        case 'QUIT':

            socket.end()
            break;
    }
  })

  socket.write('Hello from server')
})


server.listen(5000, () => {
  console.log('Server started at port 5000')
})
