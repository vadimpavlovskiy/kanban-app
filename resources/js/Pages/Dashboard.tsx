import Card from '@/Components/Card';
import { Droppable } from '@/Components/Droppable';
import KandanBoard from '@/Components/KanbanApp/KandanBoard';
import Header from '@/Layouts/Header';
import { DndContext } from '@dnd-kit/core';
import { Link, Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard() {
    const [parent, setParent] = useState(null);
    function handleDragEnd({over}) {
        setParent(over ? over.id : null);
      }
    
    return (
        <>
            <Head title="Dashboard" />
            <Header />
            <main className='w-full mt-6 flex flex-row gap-y-6'>
                <KandanBoard />
            </main>
        </>
    );
}
