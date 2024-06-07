import { InputHTMLAttributes, LabelHTMLAttributes } from "react"

const Input = ({...props}:InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input {...props} />
    )
}

export default Input;