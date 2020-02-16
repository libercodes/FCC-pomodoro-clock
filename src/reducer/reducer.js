export const actions = {
    DECREMENT_TIMER: "DECREMENT_TIMER",
    INCREMENT_SESSION_LENGTH: "INCREMENT_SESSION_LENGTH",
    DECREMENT_SESSION_LENGTH: "DECREMENT_SESSION_LENGTH",
    INCREMENT_BREAK_LENGTH: "INCREMENT_BREAK_LENGTH",
    DECREMENT_BREAK_LENGTH: "DECREMENT_BREAK_LENGTH",
    RESET: "RESET",
    PLAY: "PLAY",
    STOP: "STOP",
    SESSSION_TYPE_SESSION: "SESSION_TYPE_SESSION",
    SESSION_TYPE_BREAK: "SESSION_TYPE_BREAK",
    CHANGE_TIMER_TO_BREAK: "CHANGE_TIMER_TO_BREAK",
    CHANGE_TIMER_TO_SESSION: "CHANGE_TIMER_TO_SESSION",
    UPDATE_TIMER: "UPDATE_TIMER",
    SET_INTERVAL_ID: "SET_INTERVAL_ID"
}

export const initialState = {
    sessionLength: 1,
    timer: 5,
    breakLength: 1,
    timerState: "stopped",
    sessionType: "Session",
    intervalID: ''
}

export const UserReducer = ( state, action ) => {

    switch (action.type) {
        case actions.DECREMENT_TIMER:
            return {
                ...state,
                timer: state.timer - 1
            }
        case actions.INCREMENT_SESSION_LENGTH:
            return {
                ...state,
                sessionLength: state.sessionLength + 1
               
            }
        case actions.DECREMENT_SESSION_LENGTH:
            return {
                ...state,
                sessionLength: state.sessionLength - 1
            }
        case actions.INCREMENT_BREAK_LENGTH:
            return{
                ...state,
                breakLength: state.breakLength + 1
            }
        case actions.DECREMENT_BREAK_LENGTH:
            return {
                ...state,
                breakLength: state.breakLength - 1
            }
        case actions.RESET:
            return {
                timer: 1500,
                sessionLength: 25,
                breakLength: 5,
                sessionType: 'Session',
                timerState: "stopped",
                intervalID: ""
            }
        case actions.PLAY:
            return {
                ...state,
                timerState: "running"
            }
        case actions.STOP:
            return {
                ...state,
                timerState: "stopped"
            }
        case actions.CHANGE_TIMER_TO_BREAK:
            console.log(`[${actions.CHANGE_TIMER_TO_BREAK}]`)
            return {
                ...state,
                timer: state.breakLength * 60,
                sessionType: "Break"
            }
        case actions.CHANGE_TIMER_TO_SESSION:
            console.log(`[${actions.CHANGE_TIMER_TO_SESSION}]`)

            return {
                ...state,
                timer: state.sessionLength * 60,
                sessionType: "Session"
            }
        case actions.UPDATE_TIMER:
            return {
                ...state,
                timer: state.sessionLength * 60
            }
        case actions.SET_INTERVAL_ID:
            return {
                ...state,
                intervalID: action.payload
            }
        default:
            return state
    }
}