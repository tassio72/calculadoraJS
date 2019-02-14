class CalcController {

	constructor () {
		this._displayCalcEl = document.querySelector("#display");
		this._dateEl = document.querySelector("#data");
		this._timeEl = document.querySelector("#hora");
		 // anderline no JS significa que o atributos é privado
		this._currentDate;
		this.initialize();
	}

	initialize() { //o que deve ser iniciado quando intanciarmos está classe
		//setTimeOut(()=>{}, time); função que gera apena uma vez após o tempo determinado
		this.setDisplayDateTime();		
	
		setInterval (()=>{
	
			this.setDisplayDateTime();
				
		}, 1000);
	}

//methods

setDisplayDateTime() {
			this.displayDate = this.currentDate.toLocaleDateString("pt-Br",{ 
				day: "2-digit",
				month: "short",
				year: "numeric"
			});
			this.displayTime = this.currentDate.toLocaleTimeString("pt-Br");
	
}	

//time----------------------------
	get displayTime(){
		return this._timeEl.innerHTML;
	}

	set displayTime(value){
		this._timeEl.innerHTML = value;
	}

//date-----------------------------
	get displayDate() {
		return this._dateEl.innerHTML;
	}


	set displayDate(value) {
		this._dateEl.innerHTML = value;
	}



	get displayCalc () {

		return this._displayCalcEl.innerHTML;
	
	}


	set displayCalc(valor){
		this._displayCalcEl.innerHTML = valor;
	}

	get currentDate(){

		return new Date;
		//variavel.toLocaleDateString("pt-BR", opicional)
		//variavel.toLocaleTImeString("pt-BR")

	}

	set currentDate (valor) {
		this._currentDate = valor;

	}

}
