
// Setup the server to recieve data over wifi
#include<ESP8266WiFi.h>
#include<ESP8266WebServer.h>
#include<SoftwareSerial.h>

// configuration params for acces points
char* ssid_ap = "ESP8266_SSID";
char* password_ap = "wifimodule";
IPAddress ip(192,168,11,4);
IPAddress gateway(192,168,11,1);
IPAddress subnet(255,255,255,0);

// serial data transfer with other peripherals
SoftwareSerial s(3,1); // (Rx, Tx)
//setup the server object
ESP8266WebServer server;

int balance = 0;

void setup() {

  // configuration
  WiFi.mode(WIFI_AP);
  WiFi.softAPConfig(ip,gateway,subnet);
  WiFi.softAP(ssid_ap, password_ap);

  // baud rate 9600
  s.begin(9600);

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
  s.write(balance);
}
// handles update query, updates the balance of the user.
void handleUpdate(){
  balance = server.arg("value").toInt();
  server.send(200,"text/plain","Updated");
}
