
function crearObjeto(){
	var xmlhttp;
	if(window.XMLHttpRequest){
		xmlhttp=new XMLHttpRequest;
	}
	else if(window.ActiveXObject){
		xmlhttp = new ActiveObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
}


function registrarse(form){
	var formdata = new FormData();
	var objetoaj = new crearObjeto();
	var url = "http://localhost/practica2/rest/usuario/";
	objetoaj.open("POST", url, true);

	document.getElementById("prueba").innerHTML="ENTRO EN LA FUNCION"

	formdata.append("pwd", form.pwd.value);
	formdata.append("pwd2", form.pwd2.value;
	formdata.append("login", form.login.value);
	formdata.append("email", form.mail.value);
	formdata.append("nombre", form.nombre.value);
	objetoaj.send(formdata);

	objetoaj.onload = function(){
		var res = JSON.parse(objetoaj.responseText);

		if(res.CODIGO == 400){
			let capa_fondo = document.createElement('div');
			let capa_frente = document.createElement('article');
			let texto = 'Error. El Nick no es válido.';
			let html = '';

			capa_fondo.appendChild(capa_frente);
			html+='<h2>MENSAJE EMERGENTE</h2>';
			html+='<p>'+texto+'</p>';
			html+='<button onclick="mensajelogin(this);">Cerrar</button>';
			capa_frente.innerHTML=html;

			capa_fondo.classList.add('capa-fondo');
			capa_frente.classList.add('capa-frente');

			document.body.appendChild(capa_fondo);
		}
		else if(res.CODIGO == 401){

			let capa_fondo = document.createElement('div');
			let capa_frente = document.createElement('article');
			let texto = 'Error. Las contraseñas no coinciden.';
			let html = '';

			capa_fondo.appendChild(capa_frente);
			html+='<h2>MENSAJE EMERGENTE</h2>';
			html+='<p>'+texto+'</p>';
			html+='<button onclick="mensajepwd(this);">Cerrar</button>';
			capa_frente.innerHTML=html;

			capa_fondo.classList.add('capa-fondo');
			capa_frente.classList.add('capa-frente');

			document.body.appendChild(capa_fondo);
		}
		else if(res.CODIGO == 500){

			let capa_fondo = document.createElement('div');
			let capa_frente = document.createElement('article');
			let texto = 'Error. No se ha podido hacer el registro.';
			let html = '';

			capa_fondo.appendChild(capa_frente);
			html+='<h2>MENSAJE EMERGENTE</h2>';
			html+='<p>'+texto+'</p>';
			html+='<button onclick="mensajepwd(this);">Cerrar</button>';
			capa_frente.innerHTML=html;

			capa_fondo.classList.add('capa-fondo');
			capa_frente.classList.add('capa-frente');

			document.body.appendChild(capa_fondo);
		}
		else{

			let capa_fondo = document.createElement('div');
			let capa_frente = document.createElement('article');
			let texto = 'Te has registrado correctamente.';
			let html = '';

			capa_fondo.appendChild(capa_frente);
			html+='<h2>MENSAJE EMERGENTE</h2>';
			html+='<p>'+texto+'</p>';
			html+='<button onclick="GoLogin();">Cerrar</button>';
			capa_frente.innerHTML=html;

			capa_fondo.classList.add('capa-fondo');
			capa_frente.classList.add('capa-frente');

			document.body.appendChild(capa_fondo);

				}
			
}
		return false;

	};
	return false;

}

function GoLogin(){
	window.location.replace("login.html");
}

function mensajelogin(t)
{
	t.parentNode.parentNode.remove();
	document.getElementById("login").focus();
	return false;
}


function mensajepwd(t)
{
	t.parentNode.parentNode.remove();
	document.getElementById("pass").focus();
	return false;
}
