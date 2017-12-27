import React from 'react';
import {Sidebar} from '../test/sidebar.js';

export default class OptionsButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuClicked: false
        };

        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick() {
        if (this.state.menuClicked === false) {
            this.setState({menuClicked: true});
            Sidebar.showSidebar();
        }

        else if (this.state.menuClicked === true) {
            this.setState({menuClicked: false});
            Sidebar.closeSidebar();
        }
    }

    render() {
        let optionLine = {
            strokeWidth: "13px",
        }

        let optionCircle = {
            strokeWidth: "9px",
        }
        return (
            <div onClick={this.handleMenuClick}>
                <svg className="MenuButton" viewBox="0 0 452 269">
                    <g>
                        <g>
                            <line style={optionLine} x1="445.5" y1="28.5" x2="6.5" y2="28.5"/>
                            <circle style={optionCircle} cx="52" cy="29.5" r="25"/>
                            <line style={optionLine} x1="445.5" y1="134.5" x2="6.5" y2="134.5"/>
                            <circle style={optionCircle} cx="366" cy="134.5" r="25"/>
                            <line style={optionLine} x1="445.5" y1="239.5" x2="6.5" y2="239.5"/>
                            <circle style={optionCircle} cx="43" cy="239.5" r="25"/>
                        </g>
                    </g>
                </svg>
            </div>
        );
    }
}

