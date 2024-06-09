import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import Label from '../Forms/Label'
import Input from '../Forms/Input'
import { Task } from '../Types/TaskType'
import { useForm } from '@inertiajs/react'
import { formatDateToDatetimeLocal } from '@/utils/formatDate'
import Button from '../Forms/Button'
export const KanbanEditTaskModal = ({isOpen, setOpen, task}:{isOpen:boolean, setOpen: Dispatch<SetStateAction<boolean>>, task:Task}) => {
    const { data, setData, post, processing, errors } = useForm({
        title: task.title,
        body: task.body,
        updated_at: task.updated_at
      })
      useEffect(() => {
        return () => {
            setData('title', task.title)
            setData('body', task.body)
            setData('updated_at', task.updated_at)
        }
      }, [isOpen])
      console.dir(task)
    return (
    <Transition show={isOpen}>
    <Dialog className="relative z-10" onClose={setOpen}>
      <TransitionChild
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel className="relative flex flex-col transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all p-10 sm:my-8 sm:w-full sm:max-w-lg">
             <DialogTitle className={'font-bold text-2xl'}>
                Edit Task
             </DialogTitle>
             <form className='flex flex-col gap-y-2 mt-6 bg-gray-100 p-6 rounded-xl'>
                <Label className={"text-lg font-medium"} htmlFor="title">Task Title</Label>
                <Input className="rounded-xl text-black bg-blue-100 duration-500 py-3 border-blue-200 focus:bg-blue-500 focus:text-white" type="text" id="title" defaultValue={task.title} onChange={
                    (e)=>setData('title', e.target.value)} />
                <Label className={"text-lg font-medium"} htmlFor="body">Task Text</Label>
                <textarea className="rounded-xl min-h-[400px] text-black bg-blue-100 duration-500 py-3 border-blue-200 focus:bg-blue-500 focus:text-white " id="body" value={task.body} onChange={
                    (e)=>setData('body', e.target.value)} />
                <Label className={"text-lg font-medium"} htmlFor="updated_at">Task Updated At:</Label>
                <p className='text-sm italic text-gray-500 font-thin'>Time of task updating is automatic by a system</p>
                <Input disabled className="rounded-xl transition-all italic text-xs text-black bg-blue-100 duration-500 py-3 border-blue-200 focus:bg-blue-500 focus:text-white disabled:bg-gray-300" type="datetime-local" id="updated_at" value={formatDateToDatetimeLocal(new Date())} onChange={
                    (e)=>setData('updated_at', String(new Date().getTime()))} />
                    <div className='flex mt-3 justify-end gap-x-3'>
                        <Button className='bg-red-400 hover:bg-transparent hover:text-black hover:bg-red-200'  onClick={()=>setOpen(false)}>Dismiss</Button>
                        <Button type="submit">Apply Changes</Button>
                    </div>
             </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </Transition>
  )
}
