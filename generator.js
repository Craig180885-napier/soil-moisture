
const userCropChoice = 0;

async function getSoilMoisture()
{
  const soilThresholdResponse = await fetch("https://soil-moisture-threshold.herokuapp.com/plant/" + userCropChoice)
  const responseJson = await soilThresholdResponse.json();
  console.log(responseJson);
  const plantData = responseJson.plant.moistureThreshold;
  console.log(plantData);
  
  return plantData;
}

function getMoistureValue()
{
  const moisture = getSoilMoisture();
  console.log(moisture);
  return moisture;
}

function getCode()
{

const soil = getMoistureValue(); 

var code = ("<br>" +
"// Publish Argon data and Dashboard with Capacitive Moisture Sensors" + "<br>" + 
"// -----------------------------------------" + "<br>" + 
"// This app will publish an event every 30 seconds reporting the moisture sensor analog and percentage" + "<br>" + 
"<br>" + 
"#define soilWet 100   // Define max value we consider soil 'wet'" + "<br>" + 
"#define soilDry " + soil + "  // Define min value we consider soil 'dry'" + "<br>" + 
"<br>" + 
"Servo myservo;" + "<br>" + 
"<br>" + 
"int pos = 0;" + "<br>" + 
"<br>" + 
"// We start by declaring which pins everything is plugged into." + "<br>" + 
"<br>" + 
"int boardLed = D7; // This is the LED that is already on your device." + "<br>" + 
"// On the Core, it's the LED in the upper right hand corner." + "<br>" + 
"// On the Photon, it's next to the D7 pin." + "<br>" + 
"<br>" + 
"int moisture_pin = D2; // This is where your capacitive moisture sensor is plugged in." + "<br>" + 
"float moisture_percentage;" + "<br>" + 
"float voltage;" + "<br>" + 
"int moisture_analog;" + "<br>" + 
"String dryMessage =" + '" s% : "' + ";" + "<br>" + 
"String dryAnalogMessage =" + '" a : "' + ";" + "<br>" + 
"<br>" + 
"// We start with the setup function." + "<br>" + 
"<br>" + 
"void setup() {" + "<br>" + 
  "pinMode(boardLed,OUTPUT); // Our on-board LED is output as well" + "<br>" + 
  "pinMode(moisture_pin,INPUT);  // Our capacitive moisture sensor pin is input (reading the capacitive moisture sensor)" + "<br>" + 
  "myservo.attach(D4); // set the control pin for the servo, these MUST be PVM supported pins." + "<br>" +
  "// Please refer to : https://docs.particle.io/assets/images/argon/argon-pinout-v1.0.pdf" + "<br>" + 
  "// for further info on available PVM pins" + "<br>" + 
"<br>" + 
  "// Just to make sure everything is workign we are going to toggle the LED on and then off really quickly 3x" + "<br>" + 
  "digitalWrite(boardLed,HIGH);" + "<br>" + 
  "delay(200);" + "<br>" + 
  "digitalWrite(boardLed,LOW);" + "<br>" + 
  "delay(200);" + "<br>" + 
  "<br>" + 
  "// Subscribe to the integration response event" + "<br>" + 
  "Particle.subscribe(" + '"hook-response/soil-moisture"' + ", myHandler, MY_DEVICES);" + "<br>" + 
"<br>" + 
"}" + "<br>" + 
"<br>" + 
"void myHandler(const char *event, const char *data) {" + "<br>" + 
  "// Handle the integration response" + "<br>" + 
"}" + "<br>" + 
"<br>" + 
"void readSensor() {" + "<br>" + 
    "//TODO - add code so that readings can be called from the particle event portal" + "<br>" + 
    "moisture_analog = analogRead(moisture_pin);" + "<br>" + 
"}" + "<br>" + 

"void loop() {" + "<br>" + 
    "/* In this loop function, we're going to check to read the moisture sensor" + "<br>" + 
    "After a specified time period we'll send a Particle.publish() to the cloud." + "<br>" + 
    "*/" + "<br>" + 
"<br>" + 
    "// Now we'll take some readings..." + "<br>" + 
    "moisture_analog = analogRead(moisture_pin); // read capacitive sensor" + "<br>" + 
    "moisture_percentage = (100 - ( (moisture_analog/4095.00) * 100 ) );" + "<br>" + 
    "<br>" + 
    "<br>" + 
     "if(moisture_percentage <= soilDry)" + "<br>" + 
    "{" + "<br>" + 
        "digitalWrite(boardLed,HIGH);" + "<br>" + 
        "delay(2000);" + "<br>" + 
        "Particle.publish("+'"soil-is-dry"' + ", String(dryMessage) + moisture_percentage ,PRIVATE);" + "<br>" + 
        "<br>" +    
          "for(pos = 0; pos < 90; pos += 1)  // goes from 0 degrees to 90 degrees" + "<br>" + 
          "{                                  // in steps of 1 degree" + "<br>" + 
            "myservo.write(pos);              // tell servo to go to position in variable 'pos'" + "<br>" + 
            "delay(5);                       // waits 15ms for the servo to reach the position" + "<br>" + 
          "}" + "<br>" + 
          "<br>" +           
          "delay(3000);" + "<br>" + 
          "<br>" +           
          "for(pos = 90; pos>=1; pos-=1)     // goes from 90 degrees to 0 degrees" + "<br>" + 
          "{" + "<br>" + 
            "myservo.write(pos);              // tell servo to go to position in variable 'pos'" + "<br>" + 
            "delay(5);                       // waits 15ms for the servo to reach the position" + "<br>" + 
          "}"+ "<br>" + 
    "}" + "<br>" + 
    "<br>" +    
    "// Send a publish to your devices..." + "<br>" + 
    "Particle.publish(" + '"soil-moisture"' + ", String(moisture_percentage),PRIVATE);" + "<br>" + 
    "Particle.publish(" + '"moisture-analog"' + ", String(moisture_analog),PRIVATE);" + "<br>" + 
    "digitalWrite(boardLed,LOW);" + "<br>" + 
    "// wait 1 minute" + "<br>" + 
    "delay(60000);" + "<br>" + 
"}");

return code.toString();
}