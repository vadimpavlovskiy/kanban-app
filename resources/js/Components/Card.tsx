import { useDraggable, useDroppable } from '@dnd-kit/core';
import React from 'react'
import {CSS} from '@dnd-kit/utilities';


/**
 * Your Component
 */
export default function Card( {text, id}:{text:string, id:string} ) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div
    ref={setNodeRef} style={style} {...listeners} {...attributes}
    className='w-24 bg-white rounded-xl border border-blue-500 duration-500 hover:bg-blue-500 hover:text-white'>
      {text}
    </div>
  )
}