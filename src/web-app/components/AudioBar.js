import React from 'react'

export default class AudioBar extends React.Component {

    constructor(props) {
        super(props);
    }

    allowDrop(e) {
        //this.allowDrop(this);
        e.preventDefault();
        e.dataTransfer.setData('text', e.target.id);
    }

    drop(e) {
        //drop.drop(this);
        e.preventDefault();
        var data = e.dataTransfer.getData('text');
        // console.log(document.getElementById(data).innerText);
    }

    updateSoundBar() {
        const numbers = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

        let listItems = numbers.map((number, index) =>
            <div className='bar' style={{height: number}} key={index}></div>
        );
        return listItems
    }

    render() {

        let audio =
            {
                height: '6rem',
                backgroundColor: 'rgb(50, 50, 50)',
                margin: '2%',
            };

        let overflowY =
            {
                overflowY: 'hidden',
            };

        return (
            <div id="testMusic" style={overflowY} onDrop={this.drop.bind(this)}
                 onDragOver={this.allowDrop.bind(this.event)}>
                <div style={audio}>
                    {this.updateSoundBar()}
                </div>
            </div>
        )
    }
}
