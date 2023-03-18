(async () => {
    // Check if EyeDropper feature is supported in the browser
    if (!"EyeDropper" in window) {
        alert("EyeDropper feature is not supported in this browser.");
        return;
    }

    // Load selected colors from the local extension storage
    const selectedColors = await chrome.storage.local.get("selectedColors")
        .then(r =>
            Array.isArray(r.selectedColors) ?
                r.selectedColors :
                []
        );
    if (selectedColors.length === 0) {
        alert("Please select some colors first by clicking the extension icon.");
        return;
    }

    // Convert hex color string to RGB decimal values
    const hexToRGBDecimal = (hex) => [
        parseInt(hex.substring(1, 3), 16),
        parseInt(hex.substring(3, 5), 16),
        parseInt(hex.substring(5, 7), 16)
    ];

    // Calculate the Euclidean distance between two RGB colors
    const colorDistance = (rgb1, rgb2) => Math.sqrt(
        Math.pow(rgb2[0] - rgb1[0], 2) +
        Math.pow(rgb2[1] - rgb1[1], 2) +
        Math.pow(rgb2[2] - rgb1[2], 2)
    );

    // Create a new EyeDropper object to select a color
    const eyeDropper = new EyeDropper();

    // Use the EyeDropper to select a color and convert it to RGB decimal values
    const rgbHex = await eyeDropper.open().then(colorSelectionResult => colorSelectionResult.sRGBHex)
        .catch(error => { console.log(error); return ""; });
    if (rgbHex === "") return;
    const rgbDec = hexToRGBDecimal(rgbHex);

    // Find the color in the set that is closest to the selected color
    const closestcolor = selectedColors.reduce((pColor, cColor) =>
        colorDistance(pColor.rgb, rgbDec) < colorDistance(cColor.rgb, rgbDec) ? pColor : cColor
    );

    // Display the closest color name in an alert box
    alert(`This is mostly likely ${closestcolor.name}!`);
})();