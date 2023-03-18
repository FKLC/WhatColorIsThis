// Define a very basic set of colors
const colors = {
    white: [255, 255, 255],
    silver: [192, 192, 192],
    gray: [128, 128, 128],
    black: [0, 0, 0],
    red: [255, 0, 0],
    maroon: [128, 0, 0],
    yellow: [255, 255, 0],
    olive: [128, 128, 0],
    lime: [0, 255, 0],
    green: [0, 128, 0],
    cyan: [0, 255, 255],
    teal: [0, 128, 128],
    blue: [0, 0, 255],
    navy: [0, 0, 128],
    fuchsia: [255, 0, 255],
    purple: [128, 0, 128],
};

// Save selected colors to local extension storage
function save_options() {
    chrome.storage.local.set({
        selectedColors: [...document.getElementById('colors').selectedOptions]
            .map(o => { return { name: o.value, rgb: colors[o.value] } })
    });
}

// Add colors to the select. Load selected colors and mark them as selected
async function restore_options() {
    const colorsDOM = document.getElementById('colors');
    const selectedColors = await chrome.storage.local.get("selectedColors")
        .then(r =>
            Array.isArray(r.selectedColors) ?
                r.selectedColors.map(c => c.name) :
                []
        );

    for (const color in colors) {
        const option = document.createElement("option");
        option.innerHTML = color;
        option.value = color;
        option.selected = selectedColors.includes(color);
        colorsDOM.appendChild(option);
    }
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);