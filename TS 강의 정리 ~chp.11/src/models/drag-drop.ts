// module
// splitting Code into Multiple Flies
/* 
  1. 네임 스페이스 & 파일 번들링 
  네임 스페이스는 구문 기능을 제공할 수 있는 타입
  코드에 특수 코드를 추가하면 이 기능을 사용할 수 있음
*/

// namespace 키워드 사용
// namespace DDInterface {
// 아래의 interface들은 namespace안에서만 사용 가능
// 이 문제를 해결하기 위해 export 키워드를 사용해 내보내줌
export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}
// }

// 2. ES6 Imports & Exports

// 네임스페이스와 ES 모듈 중에서 ES 모듈이 더 좋음
// 타입 안전성이 강화되고 모든 파일이 네임스페이스에 필요한 요건을 구체적으로 명시하도록 만들 수 있기 때문
