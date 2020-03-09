import React from 'react'
import styles from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem.js'

const navigationItems = (props) => {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/" active>BurgerBuilder</NavigationItem>
            {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
            {!props.isAuthenticated
                ? <NavigationItem link="/auth">Authentication</NavigationItem>
                : <NavigationItem link="/logout">Logout</NavigationItem>}
            {/* <NavigationItem link="/checkout">Checkout</NavigationItem> */}
        </ul>
    )
}

export default navigationItems