//chama a função start para rodar durante o load
window.addEventListener("load", start);
//definição das variaveis globais 
var dietas = [];
var inputName = null;
var isEditing = false;
var currentIndex = null;
var inputpeso = null;
var imcr = null
var stop = 0;
//função chamada para rodar assim que a tela carregar
function start() {
  //atualiza o valor da inputName
  inputName = document.querySelector("#inputName");
  inputpeso = document.querySelector("#peso");
  input_altura = document.querySelector("#altura");
  imcr = document.querySelector("#imc");
  //identifica é altera o comportamento padrão do forms
  preventFormSubmit();
  //identifica o input 
  activateInput();
  render();
  //console.log(parseInt(input_altura.value))

}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    //preventDefault retira o comportamento padrão do elemento
    event.preventDefault();
  }
  var form = document.querySelector("form");
  //chama a função handleFormSubmit quando o forms fizer um submit
  form.addEventListener("submit", handleFormSubmit);
}

function activateInput() {
  function insertName(newName) {
    //adiciona o nome dentro da array dietas
    dietas.push(newName);
    render();
  }
  //atualiza algum nome dentro do array dependendo da sua posição
  function updateName(newName) {
    dietas[currentIndex] = newName;
    render();
  }
  //valida se o evento do teclado e a tecla enter e se o valor do input não esta vazio
  function handleTyping(event) {
    // console.log(event)
    if (event.key === "Enter") {
      if(event.key === "Enter" && event.target.id == 'peso'){
        if (inputpeso.value != 0 && event.target.id == "peso" && input_altura.value != 0 && event.target.id == 'peso' ) {

          imc(inputpeso.value, input_altura.value);
  
        }else {
          alert('burt')
        }
      }
      //caso isEditing estiver "true" ira chamar a função updateName
      if (isEditing && event.target.id == "inputName" && inputName.value != ' ') {
        updateName(event.target.value);
        imcr.innerHTML = "";
      } else if (event.target.id == "inputName" && inputName.value != ' ') {
        insertName(event.target.value);
        imcr.innerHTML = "";

      }
      

      //retorna isEditing para false
      isEditing = false;
      //limpa o input
      clearInput();
    }
  }
  //coloca o foco no input
  inputName.focus();
  inputpeso.addEventListener("keyup", handleTyping);
  inputName.addEventListener("keyup", handleTyping);

}

function render() {
  //cria o botão deleltar
  function createDeleteButton(index) {
    //deleta o elemento selecionado a partir do index
    function deleteName() {
      dietas.splice(index, 1);
      render();
    }
    //usando o createElement para criar qualquer elemento html
    var button = document.createElement("button");
    button.classList.add("deleteButton");
    button.textContent = "x";
    //sempre o button for clicado a função deleteName vai ser chamada
    button.addEventListener("click", deleteName);
    return button;
  }
  function createSpan(currentName, index) {

    function editItem() {
      //atualizar o valor que esta no input para o valor selecionado
      inputName.value = currentName;
      //foca no input
      inputName.focus();
      //trasporta isEditing em "true"
      isEditing = true;
      //define a posição do elemento a ser editado
      currentIndex = index;
    }
    var span = document.createElement("span");
    //estilização do span
    td.classList.add("clickable"); //muda pointe
    //indica que o valor a ser spamar e o currentName
    span.textContent = currentName;
    //quando o span receber um clique chama a editIten
    td.addEventListener("click", editItem);

    return span;
  }
  //identifica o div names 
  var divNames = document.querySelector("#names");
  divNames.innerHTML = ""; //não repetir o conteuro

  //criar ul
  //fazer n li´s conforme tamanho do vetor
  var tr = document.createElement("tr");


  divNames.innerHTML += `
  <tr>
  <td>
      Segunda-feira
  </td>
  <td>
      Terça-feira
  </td>
  <td>
      Quarta-feira
  </td>
  <td>
      Quinta-Feira
  </td>
  <td>
      Sexta-feira
  </td>
  <td>
      Sabado
  </td>
  <td>
      Domingo
  </td>
</tr>
  `
  divNames.appendChild(tr);

  //laço for para criar a tabela com os nomes
  for (var i = 0; i < dietas.length; i++) {
    var currentName = dietas[i];
    var td = document.createElement("td");
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);
    td.appendChild(button);
    td.appendChild(span);


    // td.textContent=currentName;
    if (i < 7) {
      tr.appendChild(td);
    } else {
      if (i == 34) {
        inputName.style.visibility = "hidden";
      }

      if (i % 7 == 0) {
        var tr = document.createElement("tr");




      }

      tr.appendChild(td);
      divNames.appendChild(tr)


    }

  }


  clearInput();
}
//tdmpa e chama o foco para o input
function clearInput() {
  inputName.value = " ";
  input_altura.value = " ";
  inputpeso.value = " ";
  inputName.focus();
}

function imc(peso, altura) {
  console.log(peso, altura)
  var calculo = (peso / (altura * altura));
  var result = Intl.NumberFormat('pt-br', { minimumFractionDigits: 2 }).format(calculo);
  console.log(result)
  if (calculo < 18.5) {
    imcr.innerHTML = "Seu IMC é " + result + "<br>Classificação: Magreza";
    imcr.style.backgroundColor = "rgba(155,218,235,255)";
  } else if (calculo > 18.5 && calculo <= 24.9) {
    imcr.innerHTML = "Seu IMC é " + result + "<br>Classificação: Saudavel";
    imcr.style.backgroundColor = "rgba(68,209,133,255)";
  } else if (calculo > 24.9 && calculo <= 29.9) {
    imcr.innerHTML = "Seu IMC é " + result + "<br>Classificação: Sobrepeso";
    imcr.style.backgroundColor = "rgba(250,218,143,255)";
  } else if (calculo > 29.9 && calculo <= 34.9) {
    imcr.innerHTML = "Seu IMC é " + result + "<br>Classificação: Obesidade Grau I";
    imcr.style.backgroundColor = "rgba(239,166,62,255)";
  } else if (calculo > 34.9 && calculo <= 39.9) {
    imcr.innerHTML = "Seu IMC é " + result + "<br>Classificação: Obesidade Severa Grau II";
    imcr.style.backgroundColor = "rgba(246,100,100,255)";
  } else {
    imcr.innerHTML = "Seu IMC é " + result + "<br>Classificação: Obesidade Mórbita Grau III";
    imcr.style.backgroundColor = "rgba(218,100,246,255)";

  }
  console.log(imcr.value)
  clearInput();
}