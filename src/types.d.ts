interface Task {
  id: string;
  title: string;
  done: boolean;
  editing: boolean;
}

type TaskFilter = "all" | "todo" | "done";
