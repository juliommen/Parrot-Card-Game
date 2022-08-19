let prato;
let preco_prato;
let bebida;
let preco_bebida;
let sobremesa;
let preco_sobremesa;
let total;
let ativos=0;

function addOnClickListener(){
    const itens = document.getElementsByClassName("item");
    for (let i = 0; i < itens.length; i++) {
        itens[i].addEventListener("click", function() {
            let classes = this.classList;
            let itens_filtrados;
            if (classes.contains("p")){
                ativos++;
                prato=this.querySelector("h1").innerText;
                preco_prato=this.querySelector("p").innerText.split("R$")[1].replace(",",".");
                itens_filtrados = document.getElementsByClassName("p");
                for (let j = 0; j < itens_filtrados.length; j++) {
                    itens_filtrados[j].classList.remove("ativo");   
                }
            } else if (classes.contains("b")) {
                ativos++;
                bebida=this.querySelector("h1").innerText;
                preco_bebida=this.querySelector("p").innerText.split("R$")[1].replace(",",".");
                itens_filtrados = document.getElementsByClassName("b");
                for (let j = 0; j < itens_filtrados.length; j++) {
                    itens_filtrados[j].classList.remove("ativo");   
                }
            } else {
                ativos++;
                sobremesa=this.querySelector("h1").innerText;
                preco_sobremesa=this.querySelector("p").innerText.split("R$")[1].replace(",",".");
                itens_filtrados = document.getElementsByClassName("s");
                for (let j = 0; j < itens_filtrados.length; j++) {
                    itens_filtrados[j].classList.remove("ativo");   
                }
            }
            classes.add("ativo");
            if (ativos >=3) {
                const fechamento = document.querySelector(".fechamento");
                fechamento.classList.add("finalizar");
                fechamento.innerHTML = "Fechar pedido";
                total = ("R$ "+(Number(preco_bebida)+Number(preco_prato)+Number(preco_sobremesa)).toFixed(2)).replace(".",",");
            }
        });
        
    }
}


function cancelar(){
    document.querySelector(".master-revisao").style.display="none";
}

function revisarPedido(){
    document.getElementById("bebida").innerText = bebida;
    document.getElementById("preco_bebida").innerText = preco_bebida.replace(".",",");
    document.getElementById("prato").innerText = prato;
    document.getElementById("preco_prato").innerText = preco_prato.replace(".",",");
    document.getElementById("sobremesa").innerText = sobremesa;
    document.getElementById("preco_sobremesa").innerText = preco_sobremesa.replace(".",",");
    document.getElementById("preco_total").innerText = total;
    document.querySelector(".master-revisao").style.display="flex";
}

function finalizarPedido(){
    if (ativos >= 3){
        let url = "https://wa.me/5567999961300?text=";
        let msg = `Olá, gostaria de fazer o pedido:\n- Prato: ${prato}\n- Bebida: ${bebida}\n- Sobremesa: ${sobremesa}\nTotal: ${total}`
        
        nome = prompt("Qual o seu nome?");
        endereço = prompt("Enviar o pedido para qual endereço?");

        msg +=`\n\nNome: ${nome}\nEndereço: ${endereço}`;
        let msg_encoded = encodeURIComponent(msg);
        url+=msg_encoded;
        window.open(url);
    }
}