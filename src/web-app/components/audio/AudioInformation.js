import React from 'react'

export default class AudioInformation extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        let informationText = null;
        this.filter = this.props.filterChanged
        console.log("From render AudioInformation: " + this.filter)

        if (this.filter === 'Volume') {
            informationText = <p>{this.filter}</p>;
        }
        else if (this.filter === 'Lowpass Frequency' || this.filter === 'Lowpass Quality') {
            informationText = (
                <div>
                    <p>{this.filter}</p>
                    <p style={{marginTop: '1rem', color: '#e5004b'}}>Lowpass has to be active!</p>
                </div>
            );
        }
        else if (this.filter === 'Highshelf Frequency') {
            informationText = (
                <div>
                    <p>{this.filter}</p>
                    <p style={{marginTop: '1rem', color: '#e5004b'}}>Highshelf has to be active!</p>
                </div>
            );
        }


        return <div className="filterInfo">
            {informationText}
        </div>
    }
}




