const fileInput = document.getElementById('fileInput');
const designCanvas = document.getElementById('design');
const ctx = designCanvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

// Load uploaded image onto the canvas
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const img = new Image();
        const reader = new FileReader();
        
        reader.onload = function(e) {
            img.src = e.target.result;
        };
        img.onload = function() {
            // Clear previous design
            ctx.clearRect(0, 0, designCanvas.width, designCanvas.height);
            // Draw the uploaded design
            ctx.drawImage(img, 0, 0, designCanvas.width, designCanvas.height);
        };
        reader.readAsDataURL(file);
    }
});

// Download the T-shirt with design
downloadBtn.addEventListener('click', () => {
    const tshirtCanvas = document.createElement('canvas');
    tshirtCanvas.width = 300;
    tshirtCanvas.height = 400;

    const tshirtCtx = tshirtCanvas.getContext('2d');
    const tshirtImage = document.querySelector('#tshirt img');

    tshirtImage.onload = () => {
        tshirtCtx.drawImage(tshirtImage, 0, 0, 300, 400);
        tshirtCtx.drawImage(designCanvas, 80, 100, 140, 140);

        // Trigger download
        const link = document.createElement('a');
        link.download = 'custom_tshirt.png';
        link.href = tshirtCanvas.toDataURL();
        link.click();
    };
    tshirtImage.src = 'blank_tshirt.png'; // Re-load blank T-shirt for merging
});
