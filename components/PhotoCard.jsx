import React from 'react'

const PhotoCard = ( { url } ) => {
    return (
        <div> 
            <div style = {{
                boarder : '2px solid red', padding: 5 }}>
                <img src = { url } alt = "Image" style = {{ width: '100', height: '60' }} priority />
            </div>
        </div>
    )

}

export default PhotoCard