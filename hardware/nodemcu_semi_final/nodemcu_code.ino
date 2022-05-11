
// Setup the server to recieve data over wifi
#include<ESP8266WiFi.h>
#include<ESP8266WebServer.h>
#include<SoftwareSerial.h>

// configuration params
char* ssid = "ssid";
char* password = "password";


// serial data transfer with other peripherals
SoftwareSerial SUART(3,1); // (Rx, Tx)

//setup the server object
ESP8266WebServer server;

int balance = 0;

void setup() {

  
  SUART.begin(9600);
  delay(100);
  
  WiFi.begin(ssid, password);             // Connect to the network

  while (WiFi.status() != WL_CONNECTED) { // Wait for the Wi-Fi to connect
    delay(500);
   // Serial.print('.');
  }
 
  
  // invoke handleIndex on recieving request at "/"
  server.on("/",handleIndex);
  // invoke handleUpdate on recieving request at "/update"
  server.on("/update",handleUpdate);
  
  server.begin();
}

void loop() {
  // open the server forever
  server.handleClient();
  
}


// handle request on index page with sending balance to server and arduino.
void handleIndex(){
  server.send(200,"text/plain",String(balance)); 

}


// handles update query, updates the balance of the user.
void handleUpdate(){
  balance = server.arg("value").toInt();
  SUART.write(balance);
  server.send(200,"text/plain","Updated");

}
