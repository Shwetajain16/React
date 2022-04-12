import React from 'react'

const Functionalrefdemo = React.forwardRef((props, ref)=> {

    return (
        <div>
            <h2>this is child</h2>
            <input ref={ref} type="text"/>
        </div>
    )
});
export default Functionalrefdemo