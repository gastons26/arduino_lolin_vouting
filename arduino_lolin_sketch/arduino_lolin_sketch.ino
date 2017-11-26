#include <ESP8266WiFi.h>

typedef struct
{
    int state;
    int counter;
} voutingButton;

int activeId = 0;

WiFiServer server(80);
voutingButton buttons[15];

IPAddress local_IP(192, 168, 69 ,96);
IPAddress gateway(192,168,4,9);
IPAddress subnet(255,255,255,0);

void setup() {
  Serial.begin(115200);
  while (!Serial) { ; }

  setupPin(D5);
  setupPin(D6);
  setupPin(D7);
  
  setupSoftAP();
}

void loop() {
  //Serial.printf("Stations connected = %d\n", WiFi.softAPgetStationNum());
  
  readPin(D5);
  readPin(D6);
  readPin(D7);

  while(Serial.available()) {
    if(Serial.readString() == "GET_DATA") {
      Serial.println(WiFi.softAPIP());
      Serial.println(GetResponse());
    }  
  }
  
  processWifiRequest();
  
  delay(100);
}

void setupPin(int button) {
  pinMode(button, INPUT_PULLUP);
  buttons[button] = {HIGH, 0};
}

void setupSoftAP() {
  WiFi.softAPConfig(local_IP, gateway, subnet);
  
  boolean result = WiFi.softAP("LOLIN_V1", "LOLIN12345");
  if(result == true)
  {
    Serial.print(WiFi.softAPIP());
    Serial.println("Ready");   
    server.begin();
  }
  else
  {
    Serial.println("Failed!");
  }
}

//function to read current buttons and if pressed add to counter
//@author Gatis Lapsins VismaEnterprise
void readPin(int button) {  
  if (digitalRead(button) == LOW && buttons[button].state != LOW) {
    buttons[button].state = LOW;
    buttons[button].counter += 1;
    return;
  }
  
  buttons[button].state = digitalRead(button);
}

void resetButtons() {
  buttons[D5] = {HIGH, 0};
  buttons[D6] = {HIGH, 0};
  buttons[D7] = {HIGH, 0};
}

String GetResponse() {
    String response = String();
    
    response = "{green: ";
    response += buttons[D5].counter;
    
    response += ", yellow: ";
    response += buttons[D6].counter;
    
    response += ", red: ";
    response += buttons[D7].counter;
    
    response += "}";
    
    return response;
    
}

void processWifiRequest() {
  WiFiClient client = server.available();

  if (!client) {
    return;
  }

  int counter = 0;
  while(!client.available()){
    Serial.println("Client not available");
    counter++;
    if(counter == 5) {
      return;
    }
    delay(100);
  } 
  String result = GetResponse();
  String request = client.readStringUntil('\r');
  client.flush(); 

  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: application/json");
  client.println("Accept: application/json");
 
  if (request.indexOf("/get_count") != -1)  {
    client.println("");
    client.print(result); 

  } else if(request.indexOf("/reset") != -1) {
    resetButtons();
    client.println("");
    client.print("RESET");
  } else {
    client.println("");
    client.println(WiFi.softAPIP()); 
  }
}


