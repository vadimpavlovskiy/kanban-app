import { Fragment, useState } from 'react'
import React from 'react'
import { KanbanEditTaskModal } from './KanbanEditTaskModal'
import { Task } from '../Types/TaskType'

export const KanbanTask = ({task}:{task:Task}) => {
    const [open, setOpen] = useState(false)
  return (
    <>
        <div onClick={()=>setOpen(true)} className='p-3 bg-gray-300 rounded-lg cursor-pointer duration-300 hover:bg-blue-200'>
        <p className='text-sm font-semibold'>{task.title}</p>
        </div>
        <KanbanEditTaskModal task={task} isOpen={open} setOpen={setOpen} />
    </>
  )
}