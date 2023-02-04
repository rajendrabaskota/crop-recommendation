#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "DHT.h"

#define DHTTYPE DHT11   // DHT 11
#define dht_dpin 0

DHT dht(dht_dpin, DHTTYPE);

//=============================================MOTION SENSOR DEVICE ID==============================================
String node_id = "2";
//==================================================================================================================
//int prevstate = LOW;
//String d;
String data;
//============================================WIFI CREDENTIALS OF HUB================================================
const char* ssid = "server1";
const char* password = "qwertyuiop";
String host = "http://10.10.10.1/feed?";
//============================================defining the object====================================================
WiFiClient client;
HTTPClient http;
//============================================defining the IP Address of the sensor==================================
IPAddress ip (10, 10, 10, 32);
IPAddress gateway (10, 10, 10, 1);
IPAddress subnet (255, 255, 255, 0);

//============================================SETUP PART=============================================================
void setup(void) {
  dht.begin();
  Serial.begin(115200);
  ESP.eraseConfig();
  WiFi.persistent(false);
  Serial.println("SET ESP IN STA MODE");
  WiFi.mode(WIFI_STA);
  Serial.println("- connecting to wifi");
  WiFi.config(ip, gateway, subnet); 
  WiFi.begin(ssid, password);
  Serial.println(".");
  Serial.println("- wifi connected");
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

}
//============================================READ THE STATE OF SENSOR================================================
void readdata(){
  
 float h =0.0;  //Humidity level
 float t =0.0;  //Temperature in celcius 
 float f =0.0;  //Temperature in fahrenheit
// float m_p = 0.0; //Moisture Percentage 

 h = dht.readHumidity();    //Read humidity level
 t = dht.readTemperature(); //Read temperature in celcius
 f = (t * 1.8) + 32;        //Temperature converted to Fahrenheit
// m_p = ( 100.00 - ( (analogRead(moisture_pin)/1023.00) * 100.00 ) );

 data = "node_id=";
 data += String(node_id);
 data += "&temp=";
 data += String(t);
 data += "&humidity=";
 data += String(h);

 http.begin(client, host);
 http.addHeader("content-type","application/x-www-form-urlencoded");
 http.POST(data);
 http.writeToStream(&Serial);
 http.end();
 Serial.println("data stream: "+data);
}

//  if(true){
//    if(true){
//      d = "high";
//      data = "ID=";
//      data += String(id);
//      data += "&state=";
//      data += String(d);
//      http.begin(client, host);
//      http.addHeader("content-type","application/x-www-form-urlencoded");
//      http.POST(data);
//      http.writeToStream(&Serial);
//      http.end();
//      Serial.println("data stream: "+data);
//    }else{
//      d = "low";
//      data = "ID=";
//      data += String(id);
//      data += "&state=";
//      data += String(d);
//      http.begin(client, host);
//      http.addHeader("content-type","application/x-www-form-urlencoded");
//      http.POST(data);
//      http.writeToStream(&Serial);
//      http.end();
//      Serial.println("data stream: "+data);
//    }
//  }prevstate = currentstate;

//}


//============================================LOOP PART================================================
void loop () {
  readdata();
  delay(2000);
}
