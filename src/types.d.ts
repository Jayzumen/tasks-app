interface Task {
  id: string;
  title: string;
  done: boolean;
}

type TaskFilter = "all" | "todo" | "done";
