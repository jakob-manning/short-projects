import React from 'react'
import DrumKey from "../../Components/DrumKey/DrumKey";
import classes from './DrumApp.module.css'
import DrumImage from '../../assets/images/drumsLowRez.jpg'
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import boom from '../../assets/sounds/boom.wav'
import clap from '../../assets/sounds/clap.wav'
import hiHat from '../../assets/sounds/hihat.wav'
import kick from '../../assets/sounds/kick.wav'
import openHat from '../../assets/sounds/openhat.wav'
import ride from '../../assets/sounds/ride.wav'
import snare from '../../assets/sounds/snare.wav'
import tink from '../../assets/sounds/tink.wav'
import tom from '../../assets/sounds/tom.wav'
import boomMP3 from '../../assets/sounds/boom.mp3'


class DrumApp extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            currentDrumName: '',
            drumming: false

        }
    }

    clickHandler = (key) => {
        this.play(key)
    }

    play =(key) => {
        this.setState(prevState => {
            if(prevState[key]){
                return {[key]: false, drumming: false}
            }
            return {[key]: true, drumming: true}
        })

        // if(this.drumMapping[key].ref){
        //     this.drumMapping[key].ref.current.currentTime = 0
        //     this.drumMapping[key].ref.current.play()
        // }
    }

    endHandler= (event) => {
        if(event.propertyName === "transform"){
            this.setState({[event.target.name]: false, drumming: false})
        }
    }

    drumMapping ={
        KeyA: {name:"clap", ref: '', src: clap, letter: "A"},
        KeyS: {name:"hiHat", ref: '', src: hiHat, letter: "S"},
        KeyD: {name:"kick", ref: '', src: kick, letter: "D"},
        KeyF: {name:"openHat", ref: '', src: openHat, letter: "F"},
        KeyG: {name:"boom", ref: '', src: boomMP3, letter: "G"},
        KeyJ: {name:"ride", ref: '', src: ride, letter: "J"},
        KeyK: {name:"snare", ref: '', src: snare, letter: "K"},
        KeyL: {name:"tink", ref: '', src: tink, letter: "L"},
        Semicolon: {name:"tom", ref: '', src: tom, letter: ";"},
    }

    componentDidMount() {
        let keys = Object.keys(this.drumMapping)
        window.addEventListener('keydown', (event) => {
            if(keys.includes(event.code)){
                this.play(event.code)
            }
        })
    }

    DrumKeys = [
        {name: "Boom", key: "KeyA"},
        {name: "Snare", key: "KeyS"},
        {name: "High Hat", key: "KeyD"},
    ]

    render() {

        let drums = []
        for(let key in this.drumMapping){
            drums.push(
                <DrumKey
                    name={key}
                    key={"Drums" + key}
                    click={this.clickHandler}
                    playing={this.state[key]}
                    drumName={this.drumMapping[key].name}
                    end={this.endHandler}
                    letter={this.drumMapping[key].letter}
                    src={this.drumMapping[key].src}
                />
                )
        }

        let blur = []
        let textBlur = [classes.textBlur]
        if (this.state.drumming) {
            blur=[classes.blur]
            textBlur= []
        }

        return (
            <Auxiliary>
                <div className={[classes.Title,textBlur].join(' ')}>{"Are you ready to rock?"}</div>
                <div onChange={this.changeHandler}>
                    <img className={[classes.DrumImage, blur].join(' ')} src={DrumImage} alt={"view of drumming on stage"}/>
                    <div className={classes.DrumKit}>
                        {drums}
                    </div>
                </div>
            </Auxiliary>
        )
    }
}

export default DrumApp