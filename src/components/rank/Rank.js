import React from 'react'

function Rank({name, entries}) {
    return (
        <div className = "font-style center f3" style = {{color: '#1e6254'}}>
            {name}, Your Current entries count is.... {entries}
        </div>
    )
}

export default Rank
