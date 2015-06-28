

var StarsFrame = React.createClass({

	render: function() {
		var stars = [];
		for (var i = 0, l =this.props.numberOfStars ; i < l; i ++) {
			stars.push(
					<span className="glyphicon glyphicon-star" key={i}></span>);
		}
		return (
			<div id="stars-frame">
				<div className="well">
					<center>
					{ stars }
					</center>
				</div>
			</div>
		);
	}
});

var ButtonFrame = React.createClass({

	render: function() {
		var correct = this.props.correct;
		var button = null;
		var redrawDisabled = this.props.redraw == 0;
		if(correct){
			button =(
					<button onClick={this.props.acceptAnswer} className="btn btn-success btn-lg" >
						<span className="glyphicon glyphicon-ok"> </span>	
					</button>	
				);
		}
		else if(correct === false){
			button =(
					<button className="btn btn-danger btn-lg" > 
						<span className="glyphicon glyphicon-remove"> </span>	
					</button>
				);
		}
		else{
			var disabled = this.props.selectedNumbers.length === 0 
			button =(
				<button className="btn btn-primary btn-lg" disabled={disabled} onClick={this.props.checkAnswer}>=</button>	
				);
		}
		return (
				<div id="button-frame">
					{button} 
					<br/>
					<br/>
					<button className="btn btn-warning btn-xs" onClick={this.props.redraw}>
						<span className="glyphicon glyphicon-refresh" disabled={redrawDisabled}  >
						</span>	
						&nbsp;
						{this.props.redrawsAvailable}
					</button>
				</div>
	    )
	}

});

var NumbersFrame = React.createClass({

	render: function() {
		var clickNumber = this.props.clickNumber;
		var numbers = [];
		var usedNumbers = this.props.usedNumbers;
		var selectedNumbers = this.props.selectedNumbers;
		for (var i = 1, l = 10; i < l; i ++) {
			className = "number selected-"+ (selectedNumbers.indexOf(i) >= 0);
			className += " used-"+ (usedNumbers.indexOf(i) >= 0);

			numbers.push(<div className={className} key={i} onClick={clickNumber.bind(null,i)}>{i}</div>);
		}
		return (
			<div id="numbers-frame" className="well">
				<center>
				{numbers}
				</center>
			</div>
		);
	}
});

var AnswersFrame = React.createClass({

	render: function() {
		var removeNumber = this.props.removeNumber; 
		var selectedNumbers = this.props.selectedNumbers.map(function(number, index){
			return(
				<span key={index} onClick={removeNumber.bind(null,number)}>{number}</span>
		    );
		});
		return (
			<div id="answer-frame">
				<div className="well">
					{selectedNumbers}
				</div>
			</div>
		);
	}

});
var DoneFrame = React.createClass({

	render: function() {
		return (
			<div className="well text-center">
				<h2>{this.props.doneStatus}</h2>
			</div>
		);
	}

});
var Game= React.createClass({
	getInitialState: function(){
		return {
			selectedNumbers: [],
			numberOfStars: this.getRandomNumber(),
			correct: null,
			redraws: 5,
			usedNumbers: [],
			doneStatus: null 
		};
	},
	possibleConviationsAvailable: function(number, availableNumbers){
		if(availableNumbers.indexOf(number) >=0)
			return true;
		availableNumbers = availableNumbers.sort();
		if(availableNumbers[0] > number){
			return false;
		}
		var smallerThanNumber = availableNumbers.filter(function(n){
			return n < number;
		});
		
		var ammountOfSmallerNumbers = smallerThanNumber.length;  
		for (var i = ammountOfSmallerNumbers-1; i >= 0; i --) {
			var biggerNumber = smallerThanNumber.pop();
			var matchFound = this.possibleConviationsAvailable(number - biggerNumber, smallerThanNumber);
			if(matchFound) return true;	
		}
		return false;
	},
	possibleSolutions: function(){
		var numberOfStars = this.state.numberOfStars,
			availableNumbers = [],
			usedNumbers = this.state.usedNumbers;
		for (var i = 0, l = 9; i < l; i ++) {
			if(usedNumbers.indexOf(i) < 0){
				availableNumbers.push(i);	
			}
		}
		return this.possibleConviationsAvailable(numberOfStars,availableNumbers);
		
	},
	updateDoneStatus: function(){
		if(this.state.usedNumbers.length === 9){
			this.setState({doneStatus:"You win!"});
			return;
		}
		if(!this.possibleSolutions() && this.state.redraws===0){
			this.setState({doneStatus: "Sorry, better luck next time"});	
		}
	},
	getRandomNumber: function(){
		return Math.floor(Math.random()*9)+1;
	},
	acceptAnswer: function(){
		var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
		this.setState({
			selectedNumbers: [],
			usedNumbers: usedNumbers,
			correct: null,
			numberOfStars: this.getRandomNumber(),
		},function(){
			this.updateDoneStatus();	
		});
	},

	redraw: function(){
		var redrawsAvailable = this.state.redraws;
		if(redrawsAvailable >  0){
			this.setState({
				numberOfStars: this.getRandomNumber(),
				correct:null,
				selectedNumbers: [],
				redraws: redrawsAvailable -1
			},function(){
				this.updateDoneStatus();
			});
		}
	},
	addNumber: function(clickedNumber){
		if(this.state.selectedNumbers.indexOf(clickedNumber) < 0){
			this.setState({
				correct: null,
				selectedNumbers: this.state.selectedNumbers.concat(clickedNumber)
			});
		}
	},
	sumOfSelectedNumbers: function(){
		return this.state.selectedNumbers.reduce(function(accumulator,number){
			return accumulator + number;	
		},0);
	},
	checkAnswer: function(){
		this.setState({
			correct: this.state.numberOfStars === this.sumOfSelectedNumbers()
		});
	},
	removeNumber: function(clickedNumber){
		var selectedNumbers = this.state.selectedNumbers;
	    var index = selectedNumbers.indexOf(clickedNumber);
		if(index > -1){
			selectedNumbers.splice(index,1);
			this.setState({
				correct: null,
				selectedNumbers: selectedNumbers 
			});
		}
	},
	render: function(){
		var selectedNumbers = this.state.selectedNumbers;
		var numberOfStars = this.state.numberOfStars;
		var correct = this.state.correct;
		var usedNumbers = this.state.usedNumbers;
		var bottomFrame = this.state.doneStatus? 
				<DoneFrame doneStatus={this.state.doneStatus}/> :
				<NumbersFrame clickNumber={this.addNumber} selectedNumbers={selectedNumbers} usedNumbers={usedNumbers}/>;
		return (
			<div id="game">
				<h2> Play Nine </h2>
				<hr/>
				<div className="clearfix">
					<StarsFrame numberOfStars={numberOfStars}/>
					<ButtonFrame selectedNumbers={selectedNumbers} acceptAnswer={this.acceptAnswer} correct={correct} checkAnswer={this.checkAnswer} redraw={this.redraw} redrawsAvailable={this.state.redraws}/>
					<AnswersFrame selectedNumbers={selectedNumbers} removeNumber={this.removeNumber}/>
				</div>
				{bottomFrame}
			</div>
			
		);
	}

});

React.render(
	<Game/>,

	document.getElementById('container')
);

