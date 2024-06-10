import { PlusButton } from '@/Buttons/PlusButton'
import React, { FormEvent } from 'react'
import Button from '../Forms/Button'
import { useForm } from '@inertiajs/react'

export const KanbanCreateColumn = () => {
    const {post} = useForm();
    const handleSubmitCreate = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/columns/create/');
    }
        return (
            <form onSubmit={handleSubmitCreate} className='bg-gray-200 w-[350px] h-[500px] max-h-[500px] rounded-lg flex flex-col justify-center items-center group duration-700 hover:bg-gray-300'>
                <Button type='submit' className='text-black bg-gray-300 flex flex-col align-middle items-center justify-center cursor-pointer rounded-full bottom-2 border-black p-4 gap-2 duration-700 hover:bg-gray-400'>
                        <PlusButton />
                <p>Add Column</p>
                </Button>
            </form>
        )
}
