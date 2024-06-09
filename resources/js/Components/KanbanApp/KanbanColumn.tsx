import React, { useState } from 'react'
import { Column, ColumnProps } from '../Types/ColumnType'
import { DeleteButton } from '@/Buttons/DeleteButton';
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export const KanbanColumn = (props: ColumnProps) => {
    const {column, deleteColumn} = props;
    const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column
        }
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    if(isDragging) {
        return ( <div ref={setNodeRef} style={style} className='bg-gray-200 w-[350px] h-[500px] max-h-[500px] rounded-lg border-2 border-rose-300 opacity-40 flex flex-col'>
            </div>)
    }
    return (
        <div ref={setNodeRef} style={style} className='bg-gray-200 w-[350px] h-[500px] max-h-[500px] rounded-lg flex flex-col'>
            <div className='bg-gray-100 text-md h-[60px] cursor-grab rounded-md rounded-b-none  font-bold border-gray-300 border-b-2 p-4'>
                <div className='flex justify-between w-full' {...attributes} {...listeners}>
                <p>    
                    {column.title}
                </p>
                <button onClick={()=>deleteColumn(column.id)} className='cursor-pointer stroke-blue-500 hover:stroke-black rounded'>
                    <DeleteButton  />
                </button>
                </div>
            </div>
            <div className='flex flex-grow p-3'>
                Content
            </div>
        </div>
    )
}
