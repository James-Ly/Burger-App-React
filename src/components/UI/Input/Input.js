import React from 'react';
import styles from './Input.module.css'

const Input = (props) => {
    let inputElement = null
    const inputClasses = [styles.InputElement]
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(styles.Invalid)
    }

    switch (props.inputType) {
        case ('input'):
            inputElement = <input {...props.elementConfig}
                className={inputClasses.join(' ')}
                value={props.value} onChange={props.changed} />
            break
        case ('textarea'):
            inputElement = <textarea {...props.elementConfig}
                className={inputClasses.join(' ')}
                value={props.value} onChange={props.changed} />
            break
        case ('select'):
            inputElement = (
                <select
                    value={props.value}
                    {...props.elementConfig}
                    onChange={props.changed}
                    className={inputClasses.join(' ')} >
                    {props.elementConfig.options.map(option => {
                        return <option
                            key={option.value}
                            value={option.value}>
                            {option.displayValue}
                        </option>
                    })}
                </select>
            )
            break
        default:
            inputElement = <input
                onChange={props.changed}
                {...props.elementConfig}
                className={inputClasses.join(' ')}
                value={props.value} />

    }

    return (<div className={styles.Input}>
        <label className={styles.Label}>{props.label}</label>
        {inputElement}
    </div>)
}

export default Input