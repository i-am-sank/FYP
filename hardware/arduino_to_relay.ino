#define pulsein 8
#define relay 12

int rupees = 10;
float units = 0;
bool connectionOpen = false;

void setup() {
    Serial.begin(9600);
    pinMode(pulsein, INPUT);
    pinMode(relay, OUTPUT);
    digitalWrite(pulsein, HIGH);
}

void loop() {
    read_pulse();
    check_status();
    log();
    delay(10000);
}

void read_pulse()
{
    if(!digitalRead(pulsein))
    {
      Serial.println("Pulse received");
      //count++;
      //units=watt_factor*count/1000;
      
      if(units>1){
        units--;  
      }
      
      rupees=units*5;
      
      while(!digitalRead(pulsein));
      
     // delay(2000);
     Serial.println("Pulse lost");
    }
}

void check_status() {
    
    if(rupees>5 && connectionOpen==false)
    {
      digitalWrite(relay, HIGH);
      Serial.println("Recharged! Opening connection");
      connectionOpen = true; 
    }
    if(rupees<5 && connectionOpen==true)
    {
      digitalWrite(relay, LOW);
      Serial.println("Energy Meter Balance Alert:\nLight cut due to low Balance\nPlease recharge your energy meter soon.\n Thank you");
      connectionOpen = false;
    }

    // simulate bulb on
    if (rupees >= 5) rupees--;
}

void log() {
  Serial.println("Units");
  Serial.println(units);
  Serial.println("Rupees");
  Serial.println(rupees);
}
