import React from 'react'

export class AudioBar extends React.Component {

    constructor(props) {
        super(props);
    }

    static allowDrop(e) {
        e.preventDefault();
        e.dataTransfer.setData('text', e.target.id);
    }

    static drop(e) {
        e.preventDefault();
        var data = e.dataTransfer.getData('text'); //in data the id is stored
    }

    static updateSoundBar() {
        const numbers = [95, 95, 95, 95, 50, 50, 50, 50, 50, 75, 75, 75, 75, 75,]; //max height is 95

        let listItems = numbers.map((number, index) =>
            <div className='bar' style={{height: number,}} key={index}></div>
        );
        return listItems
    }


    render() {

        let audio =
            {
                height: '6rem',
                backgroundColor: '#1e1e1e',
                margin: '2%',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignItems: 'flex-end',
                overflow: 'hidden',
            };

        return (
            <div id="testMusic" onDrop={AudioPlayer.drop.bind(this)}
                 onDragOver={AudioPlayer.allowDrop.bind(this.event)}>
                <div style={audio}>
                    {AudioPlayer.updateSoundBar()}
                </div>
            </div>
        )
    }
}