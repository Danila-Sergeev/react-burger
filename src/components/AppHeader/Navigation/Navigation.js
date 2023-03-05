import React from 'react';
import headerStiles from '../AppHeader.module.css';

class Navigation extends React.Component {
	render() {
		return (
			<button
				className={`${headerStiles.navigation_element} mr-5 ml-5 mt-4 mb-4`}
			>
				<this.props.icon />
				<p className="pl-2 text text_type_main-default">
					{this.props.textElement}
				</p>
			</button>
		);
	}
}

export default Navigation;
