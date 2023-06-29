function checkIfRoleIsChecked() {
    let list = document.getElementsByName("role");
    let counter = 0;

    for(let radioButton of list){
        if(radioButton.checked === false){
            counter++;
        }
    }

    return counter !== list.length

}

//SE ENTROU NA FUNÇÃO É PORQUE O FORMS ESTÁ VÁLIDO
function cadastrar() {
    //VERIFICA SE ALGUMA ROLE FOI CHECADA
    if(checkIfRoleIsChecked() === false) {
        Swal.fire (
            'Algo deu errado!',
            'Marque algum dos perfis!',
            'error'
        ) 
        return;
    }        
        
    //INICIA A MASSA DE DADOS (PAYLOAD)
    let payload = {
        role: document.getElementsByName("role")[0].checked == true ? 'dev' : 'cliente',
        fullName: document.querySelector("#fullName").value,
        birthdate: document.querySelector("#birthdate").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    }

    // ENVIAR PARA A API
    fetch("https://645a4ca165bd868e9316e392.mockapi.io/api/users", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        Swal.fire ({
        title: 'Bom Trabalho!',
        text: 'Cadastrado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok!',
        confirmButtonColor: '#0041be'
        }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem("userName", response.fullName);
            localStorage.setItem("role", response.role === "dev" ? "Desenvolvedor" : "Cliente");
            localStorage.setItem("idClient", response.id);

            window.location.href = "list.html";
        }
        })       
    })
}