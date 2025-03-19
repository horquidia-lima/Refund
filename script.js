//Seleciona os elementos do form
const amount = document.getElementById("amount")

amount.oninput = () => {
    //Obtem o valor atual do input e remove os caracteres nao numericos
    let value = amount.value.replace(/\D/g, "")

    //Transformar o valor em centavos
    value = Number(value) / 100
    
    //Atualiza o valor do input
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value){
    //Formata o valor no padrao BRL
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    return value
}