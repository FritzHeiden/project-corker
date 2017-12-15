import React from "react";

class Checkbox extends React.Component {

    constructor(){
        super();
        this.state = {
            isGoing: true,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        console.log(target);
        console.log(value);
        console.log(name);

        this.setState({
            [name]: value
        });
    }

    render(){
        return (
            <input
                name="isGoing"
                type="checkbox"
                onClick={this.handleInputChange}
                checked={this.state.isGoing}
                readOnly
            />
        );
    }
}

export default Checkbox;
