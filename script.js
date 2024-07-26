document.getElementById('qr-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const text = document.getElementById('text').value;
    const color = document.getElementById('color').value;
    const background = document.getElementById('background').value;
    const size = document.getElementById('size').value;

    fetch('/generate_qr', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text, color: color, background: background, size: size, format: 'png' })
    })
    .then(response => response.blob())
    .then(blob => {
        const url = URL.createObjectURL(blob);
        const qrCodeImg = document.getElementById('qr-code');
        qrCodeImg.src = url;
        document.getElementById('qr-result').style.display = 'block';

        // Set download links
        const downloadPngButton = document.getElementById('download-png');
        downloadPngButton.href = url;
        downloadPngButton.download = 'qrcode.png';
    })
    .catch(error => console.error('Error:', error));

    fetch('/generate_qr', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text, color: color, background: background, size: size, format: 'svg' })
    })
    .then(response => response.blob())
    .then(blob => {
        const url = URL.createObjectURL(blob);
        // Set download link for SVG
        const downloadSvgButton = document.getElementById('download-svg');
        downloadSvgButton.href = url;
        downloadSvgButton.download = 'qrcode.svg';
    })
    .catch(error => console.error('Error:', error));
});
