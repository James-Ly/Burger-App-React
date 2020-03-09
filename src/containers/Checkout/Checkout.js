import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary.js'
import ContactData from '../Checkout/ContactData/ContactData.js'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/order.js'

class Checkout extends Component {

    onCheckoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    onCheckoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null
            summary = <div>
                {purchasedRedirect}
                <CheckoutSummary ingredients={this.props.ings}
                    checkoutCancelled={this.onCheckoutCancelledHandler}
                    checkoutContinue={this.onCheckoutContinueHandler} />
                <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData ingredients={this.props.ings} price={this.props.price} {...props} />)} />
            </div>
        }
        return (
            <div style={{ width: '100%', margin: 'auto' }}>
                {summary}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)