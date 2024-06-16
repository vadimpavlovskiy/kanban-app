import { Fragment, useState } from 'react'
import React from 'react'
import { KanbanEditTaskModal } from './KanbanEditTaskModal'
import { Task } from '../Types/TaskType'
import {CSS} from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable'

export const KanbanTask = ({task}:{task:Task}) => {
    const [open, setOpen] = useState(false);
    const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
      id: task.id,
      data: {
          type: "Task",
          task
      }
  })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
}
if(isDragging) {
  return <div className='p-3 bg-gray-300 rounded-lg cursor-pointer duration-300 border-2 border-red-500 opacity-30 hover:bg-blue-200' ref={setNodeRef} style={style} />
}
  return (
    <>
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={()=>setOpen(true)} className=' bg-gray-300 rounded-lg cursor-pointer duration-300 hover:bg-blue-200'>
        <p className='text-sm font-semibold'>{task.title}</p>
        </div>
        <KanbanEditTaskModal task={task} isOpen={open} setOpen={setOpen} />
    </>
  )
}