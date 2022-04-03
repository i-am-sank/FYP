#define pulsein 8
#define relay 12

float units = 10;
bool connectionOpen = false;
int balanceRecieved;
int totalBalance;

void setup() {
    Serial.begin(9600);
    pinMode(pulsein, INPUT);
    pinMode(relay, OUTPUT);
    digitalWrite(pulsein, HIGH);
}

void loop() {
    read_pulse();
    check_status();
    handle_balance_update();
    log();
    delay(10000);
}


void handle_balance_update(){
  balanceRecieved = Serial.read();
  
  if(balanceRecieved > 0){
    
    units += balanceRecieved ; //divide factor /x;

    Serial.println("User deposited! Amount deposited:");
    Serial.print(balanceRecieved);
    Serial.println();
    Serial.println("Updated units to");
    Serial.print(units);
    Serial.println();
  }
}

void read_pulse()
{
    if(!digitalRead(pulsein))
    {
      Serial.println("Pulse received");
      
      if(units>1){
        units--;  
      }

      while(!digitalRead(pulsein));

     Serial.println("Pulse lost");
    }
}

void check_status() {
    
    if(units>0 && connectionOpen==false)
    {
      digitalWrite(relay, HIGH);
      Serial.println("Recharged! Opening connection");
      connectionOpen = true; 
    }
    if(units==0 && connectionOpen==true)
    {
      digitalWrite(relay, LOW);
      Serial.println("Energy Meter Balance Alert:\nLight cut due to low Balance\nPlease recharge your energy meter soon.\n Thank you");
      connectionOpen = false;
    }

}

void log() {
  Serial.println("Units");
  Serial.println(units);

}
