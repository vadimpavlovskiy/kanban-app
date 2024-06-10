import { PlusButton } from '@/Buttons/PlusButton'
import React, { useEffect, useMemo, useState } from 'react'
import { Column, DashboardPageProps, PageProps } from '../Types/ColumnType';
import { KanbanColumn } from './KanbanColumn';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { usePage } from '@inertiajs/react';
import { KanbanCreateColumn } from './KanbanCreateColumn';

export default function KandanBoard() {
    const pageProps = usePage().props as PageProps & Partial<DashboardPageProps>;
    const [columns, setColumns] = useState<Column[]>(pageProps.columnsData);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
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
    }
    function onDragEnd(event: DragEndEvent) {
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
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <div className='m-auto flex gap-4'>
                <div className='flex gap-4'>
                    <SortableContext items={columns.map((col:Column)=>col.id)}>
                        {columns.map(column => (
                            <KanbanColumn key={column.id} deleteColumn={deleteColumn} column={column} />
                        ))}
                    </SortableContext>
                </div>
                <KanbanCreateColumn />
            </div>
            {createPortal(    
            <DragOverlay>
               {activeColumn ? (
              <KanbanColumn column={activeColumn} deleteColumn={deleteColumn} />
            ) : null}
            </DragOverlay>, document.body
            )}
        </DndContext>
    </div>
  )
}
