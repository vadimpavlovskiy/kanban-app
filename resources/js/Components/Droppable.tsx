import { useDroppable } from "@dnd-kit/core";

export function Droppable(props) {
    const {isOver, setNodeRef} = useDroppable({
      id: props.id,
    });
    const style = {
      opacity: isOver ? 1 : 0.5,
    };
  
    return (
      <div className="bg-blue-400 p-20" ref={setNodeRef} style={style}>
        {props.children}
      </div>
    );
  }
  