const renderRegistro = () => {

    //creo los elementos y los añado al container
    const container = document.getElementById('container');
    container.innerHTML = ''; // limpio el container
    const form = document.createElement('form');//creo el formulario
    form.classList.add('registroLogin-form');
    const titulo = document.createElement('h1');//creo el titulo
    titulo.innerHTML = 'Registro';
    const inputNombre = document.createElement('input');//creo el campo nombre
    inputNombre.type = 'text';
    inputNombre.id = 'name';
    inputNombre.placeholder = 'Nombre';
    const inputPassword = document.createElement('input');//creo el campo contraseña
    inputPassword.type = 'password';
    inputPassword.id = 'password';
    inputPassword.placeholder = 'Contraseña';
    const registroButton = document.createElement('button');//creo el boton para registrarse
    registroButton.type = 'button';
    registroButton.id = 'registro';
    registroButton.innerText = 'Registrarme';
    registroButton.classList.add('registroLoginButton');
    const cambioButton = document.createElement('button');//creo el boton para cambiar a la vista de login
    cambioButton.type = 'button';
    cambioButton.id = 'cambio';
    cambioButton.classList.add('registroLoginButton');
    cambioButton.innerText = 'Ya tengo una cuenta';
    const mensaje = document.createElement('p'); //creo el mensaje al usuario
    mensaje.id = 'mensaje';


    form.appendChild(titulo);
    form.appendChild(inputNombre);
    form.appendChild(inputPassword);
    form.appendChild(registroButton);
    form.appendChild(cambioButton);
    form.appendChild(mensaje);
    container.appendChild(form);

    cambioButton.addEventListener('click', () => {renderLogin();});
    registroButton.addEventListener("click",function(){

    nombre = inputNombre.value;
    password = inputPassword.value;

    const  validarRegistro = (nombre, password) => {
        if (nombre == '') {
            
            mensaje.innerHTML = 'El nombre no puede estar vacio';
            mensaje.style.color = 'red';
            return false;
        }else if(nombre.length < 3){
            mensaje.innerHTML = 'El nombre debe tener al menos 3 caracteres';
            mensaje.style.color = 'red';
            return false;
        }else if(nombre.length > 15){
            mensaje.innerHTML = 'El nombre no puede tener mas de 15 caracteres';
            mensaje.style.color = 'red';
            return false;
        }
    
        if (usuarios.length>1){
            for (const usuario of usuarios) {
                if (usuario.name == nombre) {
                    mensaje.innerHTML = 'El nombre ya esta registrado';
                    mensaje.style.color = 'red';
                    return false;
                }
            }
        }
    
        if (password.length < 6) {
            mensaje.innerHTML = 'La contraseña debe tener al menos 6 caracteres';
            mensaje.style.color = 'red';
            return false;
        }
        return true;
    
    }

    
    if(validarRegistro(nombre, password)){
        usuarios.push({
            name: nombre,
            password: password,
            saldo: 1000,
        });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        mensaje.innerHTML = `${ nombre } se ha registrado con exito`;
        mensaje.style.color = "green";
    }
    
});
}

const renderLogin = () => {
    const container = document.getElementById('container');
    container.innerHTML = '';
    const form = document.createElement('form');
    form.classList.add('registroLogin-form');
    const titulo = document.createElement('h1');
    titulo.innerHTML = 'Login';
    const inputNombre = document.createElement('input');
    inputNombre.type = 'text';
    inputNombre.id = 'name';
    inputNombre.placeholder = 'Nombre';
    const inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.id = 'password';
    inputPassword.placeholder = 'Contraseña';
    const inicioButton = document.createElement('button');
    inicioButton.type = 'button';
    inicioButton.id = 'inicio';
    inicioButton.classList.add('registroLoginButton');
    inicioButton.innerHTML = 'Iniciar Sesion';
    const cambioButton = document.createElement('button');
    cambioButton.type = 'button';
    cambioButton.id = 'cambio';
    cambioButton.classList.add('registroLoginButton');
    cambioButton.innerText = 'No tengo una cuenta';
    const mensaje = document.createElement('p');
    mensaje.id = 'mensaje';

    form.appendChild(titulo);
    form.appendChild(inputNombre);
    form.appendChild(inputPassword);
    form.appendChild(inicioButton);
    form.appendChild(cambioButton)
    form.appendChild(mensaje);
    container.appendChild(form);

    cambioButton.addEventListener('click', () => {renderRegistro();});
    inicioButton.addEventListener('click', () => {
        for(const usuario of usuarios){
            if(usuario.name == inputNombre.value && usuario.password == inputPassword.value){
                console.log("Logueado con exito");
                usuariosLogueados = usuario;
                const index = usuarios.indexOf(usuario);
                usuarios.splice(index, 1);
                localStorage.setItem("usuariosLogueados", JSON.stringify(usuariosLogueados));
                window.location.replace('./blackjack.html');
            }

        }
        
    });
}

let usuarios = [];
let usuariosLogueados = "";
localStorage.removeItem('usuariosLogueados');
const mensaje = document.getElementById('mensaje');
const usuariosEnLS = localStorage.getItem('usuarios');



if (usuariosEnLS) {
    usuarios = JSON.parse(usuariosEnLS);
}
renderRegistro();



