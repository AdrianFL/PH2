

function crearObjeto(){
	var xmlhttp;

	if(window.XMLhttpRequest){
		xmlhttp = new XMLHttpRequest();
	}
	else if(window.ActiveXObject){
		xmlhttp = new ActiveXObject("Microsoft.HMLHTTP");
	}
	return xmlhttp;
}


function enviarFormulario(form){
	var formdata = new FormData(form);
	var objetoaj = new crearObjeto();
	var url = "rest/login/";

	objetoaj.onreadystatechange = procesarCambio;
	objetoaj.open("POST", url, true);

	objetoaj.send(formdata);

	function procesarCambio(){

		if(objetoaj.readyState == 4){
			if(objetoaj.status == 200){
				var res = JSON.parse(objetoaj.responseText);
				console.log(res);
				sessionStorage.setItem('logged', 'true');
				sessionStorage.setItem('clave', res.CLAVE);
				sessionStorage.setItem('login', res.LOGIN);
				sessionStorage.setItem('email', res.EMAIL);
				sessionStorage.setItem('nombre', res.NOMBRE);
				sessionStorage.setItem('pwd', document.getElementById("pass").value);

				var aux=res.ultimo_acceso;
				var parts = aux.split(' ');
				var parts2 = parts[0].split('-');
				var parts3 = parts[1].split(':');

				document.getElementById("transparencia").style.display="initial";
				document.getElementById("loginmsg").innerHTML="Bienvenido "+res.LOGIN+". Tu última conexión fue el "+parts2[0]+"/"+parts2[1]+"/"+parts2[2]+" a las "+parts3[0]+":"+parts3[1]+"<br><input type='button' value='Cerrar' onclick='goInicio();'/>";
				document.getElementById("loginmsg").style.display = "initial";
				document.getElementById("logearse").disabled=true;

			}
			else if(objetoaj.status==401){
				block();
				document.getElementById("transparencia").style.display="initial";
				document.getElementById("loginmsg").innerHTML="Los datos no soc correctos.<button onlcick='ocultar(form);'>Cerrar</button>";
				document.getElementById("loginmsg").style.display="initial";
			}
		}

	}

	return false;
}

function ocultar(form){
	document.getElementById("transparencia").style.display="none";
	document.getElementById("loginmsg").style.display="none";
	document.getElementById("login").disabled=false;
	form.reset();
	document.getElementById("login").focus();
	return false;
}

function block(){
	document.getElementById("login").disabled=true;
}

function ToInicio(){

	window.location.replace("index.html");

}