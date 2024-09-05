// third party libraries
// 웹 개발할때 주로 서드파티라이브러리 사용

// @types 를 붙여주면 TS를 지원하지 않는 패키지에서도 타입 사용 가능
import _ from "lodash"; //lodash는 js -> npm install --save-dev @types/lodash 설치 하면 해결

declare var GLOBAL: string; // TS에게 'window' 객체의 특정 속성이 있다고 알림

console.log(_.shuffle([1, 2, 3]));

console.log(GLOBAL);
