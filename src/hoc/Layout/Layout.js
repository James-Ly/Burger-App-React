import React, { Component } from 'react'
import styles from './Layout.module.css'
import Aux from '../Aux/Aux.js'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar.js'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer.js'
import { connect } from 'react-redux'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {
        return <Aux>
            <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler} />
            <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
            <main className={styles.Content}>
                {this.props.children}
            </main>
        </Aux>
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
}

export default connect(mapStateToProps, null)(Layout)