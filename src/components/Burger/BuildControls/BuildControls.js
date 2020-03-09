import React from 'react'
import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl.js'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const buildControls = (props) => {
    return (
        <div className={styles.BuildControls}>
            <p>Current Price: <string>{props.price.toFixed(2)}</string></p>
            {controls.map(ctrl => {
                return <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={props.ingredientAdded.bind(this, ctrl.type)}
                    removed={props.ingredientRemoved.bind(this, ctrl.type)}
                    disabled={props.disabled[ctrl.type]} />
            })}
            <button
                className={styles.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGNUP TO ORDER'}</button>
        </div>
    )
}

export default buildControls