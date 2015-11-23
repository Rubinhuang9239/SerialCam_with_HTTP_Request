#include <Servo.h> 

Servo horizontalServo;
Servo verticalServo;

int ledPin = 12;

int horizontalPin = 2;
int verticalPin = 8;

int horizontalVal = 90;
int verticalVal = 90;
int ledStatus = LOW;


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  
  horizontalServo.attach(horizontalPin);
  verticalServo.attach(verticalPin);
  pinMode(ledPin,OUTPUT);
  Serial.setTimeout(220);
}

void loop() {
   boolean iO = false;
   if(Serial.available() > 0) {
     
     iO = true;
     int input = Serial.parseInt();
     
     
     //if(input != 90){
       Serial.print(input);
       if( input >= 0 && input <= 180)
       {
         horizontalVal = input;
       }
     
       else if( input > 180 && input <= 370)
       {
         verticalVal = input - 190;
       }
      
    }
    
    
    if(iO){
           ledStatus = HIGH;
    }
    else {
           ledStatus = LOW;
         }
    
    horizontalServo.write(horizontalVal);
    verticalServo.write(verticalVal);
    digitalWrite(ledPin, ledStatus);
    delay(10);
}
