import * as actionTypes from './actionTypes.js'
import fetch from 'node-fetch'
import * as config from '../../config.js'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId,
    }
}

const checkStatus = async (res) => {
    if (res.ok) {
        return res.json()
    } else {
        const myError = await res.json()
        throw myError.error
    }
}

export const authFailed = (error) => {
    // console.log('authFailed', error)
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + config.APIKEY
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + config.APIKEY
        }
        console.log(url)
        fetch(url,
            {
                method: 'post',
                body: JSON.stringify(authData),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                return checkStatus(res)
            }).then((json) => {
                const expirationDate = new Date(new Date().getTime() + json.expiresIn * 1000)
                localStorage.setItem('token', json.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', json.localId)
                dispatch(authSuccess(json.idToken, json.localId))
                dispatch(checkAuthTimeout(json.expiresIn))
            }).catch((error) => {
                dispatch(authFailed(error))
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate < new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}