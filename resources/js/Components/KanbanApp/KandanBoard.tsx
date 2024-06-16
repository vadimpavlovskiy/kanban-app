import { PlusButton } from '@/Buttons/PlusButton'
import React, { useEffect, useMemo, useState } from 'react'
import { Column, DashboardPageProps, PageProps } from '../Types/ColumnType';
import { KanbanColumn } from './KanbanColumn';
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { usePage } from '@inertiajs/react';
import { KanbanCreateColumn } from './KanbanCreateColumn';
import { Task } from '../Types/TaskType';
import { KanbanTask } from './KanbanTask';

export default function KandanBoard() {
    const pageProps = usePage().props as PageProps & Partial<DashboardPageProps>;
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
    const [columns, setColumns] = useState<Column[]>(pageProps.columnsData);
    const [tasks, setTasks] = useState<Task[]>(pageProps.columnsData.map((col: Column) => col.tasks).flat());
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3
            }
        })
    )

    useEffect(() => {
        setColumns(pageProps.columnsData);
    }, [pageProps.columnsData]);

    function createNewColumn () {
        const columnAddColumn: Column = {
            id: `${columns.length + 1}`,
            title: `A new Column`,
            user_id: pageProps.auth.user.id,
            created_at: String(Date.now()),
            updated_at: String(Date.now()),
            tasks: []
        }
        setColumns([...columns, columnAddColumn])
    }
    function deleteColumn (id: string | number) {
        const filteredColumn = columns.filter((column:Column) => column.id !== id);
        setColumns(filteredColumn)
    }
    function onDragStart(event: DragStartEvent) {
        if(event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column)
        }
        if(event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task)
        }
    }
    function onDragOver(event: DragOverEvent) {

        // active – show a data about draggable task
        // over – show a position of moved task
        const { active, over } = event;
        if(!over) {
            return
        }

        const activeId = active.id
        const overId = over.id

        // activeId – show a id of draggable task
        // overId – show a id of moved task

        if(activeId === overId) {
            return
        } 

        // isActiveTask – show is active draggable component is task
        // isOverTask – – show is active overComponent component is task
        const isActiveTask = active.data.current.type === 'Task'
        const isOverTask = active.data.current.type === 'Task'

        if(!isActiveTask) return 
        if(isActiveTask && isOverTask) {
            setTasks((tasks)=> {
                const activeIndex = tasks.findIndex(item=>item.id === activeId)
                const overIndex = tasks.findIndex(item=>item.id === overId)

                if(activeIndex !== -1 && overIndex !== -1) {
                    if(tasks[activeIndex].column_id !== tasks[overIndex].column_id) {
                        tasks[activeIndex].column_id = tasks[overIndex].column_id
                        return arrayMove(tasks, activeIndex, overIndex-1)
                    }
                    return arrayMove(tasks, activeIndex, overIndex)
                }
                else {
                    return tasks;
                }
                
            })
            }
            const isOverAColumn = over.data.current?.type === "Column";

            if (isActiveTask && isOverAColumn) {
                setTasks((tasks)=> {
                    const activeIndex = tasks.findIndex((t) => t.id === activeId);
                    tasks[activeIndex].column_id = Number(overId);
                    return arrayMove(tasks, activeIndex, activeIndex);
            
                })
            }
        }
    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null);
        setActiveTask(null);
        const { active, over } = event;
        if(!over) {
            return
        }

        const activeColumnId = active.id
        const overColumnId = over.id

        if(activeColumnId === overColumnId) {
            return
        } 

        setColumns(columns => {
            const activeColumnIndex = columns.findIndex((col:Column)=> col.id === activeColumnId)

            const overColumnIndex = columns.findIndex((col:Column)=> col.id === overColumnId)

            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        })
      }
    
  return (
    <div className='m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-auto px-[40px]'>
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}>
            <div className='m-auto flex gap-4'>
                <div className='flex gap-4'>
                    <SortableContext items={columns.map((col:Column)=>col.id)}>
                        {columns.map((column, index) => (
                            <KanbanColumn tasks={tasks.filter(task=>task.column_id === column.id)} key={column.id} deleteColumn={deleteColumn} column={column} />
                        ))
                        }
                    </SortableContext>
                </div>
                <KanbanCreateColumn />
            </div>
            {createPortal(    
            <DragOverlay>
               {activeColumn ? (
              <KanbanColumn tasks={tasks} column={activeColumn} deleteColumn={deleteColumn} /> 
            ) : null}
            {activeTask && <KanbanTask task={activeTask} />}
            </DragOverlay>, document.body
            )}
        </DndContext>
    </div>
  )
}
