import React from 'react'
import classes from './DrumKey.module.css'

class DrumKey extends React.Component {
    constructor(props) {
        super(props);
        this.soundRef = React.createRef();
    }

    render() {
        let playingStyle = []

        if (this.props.playing) {
            playingStyle = classes.playing

            if(this.soundRef){
                this.soundRef.current.currentTime = 0
                this.soundRef.current.play()
            }

        }

        return (
            <button name={this.props.name}
                    className={[classes.DrumKey, playingStyle].join(' ')}
                    onClick={() => this.props.click(this.props.name)}
                    onTransitionEnd={this.props.end}
            >
                <div className={classes.Letter}>{this.props.letter}</div>
                <span className={classes.subTitle}>{this.props.drumName.toUpperCase()}</span>
                <audio src={this.props.src} ref={this.soundRef}/>
            </button>
        )
    }
}

export default DrumKey