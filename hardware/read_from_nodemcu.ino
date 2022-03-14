// balance recieved from NodeMCU
int balanceRecieved;

void setup() {
 // baud rate 9600 
 Serial.begin(9600);
}

void loop() {
 // reading recieved data 
 balanceRecieved = Serial.read();
 Serial.println(balanceRecieved);
 delay(1000);
}
