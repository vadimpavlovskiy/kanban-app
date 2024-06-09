export type ColumnProps = {
    column: Column;
    deleteColumn: (id: string | number) => void;
};

export interface Task {
    id: number;
    column_id: number;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
}

export interface Column {
    id: string | number;
    title: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    tasks: Task[];
}

export interface Data {
    id: number;
    title: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    tasks: Task[];
}

export type DashboardPageProps = {
    columnsData: Column[];
    auth: any;
};

export type PageProps = {
    errors: Record<string, string>;
    // Add other common properties from usePage().props
    // For example, if you have more properties in your props, define them here.
};
