
async function getSoilMoisture(cropId) {
  const soilThresholdResponse = await fetch("https://soil-moisture-threshold.herokuapp.com/plant/" + cropId)
  const responseJson = await soilThresholdResponse.json();
  console.log(responseJson);
  const plantData = responseJson.plant.moistureThreshold;
  console.log(plantData);
  document.getElementById("soil-moisture").innerText = plantData;
}
