document.addEventListener("DOMContentLoaded", function() {
    const generateButton = document.getElementById("generate");
    const inputContainer = document.getElementById("input-container");
    const qrCodeCanvas = document.getElementById("qrcode");
    const downloadButton = document.getElementById("download");

    generateButton.addEventListener("click", function() {
        generateQRCode();
    });

    // Detectar la tecla "Enter" en el campo de entrada
    inputContainer.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            generateQRCode();
        }
    });

    function generateQRCode() {
        const inputs = document.querySelectorAll(".qr-input");
        const hasContent = Array.from(inputs).some(input => input.value.trim() !== '');

        if (hasContent) {
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
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Debes introducir un texto o enlace.',
                showConfirmButton: false,
                timer: 1600
              });
        }
    }
});
