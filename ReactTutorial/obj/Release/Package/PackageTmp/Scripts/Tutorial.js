﻿var Card = React.createClass({
	getInitialState: function(){
		return {};	
	},
	componentDidMount: function(){
		var self = this;
		$.get("https://api.github.com/users/"+this.props.login, function(data){
			self.setState(data);
		});
	},
	
	render: function(){
		return(
			<div>
				<img src={this.state.avatar_url} width="80"/>
				<h3> {this.state.name} </h3>
				<hr/>
			</div>
		);
	}
});

var Form = React.createClass({
	handleSubmit:  function(e){
		e.preventDefault();
		var loginInput = React.findDOMNode(this.refs.login);
		this.props.addCard(loginInput.value);
		loginInput.value = '';
	},
	render: function(){
		return(
			<form onSubmit={this.handleSubmit}>
				<input placeholder="github login" ref="login"/>
				<button>Add </button>
			</form>
		);
	}
});

var Main = React.createClass({
	getInitialState: function(){
		return {logins:[]}
	},
	addCard: function(login){
		this.setState({logins: this.state.logins.concat(login)});
	
	},
	render: function(){
		var cards = this.state.logins.map(function(login){
			return (<Card login={login} />);
		});
		return(
			<div>
				<Form addCard= {this.addCard}/>
				{cards}
			</div>
		);
	}
});
React.render(
  <Main />,
  document.getElementById('content')
);
