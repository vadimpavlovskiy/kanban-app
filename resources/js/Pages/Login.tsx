import Button from "@/Components/Forms/Button";
import Input from "@/Components/Forms/Input";
import Label from "@/Components/Forms/Label";
import Header from "@/Layouts/Header";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";

const Login = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  })
  
  function handleSubmit(e) {
    e.preventDefault();
    post('/login');
  }      
    
  const hasEmptyFields = Object.values(data).some(value => value.trim() === '');
    return (
        <main className="w-full">
            <Header />
            <div className="mt-6 w-full flex justify-center">
            <form className="flex flex-col w-1/2 p-12 bg-gray-100 rounded-xl" onSubmit={handleSubmit}>
                <h2 className="text-2xl text-center font-bold">Login</h2>
                <div className="mt-4 flex flex-col gap-y-4">
                  <Label className={"text-xl font-medium"} htmlFor="email">Email</Label>
                  <Input type="email" id="email" value={data.email} onChange={e=> setData('email', e.target.value)} />
                  <Label className="text-xl font-medium" htmlFor="email">Password:</Label>
                  <Input required type="password" id="password" value={data.password} onChange={e=> setData('password', e.target.value)} />
                  {errors.email && <div className="text-red-400 text-sm font-bold">{errors.email}</div>}
                  <Button disabled={hasEmptyFields ? true : false} type="submit">Submit</Button>
                </div>
             </form>
            </div>
        </main>
    )
}

export default Login;