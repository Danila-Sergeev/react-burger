import React from 'react';
import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStiles from './AppHeader.module.css';
import Navigation from './Navigation/Navigation';

class Header extends React.Component {
	render() {
		const { profile, navText_constuctor, navText_thread } = this.props.mainData;
		return (
			<header className={`${headerStiles.header} mr-2 pl-3 mt-15`}>
				<div className={`${headerStiles.navigation_elements}`}>
					<Navigation
						className="mr-5"
						icon={BurgerIcon}
						textElement={navText_constuctor}
					/>
					<Navigation
						icon={ListIcon}
						textElement={navText_thread}
					/>
				</div>
				<Logo />
				<button className={headerStiles.profile_button}>
					<ProfileIcon />
					<p className="pl-2 text text_type_main-default">{profile}</p>
				</button>
			</header>
		);
	}
}

export default Header;
