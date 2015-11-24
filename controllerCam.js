
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var com = require("serialport");

var rotateDataX = "90";//String.fromCharCode(65);
var rotateDataY = "270" ;

//-------------Initialize_Serial-------------//

//var useSerialport = false;
var serialport = undefined;

com.list(function (err, ports) {
    console.log('');
    console.log( '----------------SerialPort---------------');
    console.log('');
    console.log( 'Detected functional ports = ' , ports.length, "Including Bluetooth");

    for(i=0; i<ports.length; i++){
      var port = ports[i]; 
      //console.log(port.comName);
      
      if( port.comName == "/dev/cu.usbmodem1411" ){
      console.log("connected ---- ", "USB_1411");

      serialport = new com.SerialPort("/dev/tty.usbmodem1411",{
        baudrate: 9600,
      });
      //useSerialport = true;
      SerialStart();

      break;
      }

      else if( port.comName == "/dev/cu.usbmodem1421" ){
      console.log("connected ---- ", "USB_1421");

      serialport = new com.SerialPort("/dev/tty.usbmodem1421",{
        baudrate: 9600,
      });
      //useSerialport = true;
      SerialStart();

      break;
      }

      else{
        if(i == (ports.length-1)){
          console.log("Expecting bluno plug to USB port / Or try on MAC");
        }
      }
    }
    
    console.log('');
    console.log('        _____ ');
    console.log('    __- ----  -_ ');
    console.log('   /|||||||||||||、 ');
    console.log('  /|||||||||||||||、 ');
    console.log('  |--____         | ');
    console.log('  |_/    `------—--| ');
    console.log('  |/  ^   ` --___ | ');
    console.log(' (|   |     |   `|)');
    console.log('  |   ~      ~.  ||');
    console.log('   、    ^      /  |');
    console.log('  / `、        ‘   |');
    console.log(' /  O//`----/ | o Cam is on port 3000');
    console.log(' ');
    console.log('');
    console.log( '-------------------------------------------');
});


    console.log("");
    console.log("---------------|  SmartCam  |-----------------");
    console.log(' ');

//----------------Route--------------------//

//console.log(app);

app.use(express.static('cam'));

//------------Stars_Source------------//

app.get('/', function(req, res){
  res.sendfile('public/index.html');
});

app.get('/getPos', function(req, res){
  var currentPos = {
                    x : (rotateDataX-0),
                    y : (rotateDataY-230)
                    }
  //res.writeHeader(200);
  res.send(currentPos);
  //res.send(200);
});

var io = false;

app.post('/io',function(req, res) {
   io = !io;
   console.log('I/O ' + io);
   res.send(200);
  });

app.post('/posX',function(req, res) {
  rotateDataX = req._parsedUrl.query + '';
  console.log(' X : ' + rotateDataX );
  res.send(200);
  });


app.post('/posY',function(req, res) {
  rotateDataY = req._parsedUrl.query + '';
  console.log(' Y : ' + rotateDataY );
  res.send(200);
  });

//----------------Display IP Address on Terminal-------------------//

http.listen(3000, function(){
  console.log(' ');
  console.log(' ');
  //console.log('------- | Scan the QR_Code or Type URL into your browser | -------');
  console.log(' ');
  console.log(' Server address on');
  //GetLocalIPAddr();
});

//-----------------Socket.io----------------//

// var horizontal = 90;
// var vertical = 190;

// io.on('connection', function(socket){

//     socket.on('facePos', function(msg){
//       //console.log(msg);
//       if(msg[0]< -20 ){
//         horizontal = "A";
//       }
//       else if(msg[0] > 20){
//         horizontal = "D";
//       }else if(msg[0]>= -20 && msg[0]<= 20 ){
//         horizontal = "N";
//       }

//       if(msg[1]< -15 ){
//         vertical = "W";
//       }
//       else if(msg[1] > 15){
//         vertical = "S";
//       }else if(msg[1]>= -20 && msg[0]<= 20 ){
//         vertical = "N";
//       }
 
//     });
  
//});


//-------------SerialPort_Stuff---------//

function SerialStart(){

serialport.on('open', function(){
console.log(' Serial Port Opend');
serialport.write(rotateDataX);
prime();

//serialport.on('data', function(data){
//console.log(">>",data.toString());
//});

});

var primeInterval = true;

function prime(){
  setTimeout(function(){

    if(io){
    if(primeInterval){
    serialport.write(rotateDataX);
    }

    else{
    serialport.write(rotateDataY);
    }

    primeInterval = !primeInterval;
    }

    prime();

  },240);


}

}

