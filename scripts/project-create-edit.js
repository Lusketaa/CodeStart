//PEGA OS PARÂMETROS DA URL
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// Type: create ou edit
const screenType = params.id ? 'edit' : 'create';

window.onload = function() {
    setScreenTypes();
    fillInputs();
}

function fillInputs() {
    if(screenType === 'edit')
    fetch(`https://645a4ca165bd868e9316e392.mockapi.io/api/projects/${params.id}`)
    .then(response => response.json())
    .then(project => {
       document.querySelector('#title').value = project.title; 
       document.querySelector('#totalCost').value = project.totalCost;
       document.querySelector('#description').value = project.description;
    })
}

function setScreenTypes(){
    // MODO CRIAR
    if(screenType == 'create') {
        document.querySelector('#main-title').innerText = "Vamos cadastrar seu novo projeto";
        document.querySelector('#lf-button').innerText = "Cadastrar";
    }

    // MODO EDITAR
    if(screenType == 'edit') {
        document.querySelector('#main-title').innerText = "Editar projeto";
        document.querySelector('#lf-button').innerText = "Salvar";
    }
}

function createOrEdit() {
             
    //INICIA A MASSA DE DADOS (PAYLOAD)
    let payload = {
        title: document.querySelector("#title").value,
        totalCost: document.querySelector("#totalCost").value,
        description: document.querySelector("#description").value,
        idClient: localStorage.getItem("idClient")
    }

    // ENVIAR PARA A API
    fetch(`https://645a4ca165bd868e9316e392.mockapi.io/api/projects${screenType == 'edit' ? ('/' + params.id) : ''}`, {
        method: screenType === 'edit' ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        if(screenType === 'edit'){
            alert('Editado com sucesso!');
        } else {
            alert('Cadastrado com sucesso!');
        }

        window.location.href = "list.html";
    })
    .catch(error => {
        alert('Erro no servidor!');
        console.log(error);
    })
}