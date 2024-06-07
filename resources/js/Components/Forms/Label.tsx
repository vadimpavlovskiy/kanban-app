import { LabelHTMLAttributes } from "react"

const Label = ({children, ...props}:LabelHTMLAttributes<HTMLLabelElement>) => {
    return (
        <label {...props}>{children}</label>
    )
}

export default Label;