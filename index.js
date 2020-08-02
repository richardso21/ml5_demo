// all DOM elements
const model_status = document.getElementById("model_status");
const spinner = document.getElementById("spinner");
const main = document.getElementById("main");
const img_input_btn = document.getElementById("img_input_btn");
const img_submit_btn = document.getElementById("img_submit_btn");
const img_wrapper = document.getElementById("img_wrapper");
const prediction = document.getElementById("prediction");
const confidence = document.getElementById("confidence");

main.style.pointerEvents = "none";
main.style.filter = "blur(5px)";

// load model first
const classifier = ml5.imageClassifier("MobileNet", (err, model) => {
  console.log("MobileNet loaded!");
  model_status.innerHTML = "Model Loaded!";
  model_status.style.color = "lightgreen";
  main.style.pointerEvents = "auto";
  main.style.filter = "none";
  spinner.style.visibility = "hidden";
});

img_submit_btn.addEventListener("click", () => {
  // remove previous image
  if (img_wrapper.childNodes.length == 1)
    img_wrapper.removeChild(img_wrapper.lastElementChild);
  // new image instance & fetch file
  const img = new Image();
  const file = img_input_btn.files[0];
  // attach image instance src
  img.src = URL.createObjectURL(file);
  // add image to DOM
  img_wrapper.appendChild(img);
  img.onload = () => {
    // predict image
    predictImg(img);
  };
});

function predictImg(input_img) {
  classifier.predict(input_img, (err, results) => {
    // once classified, add to DOM
    prediction.innerHTML = `Prediction: ${results[0].label}`;
    confidence.innerHTML = `Confidence: ${(results[0].confidence * 100).toFixed(2)}%`;
  });
}
