document.addEventListener("DOMContentLoaded", function () {
    const textareas = document.querySelectorAll(".text-area");

    textareas.forEach(textarea => {
        textarea.addEventListener("input", function () {
            this.style.height = "auto"; // Reseta a altura antes de calcular o novo tamanho
            this.style.height = this.scrollHeight + "px"; // Define a nova altura
        });
    });
});


function imprimirFormulario() {
    const nomeElemento = document.getElementById("nome");
    if (!nomeElemento) {
        alert("Campo nome não encontrado!");
        return;
    }

    const nomeCampo = nomeElemento.value.trim();
    const nomeLimpo = nomeCampo.replace(/[\\/:*?"<>|]/g, '').substring(0, 15);

    // Substituir os textareas por divs
    const textareas = document.querySelectorAll(".text-area");
    const divs = [];
    textareas.forEach(textarea => {
        const div = document.createElement("div");
        div.textContent = textarea.value;
        div.style.cssText = `
            min-height: ${textarea.scrollHeight}px;
            width: ${textarea.offsetWidth}px;
            border: 1px solid #ccc;
            padding: 5px;
            white-space: pre-wrap;
            overflow-wrap: break-word;
            text-align: justify;
            font-size: 2rem;
            margin-bottom: 10px;
        `;
        textarea.parentNode.replaceChild(div, textarea);
        divs.push({ div, textarea });
    });

    // Captura o conteúdo que você quer imprimir
    const contentToPrint = document.getElementById("contact");
    if (!contentToPrint) {
        alert("Seção #contact não encontrada!");
        return;
    }

    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
        <html>
            <head>
                <title>${nomeLimpo || "Sem_Nome"} - Anamnese Financeira</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        background: white;
                        color: black;
                    }
                    // div {
                    //     font-size: 3rem;
                    //     text-align: justify;
                    // }
                </style>
            </head>
            <body>
                ${contentToPrint.innerHTML}
            </body>
        </html>
    `);
    printWindow.document.close();

    // Espera a janela carregar antes de imprimir
    printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();

        // Restaura os textareas
        divs.forEach(({ div, textarea }) => {
            div.parentNode.replaceChild(textarea, div);
        });
    };
}

//--------------------------------------------------------

    document.getElementById("botao-chamada").addEventListener("click", function () {
        const section = document.getElementById("contact");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    });