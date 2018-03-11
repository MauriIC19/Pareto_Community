window.addEventListener("load", init, true);

function init(){
	loadProblems();
}

function loadProblems(){
	var load = new XMLHttpRequest();
	load.open('GET', 'php/loadProblems.php');
	load.send();

	load.onreadystatechange = function(){
		if (this.readyState === 4 && this.status === 200) {
		 	console.log(JSON.parse(this.responseText));
		}
	}
}

function createProblems(){
	var nombreProblema = "Problema de prueba estático";
	var autor = "Luis Mauricio";
	var descripcion = "Una descripción estática";
	var factores = getFactors();

	var load = new XMLHttpRequest();
	load.open('POST', 'php/createProblems.php');
	load.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	load.send('nombreProblema='+nombreProblema+'&autor='+autor+'&descripcion='+descripcion+'&factores='+factores);

	load.onreadystatechange = function(){
		if (this.readyState === 4 && this.status === 200) {
			if (this.responseText === '1') {
				console.log('Ok');
			}
			else{
				console.log(this.responseText);
			}
		}
	}
}

function getFactors(){
	var factors = document.querySelectorAll('.factor');
	var factorsArray = Array();

	for(var i = 0; i < factors.length; i++){
		factorsArray.push(factors[i].value);
	}
	return factorsArray.toString();
}

function voteFactors(){
	var votedFactors = document.querySelectorAll('.voted');
	var votedFactorsArray = Array();

	for(var i = 0; i < votedFactors.length; i++){
		votedFactorsArray.push(votedFactors[i].value);
	}

	votedFactorsArray.toString();

	var voteFactors = new XMLHttpRequest();
	voteFactors.open('POST', 'php/voteFactors.php');
	voteFactors.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	voteFactors.send('voteFactors='+votedFactorsArray);

	voteFactors.onreadystatechange = function(){
		if (this.readyState === 4 && this.status === 200) {
			if (this.responseText === '1') {
				console.log('Ok');
				loadProblems();
			}
			else{
				console.log(this.responseText);
			}
		}
	}
}