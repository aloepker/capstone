#include <OneWire.h>
#include <DallasTemperature.h>
// Data wire is plugged into pin 3 on the Arduino
#define ONE_WIRE_BUS 3
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

void setup() {
sensors.begin();
Serial.begin(9600);
}

void loop() {
sensors.requestTemperatures();
float rawTemp = sensors.getTempCByIndex(0);
float tempC = (((rawTemp+0.25)*99.88)/99.44)+0.01;
float tempF = (tempC*9/5)+32;
Serial.print("c:");
Serial.println(tempC);
delay(300);
Serial.print("f:");
Serial.println(tempF);
delay(300);
}
