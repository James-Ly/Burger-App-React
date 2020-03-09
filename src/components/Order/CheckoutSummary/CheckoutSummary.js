import React from 'react'
import Burger from '../../Burger/Burger.js'
import Button from '../../UI/Button/Button.js'
import styles from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {

    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{ width: '100%',margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <div>
                <Button btnType='Danger' clicked={props.checkoutCancelled}>CANCEL</Button>
                <Button btnType='Success' clicked={props.checkoutContinue}>CONTINUE</Button>
            </div>

        </div>
    )
}

export default checkoutSummary