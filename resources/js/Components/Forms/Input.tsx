import classNames from "classnames";
import { InputHTMLAttributes, LabelHTMLAttributes } from "react"

const Input = ({className, ...props}:InputHTMLAttributes<HTMLInputElement>) => {
    const inputClass = classNames(
        'rounded-xl text-black bg-blue-100 duration-500 py-3 border-blue-200 focus:bg-blue-500 focus:text-white',
        className
    );
    return (
        <input className={inputClass} {...props} />
    )
}

export default Input;