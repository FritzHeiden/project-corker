import React from 'react'

export class AudioBar extends React.Component {

    constructor(props) {
        super(props);
    }

    static allowDrop(e) {
        e.preventDefault();
        e.dataTransfer.setData('text', e.target.id);
        console.log(e.target.id);
        alert("Hallo from AllowDrop");
    }

    static drop(e) {
        e.preventDefault();
        var data = e.dataTransfer.getData('text');
        console.log(e.target.id);
        alert("Hallo from Drop");
        console.log(document.getElementById(data));
    }

    static updateSoundBar() {
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
            <div id="testMusic" style={overflowY} onDrop={AudioBar.drop.bind(this)}
                 onDragOver={AudioBar.allowDrop.bind(this.event)}>
                <div style={audio}>
                    {this.updateSoundBar()}
                </div>
            </div>
        )
    }
}
