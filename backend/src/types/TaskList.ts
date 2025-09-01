import { Timestamp } from "firebase-admin/firestore";
import { Task } from "./Task";

export interface TaskList {
    id: string;
    userId: string;
    name: string;

    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface TaskList_JOIN_Tasks extends TaskList {
  tasks: Task[];
}