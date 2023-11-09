import React from 'react';

function withColorFrame(colors) {
    return function(Comp) {
      return props => (
        colors.reduce((acc, element) => {
          return (<div style={{border:"solid 3px", borderColor: element, padding: "2px"}}>
                    {acc}
                  </div>)
                }, <Comp {...props} />)
      );
    };
}


export { withColorFrame };