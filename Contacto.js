$("#formulario").on("submit", guardarEmail);

let id = 1;

class Email {
    constructor(email, consulta) {
        this.id = id;
        this.email = email;
        this.consulta = consulta;
        id = id + 1;
    }
    notificar() {
        Swal.fire({
            title: 'Mensaje confirmado!',
            text: 'Te contactaremos a: ' + this.email + ' a la brevedad',
            focusConfirm: false,
        })
    }
}

// Función formulario
function guardarEmail(e) {
    e.preventDefault()
    const emailIngresado = document.getElementById("exampleInputEmail1");
    const consultaIngresada = document.getElementById("exampleInputPassword1");

    const email = new Email(emailIngresado.value, consultaIngresada.value);

    let local = JSON.parse(localStorage.getItem("Emails"))

    if (!local) {
        let consulta = []
        consulta.push(email);
        localStorage.setItem("Emails", JSON.stringify(consulta));
    }

    else{
        let local = JSON.parse(localStorage.getItem("Emails"))
        local.push(email);
        localStorage.setItem("Emails", JSON.stringify(local));
    }
    email.notificar()
}