class CalcController { //criando uma classe

	constructor () {

		this._audio = new Audio("click.mp3");
		this._audioOnOff = false;
		this._lastOperator = "";
		this._lastNumber = "";

		this._operation = [];
		this._locale = "pt-Br";
		this._displayCalcEl = document.querySelector("#display");
		this._dateEl = document.querySelector("#data");
		this._timeEl = document.querySelector("#hora");
		 // anderline no JS significa que o atributos é privado
		this._currentDate;
		this.initialize(); //função que chama o que deve iniciar junto com a página 
		this.initButtonsEvents(); //chamando eventos
		this.initKeyboard();
	}

	pasteFromClipboard(){


		document.addEventListener("paste", e=> {

			let text = e.clipboardData.getData("Text");
			this.displayCalc = parseFloat(text);

		})
	}

	copyToClipboard() {

		let inputNew = document.createElement("input");

		inputNew.value = this.displayCalc;

		document.body.appendChild(inputNew);

		inputNew.select();

		document.execCommand("Copy");

		inputNew.remove();
	}

	initialize() { //o que deve ser iniciado quando intanciarmos está classe
		//setTimeOut(()=>{}, time); função que gera apena uma vez após o tempo determinado
		
		this.setDisplayDateTime();	//para a calculadora não ficar 1 segundo sem a informações do tempo, chamamos a função antes do setInterval	
	
		setInterval (()=>{ //setInterval demora um segundo +/- para iniciar o método e acionar ao display
	
			this.setDisplayDateTime();
				
		}, 1000);

		this.setLastNumberToDisplay();
		this.pasteFromClipboard();

		document.querySelectorAll(".btn-ac").forEach(btn =>{

			btn.addEventListener("dblclick", e=>{

				this.toggleAudio();
			})
		})

		this.toggleAudio();

	}


toggleAudio() {

	this._audioOnOff = !this._audioOnOff;

//if ternario
	//this._audioOnOff = (this._audioOnOff) ? false : true;

//if comum
	//if (this._audioOnOff) {
	//	this._audioOnOff = false;

	//} else {

	//	this._audioOnOff = true;
	//}

}

playAudio() {

	 if (this._audioOnOff) {

	 	this._audio.currentTime = 0;
	 	this._audio.play();
	 }
}

initKeyboard() {
	
	document.addEventListener("keyup", e=> {

		this.playAudio();

		switch (e.key) {

			case "Escape":

				this.clearAll();

			break;

			case "Backspace":

				this.clearEntry();
				
			break;

			case "+":
			case "-":
			case "*":
			case "/":
			case "%":

				this.addOperation(e.key);

			break;

			case "Enter":
			case "=":

				this.calc();
			break;

			case ".":
			case ",":

				this.addDot();
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
				this.addOperation(parseInt(e.key));
				break;

			case "c":
				if (e.ctrlKey) this.copyToClipboard();
				break;	
		}

	})

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
	this._lastNumber = "";
	this._lastOperator = "";
	

    this.setLastNumberToDisplay(); 
}

clearEntry(){ //apagando o ultimo valor digitado pelo usuário
	this._operation.pop(); // apaga o último valor do Array
	this.setLastNumberToDisplay();
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

pushOperation(value){
/*como temos que fazer as contas em trios (num + sinal + num), quando o Array tiver mais de 3 values,
 vamos realizar a operação dos 3 primeiros, salvar em uma variável e aguarda as próximas ações do usuário.
 Isso para garantir que a calculadora respeitará as regras de precedências da matemática
*/
	this._operation.push(value);

	if (this._operation.length > 3){

		this.calc();

	}

}

getResult(){

	try {
		
		return eval(this._operation.join(""));

	} catch (e) {

		setTimeOut(()=> {
		
			this.setError();
		
		}, 1)
			
	}
}

calc(){ //realizando as operações
	//vamos usar o método eval, um´método que calcula valores dentro de uma String
	//também vamos usar o join, que substitui um separador de uma string por outro
		
	let last = "";

	this._lastOperator = this.getLastItem();

	if (this._operation.length < 3) {

		let firstItem = this._operation[0];
		this._operation = [firstItem, this._lastOperator, this._lastNumber];
	}

	if (this._operation.length > 3){
		
		last = this._operation.pop(); //tirando o último valor da [] e salvando na variável
		
		this._lastNumber = this.getResult(); //pegando o último número do Array

	} else if (this._operation.length ==3){

		this._lastNumber = this.getLastItem(false);

	}


	let result = this.getResult();

	if (last == "%") {

		//result = result / 100;
		result /= 100;
		this._operation = [result];

	} else {		
	
		this._operation = [result]; //observe criamos outra array, com dois argumentos
										// o primeiro é o result dos três ultimos indexs da array antiga
										//o segundo é o úlitmo index digitado, o qual acionou o método e exigiu a operação 

		if (last) this._operation.push(last); //se last tiver algo, põe na array

	}

		this.setLastNumberToDisplay(); //atualizando display após o calculo


}

getLastItem(isOperator = true){
	
	let lastItem

 	for (let i = this._operation.length-1;i >= 0; i--) {

 		if (this.isOperator(this._operation[i]) == isOperator){

 			lastItem = this._operation[i];
 			break

 		}

 	}

 	if (!lastItem){

 		lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
 	}

 	return lastItem

}

setLastNumberToDisplay(){ //atualizando o display
/* Vamos atualizar o display com o último valor da Array*/

	let lastNumber = this.getLastItem(false);

	if (!lastNumber) lastNumber = 0; //deixando sempre o array/display com valor 0, evitando de deixa-lo vazio
	this.displayCalc = lastNumber; //mandando pro display

}
addOperation(value){
//nós precisamos validar qual foi o botão digitado. Dependendo de qual foi, podemos ter que concaternar o valor clicado neste momento 
//com o último valor add a Array

//a  primeira que vez algo é clicado, a Array está vazia, portanto da undefined e caí neste looping
	if (isNaN(this.getLastOperation())){  //observe que vamos avaliar o último valor adicionado a Array e não o valor clicado neste momento
		
		if (this.isOperator(value)) { // verificando se o último valor digitado é um sinal, caso for, precisamos trocar pelo novo sinal
				
			this.setLastOperation(value); //se for true, substitua o sinal clicado
		
		} else {

			this.pushOperation(value); //mandando o valor (no caso, operador) para ultima posição da Array

			this.setLastNumberToDisplay(); //atualizando display pela primeira vez

		}
		
	} else { //se o último valor da Array for um número, ele cai aqui

		if (this.isOperator(value)){

			this.pushOperation(value);


		} else {


			let newValue = this.getLastOperation().toString() + value.toString();
			//this._operation.push(newValue); //o push adicionando o value ao final do Array
			this.setLastOperation(newValue); //alterando o valor como Interger

			this.setLastNumberToDisplay(); //atualizando display

		}

	}

		console.log(this._operation);

}
setError(){ //mensagem de erro na tela
	 this.displayCalc = "Error";
}

addDot() {

	let lastOperation = this.getLastOperation();

	if (typeof lastOperation === "string" && lastOperation.split("").indexOf(".") > -1) return;

	if (this.isOperator(lastOperation) || !lastOperation) {

		this.pushOperation("0.");

	} else {

		this.setLastOperation(lastOperation.toString() + ".");
	}

	this.setLastNumberToDisplay();
}


execBtn (value){

	//vamos usar a estrutura de condição switch para aplicarmos as operações de acordo com o que o usuário clicar 

	this.playAudio();

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

			this.calc();
		break;

		case "ponto":

			this.addDot();
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

		if (valor.toString().length > 10 ){

			this.setError();
			return false;
		}

		this._displayCalcEl.innerHTML = valor;
	}

	
}
