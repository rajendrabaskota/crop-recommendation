#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <SoftwareSerial.h>
#include <ArduinoJson.h>

//======================================WIFI CREDENTIALS for Hotspot==================================
const char* ssid_node = "server1";
const char* password_node = "qwertyuiop"; 
const char* ssid_backend = "navaraj44_2.4";
const char* password_backend = "CLB2760A35";

int max_connection = 8;
int no_nodes = 2;
//====================================================================================================
String data0;
String data1;
String data2;
//=============================================define the objects======================================
ESP8266WebServer server_node(80);
const char* server_backend = "http://192.168.1.76:8000/from-node";

//===============================================dafine the IP Address of the hotspot==================
IPAddress ip (10, 10, 10, 1);
IPAddress gateway (10, 10, 10, 1);
IPAddress subnet (255, 255, 255, 0);
//=========================================SETUP PART==================================================
void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_AP_STA);
  Serial.println("Setup Access point");
  Serial.println("Disconnect from any other modes");
//  WiFi.disconnect();
  Serial.println("stating access point with SSID" +String(ssid_node)); 
  WiFi.softAP(ssid_node, password_node, 1, false, max_connection); 
  WiFi.softAPConfig(ip, gateway, subnet);
  IPAddress myIP = WiFi.softAPIP();
  Serial.println(myIP);
  server_node.on("/feed",feed);
  server_node.begin();

  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid_backend);
  WiFi.begin(ssid_backend, password_backend);     //Begin WiFi
  
 while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print(WiFi.localIP());
  Serial.println("/");
}
//=====================================handle root page================================================
//===================================handle door sensor page===========================================
void feed(){
  data0 = server_node.arg("node_id");
  data1 = server_node.arg("temp");
  data2 = server_node.arg("humidity");
  server_node.send(200,"text/plain","Response");
}

//==============================================LOOP===================================================
void loop (){
//  WiFi.disconnect();
//  WiFi.mode(WIFI_AP);
//  Serial.println("Setup Access point");
//  Serial.println("Disconnect from any other modes");
//  WiFi.disconnect();
//  Serial.println("stating access point with SSID" +String(ssid_node)); 
//  WiFi.softAP(ssid_node, password_node, 1, false, max_connection); 
//  WiFi.softAPConfig(ip, gateway, subnet);
//  IPAddress myIP = WiFi.softAPIP();
//  Serial.println(myIP);
//  server_node.on("/feed",feed);
//  server_node.begin();
      
  server_node.handleClient();
  Serial.println();
  Serial.println("From Slave");
  Serial.print("Node id: ");
  Serial.println(data0);
  Serial.print("Temp: ");
  Serial.println(data1);
  Serial.print("Humidity: ");
  Serial.println(data2);

//  WiFi.disconnect();
//  WiFi.mode(WIFI_STA);
//  WiFi.disconnect();
//
//  Serial.println();
//  Serial.print("Connecting to ");
//  Serial.println(ssid_backend);
//  WiFi.begin(ssid_backend, password_backend);     //Begin WiFi
//  
// while (WiFi.status() != WL_CONNECTED) {
//    delay(500);
//    Serial.print(".");
//  }
//  
//  Serial.println("");
//  Serial.println("WiFi connected");
//  Serial.print(WiFi.localIP());
//  Serial.println("/");
  
  HTTPClient http;
  WiFiClient client;
  http.begin(client, server_backend);
  http.addHeader("Content-Type", "application/json");

//  int n[2];
//  for (int i = 0; i < 2; i++){ // initialize elements of array n to 0 {
//      n[i] = 0; // set element at location i to 0
//      Serial.print(i);
//   }

  DynamicJsonDocument doc1(1024);
  doc1["node_id"] = "1";
  doc1["temp"] = "20";
  doc1["humidity"] = "65";

  Serial.println();
  Serial.println("From Master");
  Serial.print("Node id: ");
  Serial.println("1");
  Serial.print("Temp: ");
  Serial.println("20");
  Serial.print("Humidity: ");
  Serial.println("65");

  String json1;
  serializeJson(doc1, json1);
 
  int httpResponseCode1 = http.POST(json1);
  Serial.println(httpResponseCode1);
  
  DynamicJsonDocument doc(1024);
  doc["node_id"] = data0;
  doc["temp"] = data1;
  doc["humidity"] = data2;

  // Serialize the JSON document
  String json;
  serializeJson(doc, json);
 
  int httpResponseCode = http.POST(json);
  Serial.println(httpResponseCode);
  
  if (client.connected()) {
    client.stop();
  }
  delay(2000);
  
}
