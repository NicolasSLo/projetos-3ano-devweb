class Produto {
    constructor(){
        this.id = 1
        this.vetProdutos = []
        this.editId = null
    }

    salvar(){
       let produto = this.lerDados()
        
       if(this.validarCampo(produto)){
           if(this.editId == null){
               this.adicionar(produto)
           } else {
               this.atualizar(this.editId, produto)
           }
            
       }
       
       this.listaTabela()
       this.limparCampo()
       document.getElementById('botao').value = 'Salvar'
       this.editId = null
    }

    limparCampo(){
        document.getElementById('produto').value=''
        document.getElementById('qtdproduto').value=''
        document.getElementById('valor').value=''
    }

    listaTabela(){
        let tbody = document.getElementById('tbody')
        tbody.innerText = ''

        for (let i=0; i < this.vetProdutos.length; i++){
            let tr = tbody.insertRow()

            let td_id = tr.insertCell()
            let td_produto = tr.insertCell()
            let td_valor = tr.insertCell()
            let td_qtd = tr.insertCell()
            let td_acao = tr.insertCell()

            td_id.innerText = this.vetProdutos[i].id
            td_produto.innerText = this.vetProdutos[i].nomeProduto
            td_valor.innerText = this.vetProdutos[i].valor
            td_qtd.innerText = this.vetProdutos[i].qtdproduto

            let imgEdit = document.createElement('img')
            imgEdit.src = 'imagens/edit.png'
            td_acao.appendChild(imgEdit)
            imgEdit.setAttribute("onclick","produto.Edicao("+ JSON.stringify(this.vetProdutos[i]) +")")

            let imgDelete = document.createElement('img')
            imgDelete.src = 'imagens/delete.png'
            td_acao.appendChild(imgDelete)
            imgDelete.setAttribute("onclick","produto.deletar("+this.vetProdutos[i].id+")")

            


        }
    }

    adicionar(produto){
        this.vetProdutos.push(produto)
        this.id++
    }

    atualizar(id, produto){
        for (let i = 0; i < this.vetProdutos.length; i++){
            if(this.vetProdutos[i].id == id){
                this.vetProdutos[i].nomeProduto = produto.nomeProduto
                this.vetProdutos[i].qtdproduto = produto.qtdproduto
                this.vetProdutos[i].valor = produto.valor
            }
        }
    }

    Edicao(dados){
        this.editId = dados.id

        document.getElementById('produto').value = dados.nomeProduto
        document.getElementById('valor').value = dados.valor
        document.getElementById('qtdproduto').value = dados.qtdproduto

        document.getElementById('botao').value = 'Atualizar'
    }
    
    lerDados(){
        let produto = {}

        produto.id = this.id
        produto.nomeProduto = document.getElementById('produto').value
        produto.qtdproduto = document.getElementById('qtdproduto').value
        produto.valor = document.getElementById('valor').value

        return produto
    }

    validarCampo(produto) {
        let msg = '';

        if(produto.nomeProduto == ''){
            msg += 'Informe o nome do produto! \n'
        }

        if(produto.qtdproduto == ''){
            msg += 'Informe a quantidade do produto! \n'
        }

        if(produto.valor == ''){
            msg += 'Informe o valor do produto! \n'
        }

        if (msg != ''){
            alert(msg)
            return false
        }

        return true
    }

    
   

    deletar(id){

            if(confirm('Realmente quer deletar o produto ID: ' +id) == true){
            let tbody = document.getElementById('tbody')

            for (let i = 0; i < this.vetProdutos.length; i++){
                if(this.vetProdutos[i].id == id){
                    this.vetProdutos.splice(i, 1)
                    tbody.deleteRow(i)
                }
            }
        }
    }
}


var produto = new Produto()