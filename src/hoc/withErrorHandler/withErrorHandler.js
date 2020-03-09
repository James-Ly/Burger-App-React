import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal.js'
import Aux from '../Aux/Aux.js'

const withErrorHandler = (WrappedComponent, fetch) => {
    return class extends Component {
        state = {
            error: null
        }

        // componentDidMount() {
        // }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}
                        clicked={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />

                </Aux >
            )
        }
    }
}

export default withErrorHandler