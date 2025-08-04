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

    // Clona a seção do formulário
    const originalContact = document.getElementById("contact");
    const clone = originalContact.cloneNode(true);

    // Substitui textareas por divs no clone
    const textareas = clone.querySelectorAll(".text-area");
    textareas.forEach(textarea => {
        const div = document.createElement("div");
        div.className = "text-area-replacement";
        div.textContent = textarea.value;
        div.style.cssText = `
            border: 1px solid #ccc;
            padding: 10px;
            margin-bottom: 10px;
            font-size: 2rem;
            text-align: justify;
            white-space: pre-wrap;
        `;
        textarea.parentNode.replaceChild(div, textarea);
    });

    // Cria um contêiner isolado para impressão
    const printArea = document.createElement("div");
    printArea.id = "area-impressao";
    printArea.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: white;
        padding: 20px;
        z-index: 9999;
    `;
    printArea.appendChild(clone);
    document.body.appendChild(printArea);

    // Oculta todo o resto da página com estilo temporário
    const style = document.createElement("style");
    style.innerHTML = `
        @media print {
            body * {
                visibility: hidden !important;
            }
            #area-impressao, #area-impressao * {
                visibility: visible !important;
            }
            #area-impressao {
                position: absolute;
                top: 0;
                left: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.title = `${nomeLimpo || "Sem_Nome"} - Anamnese Financeira`;
    window.print();

    // Remove elementos temporários após impressão
    setTimeout(() => {
        document.body.removeChild(printArea);
        document.head.removeChild(style);
        document.title = "Lorran - Consultoria Financeira";
    }, 1000);
}
//--------------------------------------------------------

    document.getElementById("botao-chamada").addEventListener("click", function () {
        const section = document.getElementById("contact");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    });