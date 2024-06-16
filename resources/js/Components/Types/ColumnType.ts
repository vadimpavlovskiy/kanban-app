import { Task } from "./TaskType";
import { User } from "./UserType";

export type ColumnProps = {
    column: Column;
    tasks: Task[];
    deleteColumn: (id: string | number) => void;
};

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
    auth: {
        user: {
            email: string;
            id: number;
            first_name?: string;
            second_name?: string;
        };
    };
};

export type PageProps = {
    errors: Record<string, string>;
    auth: {
        user: {
            email: string;
            id: number;
            first_name?: string;
            second_name?: string;
        };
    };
};
