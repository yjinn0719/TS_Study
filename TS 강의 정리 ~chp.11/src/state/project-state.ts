import { Project, ProjectStatus } from "../models/project.js";

// namespace DDInterface {
// Project State Management

type Listener<T> = (items: T[]) => void; // -> 이 파일 안에서만 사용하므로 내보내지 않아도 O

class State<T> {
  // -> 이 파일 안에서만 사용하므로 내보내지 않아도 O
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

export const projectState = ProjectState.getInstance(); // 상수를 export할때는 이 상수가 여러 파일에서 import 되고 있어도 한번만 import 됨 (파일이 최초로 import 될때)
// }
