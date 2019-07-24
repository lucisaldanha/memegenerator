import React, {Component} from 'react';

class MemeGenerator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			topText: '',
			bottomText: '',
			randomImage: 'http://i.imgflip.com/1bij.jpg',
			allMemeImgs: []
		};
		// this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		fetch('https://api.imgflip.com/get_memes')
		.then( response => response.json())
		.then( response => {
			const { memes } = response.data;
			// console.log(memes[0].url)
			this.setState({ allMemeImgs: memes})
		})
	}

	handleChange = (event) => {
		const { name, value} = event.target;
		this.setState({
			[name]: value
		});
		// console.log([name], value);
	}

	handleSubmit (event) {
		event.preventDefault();
		const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
		const randMemeIng = this.state.allMemeImgs[randNum].url;
		this.setState({
			randomImage: randMemeIng
		});
	}

	render() {
		return (
			<div>
				<form className='memeForm' onSubmit={this.handleSubmit}>
					{ /* first input */}
					<input 
						type='text'
						name='topText'
						value={this.state.topText}
						onChange={this.handleChange}
						placeholder='Top Text'
					/>
					{ /* second input */}
					<input 
						type='text'
						name='bottomText'
						value={this.state.bottomText}
						onChange={this.handleChange}
						placeholder='Bottom Text'
					/> 
				{ /* button to generate a Meme*/}
					<button>Generate Meme</button>
				</form>
				<div className='meme'>
					<img src={this.state.randomImage} alt='' />
					<h2 className='topText'>{this.state.topText}</h2>
					<h2 className='bottomText'>{this.state.bottomText}</h2>
				</div>
				<footer className='footer'>
					<p>Created by Lucieni Saldanha</p>
				</footer>
			</div>
		)
	}
}

export default MemeGenerator;