window.addEventListener("load", init, true);

function init(){
	loadProblems();
}

function loadProblems(){
	load = new XMLHttpRequest();
	load.open('GET', 'php/loadProblems.php');
	load.send();

	load.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
		 	console.log(JSON.parse(this.responseText));
		}
	}
}

function loadFactors(id){
	load = new XMLHttpRequest();
	load.open('GET', 'php/loadFactors.php?id='+id);
	load.send();

	load.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			console.log(JSON.parse(this.responseText));
		}
	}
}

function createProblems(){
	nombreProblema = "Problema de prueba estático";
	autor = "Luis Mauricio";
	descripcion = "Una descripción estática";
	factores = getFactors();

	load = new XMLHttpRequest();
	load.open('POST', 'php/createProblems.php');
	load.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	load.send('nombreProblema='+nombreProblema+'&autor='+autor+'&descripcion='+descripcion+'&factores='+factores);

	load.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			if (this.responseText == '1') {
				console.log('Ok');
			}
			else{
				console.log(this.responseText);
			}
		}
	}
}

function getFactors(){
	factors = document.querySelectorAll('.factor');
	factorsArray = new Array();

	for(i = 0; i < factors.length; i++){
		factorsArray.push(factors[i].value);
	}

	return factorsArray.toString();
}