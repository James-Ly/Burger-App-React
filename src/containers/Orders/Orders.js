import React, { Component } from 'react'
import Order from '../../components/Order/Order.js'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/order.js'
import Spinner from '../../components/UI/Spinner/Spinner.js'

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId)
    }

    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map((order) => {
                console.log(order)
                return (<Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />)
            })

        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)