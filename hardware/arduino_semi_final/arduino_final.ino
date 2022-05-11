#define pulsein 8
#define relay 12

float units = 0;
bool connectionOpen = false;
float balanceRecieved;
int totalBalance;
float consumedUnits = 1 / 3200; // units consumed by 100 watt bulb in a second

void read_pulse()
{
  if (!digitalRead(pulsein))
  {
    Serial.println("Pulse received");

    if (units > 0) {
      units = units - consumedUnits;
    }
    while (!digitalRead(pulsein));

    Serial.println("Pulse lost");
  }
}

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
  //delay(1000);
}


void handle_balance_update() {
  balanceRecieved = Serial.read();

  if (balanceRecieved > 0) {

    // 30000 rupees per unit
    units += balanceRecieved / 30000 ; //divide factor /x;

    Serial.println("User deposited! Amount deposited:");
    Serial.print(balanceRecieved);
    Serial.println();
    Serial.println("Updated units to");
    Serial.print(units);
    Serial.println();
  }
}



void check_status() {

  if (units > 0 && connectionOpen == false)
  {
    digitalWrite(relay, HIGH);
    Serial.println("Recharged! Opening connection");
    connectionOpen = true;
  }
  if (units == 0 && connectionOpen == true)
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
