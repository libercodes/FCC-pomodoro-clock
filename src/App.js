import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { UserReducer, initialState, actions } from './reducer/reducer' 

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: royalblue;
`

const Label = styled.h1`
    font-size: 1.2rem;
    color: white;
`
const LabelContainer = styled.div`
    width: 30%;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem;
`
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const TimerContainer = styled.div`
    width: 400px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    border: 3px solid white;
    margin-bottom: 10%;
`
const Timer = styled.h1`
    color: white;
    font-size: 5rem;
`
const ValueForLabels = styled.h2`
    color: white;
    padding: 0 1.5rem;
`

const Button = styled.div`
    font-size:2rem;
    padding: 0.8rem;
    width: 5rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    margin: 0.5rem;
    align-items: center;
    cursor: pointer;
    background-color: white;
    transition: background-color .5s;
    :hover{
        background-color: gray;
    }
`
    
/* COLOCAR ESO EN USE EFFECT  

    ) */

const App = props => {
    const [ state, dispatch ] = useReducer(UserReducer, initialState)
    const SetIntervalID = interval => dispatch({ type: actions.SET_INTERVAL_ID, payload: interval })

    const { intervalID } = state


    const BeginCountDown = () => {
        dispatch({ type: actions.PLAY })
        SetIntervalID(window.accurateInterval(() => {
            DecrementTimer()
        }, 1000))
}
    /** USAR CUALQUIER DE LOS DOS CODIGOS PARA EL USEEFFECT. SON LOS DOS LO MISMO
    /////////////////////////////////////////////////////
    useEffect(() => state.timer < 0 ? (() => state.sessionType === "Session" ? (intervalID && intervalID.cancel(), dispatch({ type: actions.CHANGE_TIMER_TO_BREAK }), BeginCountDown()) : (intervalID && intervalID.cancel(), dispatch({ type: actions.CHANGE_TIMER_TO_SESSION }), BeginCountDown()) )() : () => {}  )
    /////////////////////////////////////////////////////

    ////////////////////////////////////////////////////
    const HandleReachZero = () => state.sessionType === "Session" ? (intervalID && intervalID.cancel(), dispatch({ type: actions.CHANGE_TIMER_TO_BREAK }), BeginCountDown()) : (intervalID && intervalID.cancel(), dispatch({ type: actions.CHANGE_TIMER_TO_SESSION }), BeginCountDown())
    state.timer < 0 && HandleReachZero()
    //////////////////////////////////////////////////////////
    */
       useEffect(() => {
        const HandleReachZero = () => 
            state.sessionType === "Session" ? (
            intervalID && intervalID.cancel(),
            dispatch({ type: actions.CHANGE_TIMER_TO_BREAK }),
            BeginCountDown()
            ) : (
            intervalID && intervalID.cancel(),
            dispatch({ type: actions.CHANGE_TIMER_TO_SESSION}),
            BeginCountDown())

            state.timer < 0 && HandleReachZero()

     })


    const clockify = () => {
        let timer = state.timer
        let minutes = Math.floor(timer / 60)
        let seconds = Math.floor(timer - (minutes*60))
        seconds = seconds < 10 ? '0' + seconds : seconds
        minutes = minutes < 10 ? '0' + minutes : minutes
        console.log('' +minutes + ':' + seconds)
        return '' +minutes + ':' + seconds;
    }

    const Reset = () => {
        intervalID && intervalID.cancel()
        SetIntervalID('')
        dispatch({ type: actions.RESET })
    }



    const Pause = () => {
        intervalID && intervalID.cancel()
        dispatch({ type: actions.STOP })
    }

    const DecrementTimer = () => dispatch({ type: actions.DECREMENT_TIMER })
    
    const HandlePlayButton = () => state.timerState === "running" ? Pause() : BeginCountDown()
    
    const IncrementSessionLength = () => (state.timerState === "stopped" && state.sessionLength < 60) ? (dispatch({ type: actions.INCREMENT_SESSION_LENGTH }), dispatch({ type: actions.UPDATE_TIMER })) : null
    
    const DecrementSessionLength = () => (state.timerState === "stopped" && state.sessionLength > 0) ? (dispatch({ type: actions.DECREMENT_SESSION_LENGTH }), dispatch({ type: actions.UPDATE_TIMER })) : null
    
    const IncrementBreakLength = () => (state.timerState === "stopped" && state.breakLength < 60) ? dispatch({ type: actions.INCREMENT_BREAK_LENGTH }) : null
    
    const DecrementBreakLength = () => (state.timerState === "stopped" && state.breakLength > 0) ? dispatch({ type: actions.DECREMENT_BREAK_LENGTH}) : null 


    



    return(
        <Container>
            <LabelContainer>

                <InnerContainer>
                    <Label>Session Length</Label>
                    <ButtonContainer>
                        <Button
                            onClick={() => DecrementSessionLength()}
                        >-</Button>
                        <ValueForLabels>{state.sessionLength}</ValueForLabels>
                        <Button
                            onClick={() => IncrementSessionLength()}
                        >+</Button>
                    </ButtonContainer>
                </InnerContainer>
                
                
                <InnerContainer>
                    <Label>Break length</Label>
                    <ButtonContainer>
                        <Button
                            onClick={() => DecrementBreakLength()}
                        >-</Button>
                        <ValueForLabels>{state.breakLength}</ValueForLabels>
                        <Button
                            onClick={() => IncrementBreakLength()}
                        >+</Button>
                    </ButtonContainer>
                </InnerContainer>

            </LabelContainer>

            <TimerContainer>
                <h2>{state.sessionType}</h2>
                <Timer>{clockify()}</Timer>
            </TimerContainer>
            <Button 
                onClick={() => HandlePlayButton()}
            >{state.timerState === "stopped" ? "Play" : "Pause"}</Button>
            <Button
                onClick={() => Reset()}
            >Reset</Button>
        </Container>
    )
}

export default App