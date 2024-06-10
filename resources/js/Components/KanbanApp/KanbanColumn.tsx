import React, { FormEvent, useState } from 'react'
import { Column, ColumnProps } from '../Types/ColumnType'
import { DeleteButton } from '@/Buttons/DeleteButton';
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { KanbanTask } from './KanbanTask';
import { Task } from '../Types/TaskType';
import { useForm } from '@inertiajs/react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import { CompleteButton } from '@/Buttons/CompleteButton';
import { PlusButton } from '@/Buttons/PlusButton';

export const KanbanColumn = (props: ColumnProps) => {
    const {column, deleteColumn} = props;
    const [isEditing, setIsEditing] = useState(false)

    // Updating form
    const { data, setData, patch, post, delete:destroy, processing, errors } = useForm({
        title: column.title,
        id: column.id
      })

      const handleSubmitEdit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        patch(`/columns/${column.id}`);
        setIsEditing(false)
      }

      const handleSubmitCreate = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(`/columns/${column.id}/tasks`)
      }
      const handleSubmitDelete=(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        destroy(`/columns/${column.id}`);
      }
    // Hook for DND kit
    const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column
        }
    })

    // We need this style for a DND kit
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    // Adding back position to element
    if(isDragging) {
        return ( <div ref={setNodeRef} style={style} className='bg-blue-100 w-[350px] h-[500px] max-h-[500px] rounded-lg border-2 border-blue-200 opacity-40 flex flex-col'>
            </div>)
    }
    return (
        <div ref={setNodeRef} style={style} className='bg-gray-200 w-[350px] h-[500px] max-h-[500px] rounded-lg flex flex-col'>
            <div className='bg-gray-100 text-md h-[60px] cursor-grab rounded-md rounded-b-none font-bold border-gray-300 border-b-2 p-4'>
                <div className='flex justify-between items-center w-full' {...attributes} {...listeners}>
                    {
                        isEditing ?
                            <form className='flex h-6 items-center' onSubmit={handleSubmitEdit}>
                                <Input className='p-1 h-6 focus:text-white' defaultValue={data.title} onChange={(e)=>{setData('title', e.target.value)}} autoFocus />
                                <Button className='ml-2 rounded-full flex items-center p-1 ' type='submit'><CompleteButton /></Button>
                            </form>
                        :
                        <p onClick={()=>setIsEditing(true)}>    
                            {column.title}
                        </p>
                    }
                <div className='flex space-x-1 mb-1'>
                    <form onSubmit={handleSubmitCreate}>
                        <Button type='submit' className='cursor-pointer w-10 bg-transparent flex justify-center stroke-black rounded-full hover:stroke-white'>
                            <PlusButton />
                        </Button>
                    </form>
                    <form onSubmit={handleSubmitDelete}>
                        <Button type='submit' className='cursor-pointer w-10 bg-transparent flex justify-center stroke-black rounded-full hover:stroke-white'>
                            <DeleteButton  />
                        </Button>
                    </form>
                </div>
                </div>
            </div>
            <div className='flex flex-col gap-y-2 p-3 overflow-scroll'>
                {column.tasks.map((task:Task) => {
                    return (
                        <KanbanTask task={task} />
                    )
                })}
            </div>
        </div>
    )
}
