import React from 'react'
import classes from './DrumKey.module.css'

function DrumKey(props) {
    let playingStyle = []

    if(props.playing){
        playingStyle = classes.playing
    }

    return (
        <button name={props.name}
                className={[classes.DrumKey, playingStyle].join(' ')}
                onClick={() => props.click(props.name)}
                onTransitionEnd={props.end}
        >
            <div className={classes.Letter}>{props.letter}</div>
            <span className={classes.subTitle}>{props.drumName.toUpperCase()}</span>

        </button>
    )
}

export default DrumKey