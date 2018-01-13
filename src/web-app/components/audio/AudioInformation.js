import React from 'react'

export default class AudioInformation extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        let informationText = null;
        this.filter = this.props.filterError

        if (this.filter === 'Lowpass Frequency' || this.filter === 'Lowpass Quality') {
            informationText = (
                <div>
                    <p style={{marginTop: '1rem', color: '#e5004b'}}>Lowpass has to be active!</p>
                </div>
            );
        }
        else if (this.filter === 'Highshelf Frequency') {
            informationText = (
                <div>
                    <p style={{marginTop: '1rem', color: '#e5004b'}}>Highshelf has to be active!</p>
                </div>
            );
        }
        else{informationText =(<div></div>);}

        return <div className="filterInfo">
            {informationText}
        </div>
    }
}




