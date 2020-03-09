import * as actionTypes from './actionTypes.js'
import fetch from 'node-fetch'

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        fetch('https://react-my-burger-acade.firebaseio.com/ingredients.json',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'JWT fefege...',
                    "Access-Control-Allow-Origin": "*",
                }
            }).then((res) => res.json())
            .then(json => {
                dispatch(setIngredients(json))
            }).catch(error => {
                dispatch(fetchIngredientsFailed())
            })
    }
}