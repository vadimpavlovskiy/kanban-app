import classNames from "classnames";
import { ButtonHTMLAttributes, LabelHTMLAttributes } from "react"

const Button = ({children, className, ...props}:ButtonHTMLAttributes<HTMLButtonElement>) => {
    const buttonClass = classNames(
        'bg-blue-500 w-1/3 rounded-2xl p-2 duration-500 text-white hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-200',
        className
    );

    return (
        <button className={buttonClass} {...props}>{children}</button>
    )
}

export default Button;