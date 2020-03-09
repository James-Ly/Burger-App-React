import * as actionTypes from './actionTypes';
import fetch from 'node-fetch'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        oderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart())
        fetch('https://react-my-burger-acade.firebaseio.com/orders.json?auth=' + token,
            {
                method: 'post',
                body: JSON.stringify(orderData),
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'JWT fefege...',
                    "Access-Control-Allow-Origin": "*",
                }
            }).then((res) => {
                return res.text()
            }).then((json) => {
                dispatch(purchaseBurgerSuccess(json.name, orderData))
            }).catch((error) => {
                dispatch(purchaseBurgerFail(error))
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSucess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId+'"'
        console.log(queryParams)
        fetch('https://react-my-burger-acade.firebaseio.com/orders.json' + queryParams,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'JWT fefege...',
                    "Access-Control-Allow-Origin": "*",
                }
            }).then((res) => {
                return res.text()
            }).then(json => {
                const fetchedOrders = []
                for (let key in JSON.parse(json)) {
                    fetchedOrders.push({ ...JSON.parse(json)[key], id: key })
                }
                dispatch(fetchOrdersSucess(fetchedOrders))

            })
            .catch((error) => {
                dispatch(fetchOrdersFail(error))
            })
    }
}