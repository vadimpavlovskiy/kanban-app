import Button from "@/Components/Forms/Button";
import Input from "@/Components/Forms/Input";
import Label from "@/Components/Forms/Label";
import Header from "@/Layouts/Header";
import { router, useForm } from "@inertiajs/react";
import { ChangeEvent, useState } from "react";

const Login = () => {
      const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        second_name: '',
        email: '',
        password: '',
        password_confirmation: ''
      })
      
      function submit(e) {
        e.preventDefault()
        post('/signup')
      }      
    
      const hasEmptyFields = Object.values(data).some(value => value.trim() === '');

    
    return (
        <main className="w-full">
            <Header />
            <div className="mt-6 w-full flex justify-center">
            <form className="flex flex-col w-1/2 p-12 bg-gray-100 rounded-xl" onSubmit={submit}>
                <h2 className="text-2xl text-center font-bold">Registration</h2>
                <div className="mt-4 flex flex-col gap-y-4">
                  <Label className={"text-xl font-medium"} htmlFor="first_name">First Name</Label>
                  <Input 
                  className="rounded-xl text-white bg-blue-100 duration-500 py-3 border-blue-200 focus:bg-blue-500" 
                  required 
                  type="text" 
                  id="first_name" 
                  value={data.first_name} 
                  onChange={e=> setData('first_name', e.target.value)} 
                  />
                  <Label className={"text-xl font-medium"} htmlFor="second_name">Second Name</Label>
                  <Input required className="rounded-xl text-white bg-blue-100 duration-500 py-3 border-blue-200 focus:bg-blue-500" type="text" id="second_name" value={data.second_name} onChange={e=> setData('second_name', e.target.value)}  />
                  <Label className={"text-xl font-medium"} htmlFor="email">Email</Label>
                  <Input required className="rounded-xl text-white bg-blue-100 duration-500 py-3 border-blue-200 focus:bg-blue-500" type="email" id="email" value={data.email} onChange={e=> setData('email', e.target.value)} />
                  <Label className="text-xl font-medium" htmlFor="password">Password:</Label>
                  <Input required className="rounded-xl text-white bg-blue-100 duration-500 py-3 border-blue-200 focus:bg-blue-500" type="password" id="password" value={data.password} onChange={e=> setData('password', e.target.value)} />
                  <Label className="text-xl font-medium" htmlFor="confirmed_password">Password Confirmation:</Label>
                  <Input required className="rounded-xl text-white bg-blue-100 duration-500 py-3 border-blue-200 focus:bg-blue-500" type="password" id="password" value={data.password_confirmation} onChange={e=> setData('password_confirmation', e.target.value)} />
                  <Button disabled={hasEmptyFields ? true : false} type="submit">Submit</Button>
                </div>
             </form>
            </div>
        </main>
    )
}

export default Login;