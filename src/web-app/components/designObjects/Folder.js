import React from 'react';
import FileService from '../../services/file-service.js'
import {Config} from '../../services/file-path-service.js'

export default class FolderButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            correctPath: true,
        };

        this.changeDirectory = this.changeDirectory.bind(this);
    }

    changeDirectory() {
        let filePath = Config.path + '/' + this.props.fileName;

        //if user has clicked on '..'folder
        // if(this.props.path === '.'){
        //     filePath = Config.path + "/..";
        // }
        // else{
        //     filePath = this.props.path
        //     console.log(filePath)
        //     filePath = filePath.replace("../", "");
        //     console.log(filePath)
        //     filePath = filePath + "/.." ;
        //     console.log(filePath)
        // }

        let testFilePath = new FileService('127.0.0.1', 2345);

        testFilePath.getFiles(filePath).then(files => {
            this.setState({correctPath: true});
            Config.path = filePath;
        }).catch(error => {
            this.setState({correctPath: false});
            console.error(error);
        });
    }

    render() {

        let svgWidth = {
            width: "6%",
        };

        let svgBackground =
            {
                fill: "#e5004b",
            };

        let svgForeground =
            {
                fill: "#1e1e1e",
            };

        return (
            <svg viewBox="0 0 48 48" style={svgWidth} onDoubleClick={this.changeDirectory}>
                <g>
                    <path style={svgBackground}
                          d="M 40 12 L 22 12 L 18 8 L 8 8 C 5.800781 8 4 9.800781 4 12 L 4 20 L 44 20 L 44 16 C 44 13.800781 42.199219 12 40 12 Z "/>
                    <path style={svgForeground}
                          d="M 40 12 L 8 12 C 5.800781 12 4 13.800781 4 16 L 4 36 C 4 38.199219 5.800781 40 8 40 L 40 40 C 42.199219 40 44 38.199219 44 36 L 44 16 C 44 13.800781 42.199219 12 40 12 Z "/>
                </g>
            </svg>
        );
    }
}

