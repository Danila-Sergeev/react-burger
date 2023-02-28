import React from 'react';
import './App.css';
import Header from '../AppHeader/AppHeader';

class App extends React.Component {
	render() {
		const mainData = {
			profile: 'Личный кабинет',
			navText_constuctor: 'Конструктор',
			navText_thread: 'Лента заказов',
		};
		return (
			<div className="App">
				<Header mainData={mainData}></Header>
			</div>
		);
	}
}

export default App;
