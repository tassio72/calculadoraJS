class CalcController { //criando uma classe

	constructor () {
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

	initButtonsEvents() {
	//bom lembra que tanto os botões quanto seus respectivos textos tem a mesma classe
		let buttons = document.querySelectorAll("#buttons > g, #parts > g");

		buttons.forEach((btn, index)=>{

			btn.addEventListener ('click', e => {

				console.log(btn.className.baseVal.replace("btn-","")); //.
				console.log(index);

			});


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
