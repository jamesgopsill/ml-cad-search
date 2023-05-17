console.log("Hello World")

declare var tf: any

const state = document.getElementById("status") as HTMLParagraphElement
const result = document.getElementById("result") as HTMLParagraphElement
const img = document.getElementById("img") as HTMLImageElement
const imgUpload = document.getElementById("img-upload") as any

const classList = ["Bearing", "Collar", "Gear", "Hinge", "Slotted nut"]

// Load the model
console.log(tf.version.tfjs)
const modelUrl = "./model.json"
const model = await tf.loadLayersModel(modelUrl)
state.innerHTML = "Status: Model Loaded."
console.log(model.summary())

// Add the event listener to the upload image input.
imgUpload.addEventListener("change", (event: any) => {
	console.log("Image Uploaded")
	const reader = new FileReader()
	// Read image data callback
	reader.addEventListener("load", () => {
		// Show the image on the browser
		const imgData = reader.result.toString()
		img.src = imgData
		img.style.display = "block"
		// Create the TensorFlow tensor for the model.
		const tensorImg = tf.browser.fromPixels(img).toFloat().expandDims()
		//const testImg = tf.zeros([1, 100, 100, 3])

		// Make the prediction and update the page.
		const prediction = model.predict(tensorImg).squeeze()
		const highestIndex = prediction.argMax().arraySync()
		const predictionArray = prediction.arraySync()
		console.log(highestIndex, predictionArray)
		result.innerHTML = `I think this is a <b>${
			classList[highestIndex]
		}</b> with <b>${predictionArray[highestIndex] * 100}%</b> confidence.`
		result.style.display = "block"
	})
	// Read the image data
	reader.readAsDataURL(event.target.files[0])
})
