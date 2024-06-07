import { ButtonHTMLAttributes, LabelHTMLAttributes } from "react"

const Button = ({children, ...props}:ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button className={`${props.className} ${"bg-blue-500 w-1/4 rounded-2xl p-2 duration-500 text-white hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-200"} || ''}`.trim()} {...props}>{children}</button>
    )
}

export default Button;