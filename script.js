//Seleciona os elementos do form
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

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
//Captura o evento de submit do form para obter os valores

form.onsubmit = (event) => {
    event.preventDefault()

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    //Chama a funcao que irá add o item na lista
    expenseAdd(newExpense)
}

function expenseAdd(newExpense){
    try {
        //Cria o elemento para add na lista
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        //Cria o icone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        //Cria a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        //Cria nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //Cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        //Add name e category na div das infos da despesas
        expenseInfo.append(expenseName, expenseCategory)

        //Cria valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        //Cria o icone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")

        //Add as infos no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
        //Add o item na lista
        expenseList.append(expenseItem)

        //Atualiza o tatal
        updateTotals()
        
    } catch (error) {
        alert("Nao foi possivel atualizar a lista de despesas")
        console.log(error)
    }
}

//Atualiza os totais
function updateTotals(){
    try {
        //Recupera todos os itens(li) da lista(ul)
        const items = expenseList.children

        //Atualiza a qtd de itens da lista
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

        //Variavel para incrementar o total

        let total = 0
        for(let item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector(".expense-amount")

            //Remover caracteres nao numericos
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

            //Converter o valor para float
            value = parseFloat(value)

            //Verifica se é um numero válido
            if(isNaN(value)){
                return alert(
                    "Nao foi possivel calcular o total. O valor nao parecer ser um número."
                )
            }

            //Incrementar o valor total
            total += Number(value)
        }

        //Cria a span para add o R$ formatado
        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"

        //Formata o valor e remove o R$ que será exibido pela small com um estilo customizado
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

        //Limpa o conteúdo do elemento
        expensesTotal.innerHTML = ""

        expensesTotal.append(symbolBRL, total)

    } catch (error) {
        alert("Nao foi possivel atualizar os totais")
        console.log(error)
    }
}