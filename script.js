document.addEventListener("DOMContentLoaded", function() {
    const generateButton = document.getElementById("generate");
    const inputContainer = document.getElementById("input-container");
    const qrCodeCanvas = document.getElementById("qrcode");
    const downloadButton = document.getElementById("download");

    generateButton.addEventListener("click", function() {
        const inputs = document.querySelectorAll(".qr-input");
        const data = Array.from(inputs)
            .map(input => input.value)
            .join(';');

        const qr = new QRious({
            element: qrCodeCanvas,
            value: data,
            size: 200
        });

        // Habilitar el botón de descarga
        downloadButton.style.display = "block";
        downloadButton.addEventListener("click", function() {
            const qrDataURL = qr.toDataURL();
            const link = document.createElement("a");
            link.href = qrDataURL;
            link.download = "codigo-qr.png";
            link.click();
        });
    });
});
