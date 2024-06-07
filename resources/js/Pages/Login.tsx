import Button from "@/Components/Forms/Button";
import Input from "@/Components/Forms/Input";
import Label from "@/Components/Forms/Label";
import Header from "@/Layouts/Header";
import { router } from "@inertiajs/react";
import { useState } from "react";

const Login = () => {
    const [values, setValues] = useState({
        email: "",
        password: ""
      })

      function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
      }

      function handleSubmit(e) {
        e.preventDefault()
        router.post('/users', values)
      }
    
    
    return (
        <main className="w-full">
            <Header />
            <div className="mt-6 w-full flex justify-center">
            <form className="flex flex-col w-1/2 p-12 bg-gray-100 rounded-xl" onSubmit={handleSubmit}>
                <h2 className="text-2xl text-center font-bold">Login</h2>
                <div className="mt-4 flex flex-col gap-y-4">
                  <Label className={"text-xl font-medium"} htmlFor="email">Email</Label>
                  <Input className="rounded-xl text-white bg-blue-100 duration-500 py-3 border-blue-200 focus:bg-blue-500" type="email" id="email" value={values.email} onChange={handleChange} />
                  <Label className="text-xl font-medium" htmlFor="email">Password:</Label>
                  <Input required className="rounded-xl text-white bg-blue-100 duration-500 py-3 border-blue-200 focus:bg-blue-500" type="password" id="password" value={values.password} onChange={handleChange} />
                  <Button disabled={(values.email === '' || values.password === '') ? true : false} type="submit">Submit</Button>
                </div>
    </form>
            </div>
        </main>
    )
}

export default Login;