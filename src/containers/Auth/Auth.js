import React, { Component } from 'react'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import styles from './Auth.module.css'

import * as actions from '../../store/actions/auth.js'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'

import { updateObject, checkValidity } from '../../shared/utility.js'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: false
    }

    componentDidMount = () => {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath()
        }
    }

    inputChangedHandler = (inputIdx, event) => {
        const updatedAuthForm = updateObject(this.state.controls, {
            [inputIdx]: updateObject(this.state.controls[inputIdx],
                {
                    ...this.state.controls[inputIdx],
                    value: event.target.value,
                    valid: this.checkValidadity(event.target.value, this.state.controls[inputIdx].validation),
                    touched: true
                })
        })

        let formIsValid = true;
        for (let inputIdentifiers in updatedAuthForm) {
            formIsValid = updatedAuthForm[inputIdentifiers].valid && formIsValid
        }
        this.setState({ orderForm: updatedAuthForm, formIsValid: formIsValid })

    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
    }

    inputChangedHandler = (controlName, event) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({
            controls: updatedControls
        })
    }

    render() {
        const formElementsArray = []
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map((formElement => {
            return <Input inputType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={this.inputChangedHandler.bind(this, formElement.id)} />

        }))

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (<p>{this.props.error.message}</p>)
        }
        let authRedirect = null
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={styles.Auth}>
                {authRedirect}
                {errorMessage}
                <form>
                    {form}
                    <Button btnType='Success' clicked={this.submitHandler} >{this.state.isSignup ? 'REGISTER' : 'LOGIN'}</Button>
                </form>
                <Button btnType='Danger' clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)