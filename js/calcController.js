class CalcController { //criando uma classe

	constructor () {

		this._operation = [];
		this._locale = "pt-Br";
		this._displayCalcEl = document.querySelector("#display");
		this._dateEl = document.querySelector("#data");
		this._timeEl = document.querySelector("#hora");
		 // anderline no JS significa que o atributos é privado
		this._currentDate;
		this.initialize(); //função que chama o que deve iniciar junto com a página 
		this.initButtonsEvents(); //chamando eventos
	}

	initialize() { //o que deve ser iniciado quando intanciarmos está classe
		//setTimeOut(()=>{}, time); função que gera apena uma vez após o tempo determinado
		
		this.setDisplayDateTime();	//para a calculadora não ficar 1 segundo sem a informações do tempo, chamamos a função antes do setInterval	
	
		setInterval (()=>{ //setInterval demora um segundo +/- para iniciar o método e acionar ao display
	
			this.setDisplayDateTime();
				
		}, 1000);
	}

//methods

setDisplayDateTime() {
	//Observe que para chamar os métodos, colocamos o this também.

			//vamos colocar os valores de hoje no display
			this.displayDate = this.currentDate.toLocaleDateString(this._locale,{ 
				day: "2-digit",
				month: "short",
				year: "numeric"
			});
			this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
	
}	


//dando vida aos botões --------------------------------------------


clearAll(){

	this._operation = []; //limpando array
}

clearEntry(){ //apagando o ultimo valor digitado pelo usuário
	this._operation.pop(); // apaga o último valor do Array
}

getLastOperation () { //verificando o ulitmo botão clicado

	return this._operation[this._operation.length-1];
}

setLastOperation (value) { //alterando o úlitmo valor da Array ._operation

	this._operation[this._operation.length-1] = value;

}

isOperator(value){
    //verificando se o value está nesta Array. Caso não esteja, ele retorna -1
	return (["+", "-","*","%","/"].indexOf(value) > -1); //aqui retornamo um boolean
	

}

addOperation(value){
//nós precisamos validar qual foi o botão digitado. Dependendo de qual foi, podemos ter que concaternar o valor clicado neste momento 
//com o último valor add a Array

	if (isNaN(this.getLastOperation())){  //observe que vamos avaliar o último valor adicionado a Array e não o valor clicado neste momento
		
		if (this.isOperator(value)) { // verificando se o último valor digitado é um sinal, caso for, precisamos trocar pelo novo sinal
				
			this.setLastOperation(value); //se for true, substitua o sinal clicado
		
		} else if (isNaN(value)) {

			console.log("outracoisa" + value);


		} else {

			this._operation.push(value);

		}
		
	} else {

		let newValue = this.getLastOperation().toString() + value.toString();
		//this._operation.push(newValue); //o push adicionando o value ao final do Array
		this.setLastOperation(parseInt(newValue)); //alterando o valor como Interger
	}

		console.log(this._operation);

}
setError(){ //mensagem de erro na tela
	 this.displayCalc = "Error";
}


execBtn (value){

	//vamos usar a estrutura de condição switch para aplicarmos as operações de acordo com o que o usuário clicar 

	switch (value) {

		case "ac":

			this.clearAll();

		break;

		case "ce":

			this.clearEntry();
			
		break;

		case "soma":
			this.addOperation("+");

		break;

		case "subtracao":

			this.addOperation("-");
		break;

		case "divisao":
			this.addOperation("/");

		break;

		case "multiplicacao":
			this.addOperation("*");

		break;

		case "porcento":

		this.addOperation("%");


		break;

		case "igual":


		break;

		case "ponto":

			this.addOperation(".");
		break;


			// para o número, nós não daremos break por digito
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			this.addOperation(parseInt(value));
			break;

		default:
			this.setError();
		break;
	}

}


					//eventos para os botões serem acionados 

addEventListenerAll (elementClicked, events, funcao){ //observe os três parametros (elemento HTML que foi clicado, string'll become a Array, function )

	events.split(" ").forEach(event =>{ //getting all events (plural) and spliting them and making a forEach in each event (singular).

		elementClicked.addEventListener(event, funcao, false); // para o elemento clicado, execute
	})                                                 //como se trata de um botão que tem um texto (ou seja, dois elementos HTML)
													   //é bom necessário cancelar o evento, com o parametro false, para ele não executar duas vezes
}

initButtonsEvents() {
	//bom lembra que tanto os botões quanto seus respectivos textos tem a mesma classe
		let buttons = document.querySelectorAll("#buttons > g, #parts > g"); //pegando os dois elementos HTML

		buttons.forEach((btn, index)=>{

			this.addEventListenerAll (btn, "click drag", e => { //addEventListenerAll é um método criado, não nativo

				let textBtn = btn.className.baseVal.replace("btn-",""); //.

				this.execBtn(textBtn);
				
			});

			this.addEventListenerAll(btn, "mouseover mouseup mousedown", e =>{ //pegando as movimentações do mouse

				btn.style.cursor = "pointer"; //trocando a setinha do mause pela mão

			})

		});
	}



//time----------------------------

	get displayTime(){
		return this._timeEl.innerHTML;
	}

	set displayTime(value){
		this._timeEl.innerHTML = value;
	}



//date-----------------------------
	get currentDate(){

		return new Date; //retornando a data de hoje
		
	}

	set currentDate (valor) {
		this._currentDate = valor;

	}


	get displayDate() {
		return this._dateEl.innerHTML;
	}


	set displayDate(value) {
		this._dateEl.innerHTML = value;
	}




//Display-------------------------------
	get displayCalc () {

		return this._displayCalcEl.innerHTML;
	
	}


	set displayCalc(valor){
		this._displayCalcEl.innerHTML = valor;
	}

	
}
