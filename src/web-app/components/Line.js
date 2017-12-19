import React from 'react';

class Line extends React.Component {
   render() {

      let line =
      {
        border: "3px solid #1e1e1e",
      };

      return (
         <div style={line}/>
      );
   }
}

export default Line;
