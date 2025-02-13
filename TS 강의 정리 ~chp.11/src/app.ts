/*
// namespace 사용방법
/// <reference path="models/drag-drop.ts"/>
/// <reference path="models/project.ts"/>
/// <reference path="state/project-state.ts"/>
/// <reference path="util/validation.ts"/>
/// <reference path="decorators/autobind.ts"/>
/// <reference path="components/project-input.ts"/>
/// <reference path="components/project-list.ts"/>
*/

import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";

// namespace 사용방법
// namespace DDInterface {
new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
// }
