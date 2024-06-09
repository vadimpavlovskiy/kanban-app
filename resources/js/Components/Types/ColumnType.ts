export type ColumnProps = {
    column: Column;
    deleteColumn: (id: string | number) => void;
};

export type Column = {
    id: string | number;
    title: string;
};
