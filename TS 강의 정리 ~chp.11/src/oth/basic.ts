/* const, let, var */

const userName = "MAX";
// userName = "MAXXXX"
// const 변경 불가능 (즉, 재할당 불가)

let age = 30;
age = 29;

function addfun(a: number, b: number) {
  var result; // var는 함수범위에서 사용 가능 (함수 범위: 전역적으로 사용 가능)
  result = a + b;
  return result;
}

if (age > 20) {
  let isOld = true; // let은 블록 범위에서 사용 (블록 범위: 변수나 상수는 정의된 블록이나 그 하위 블록에서 사용 가능)
}

// var 보다 let을 선호
// 대표적인 이유로 var는 재할당이 되어 버그를 유발할 수 있지만 let은 재할당이 불가능하기 때문에 코드의 안전성이 올라감

/* 화살표 함수 */

const addArrow = (a: number, b: number) => {
  return a + b;
}; // 간결한게 장점

const arrowSimple = (a: number, b: number) => a + b; // 표현식이 하나면 더 간결하게 줄일 수 있음

console.log(addArrow(2, 5));

/* 기본값 함수 매개변수 */

const arrowBasic = (a: number, b: number = 1) => a + b; // 매개변수 b의 기본값을 1로 설정
console.log(arrowBasic(5)); // a 자리에 5 b 자리에 1 이므로 오류 x

const arrowBasicWrong = (a: number = 1, b: number) => a + b; // 맨 끝의 매개변수를 기본값으로 설정해야함 따라서 a를 기본 값으로 설정하면 오류 발생
// console.log(arrowBasicWrong(5)); // a의 기본값이 1인데 5가 들어가려고 하므로 오류

/* 스프레드 연산자(...) */

const hobbies = ["Sports", "Cooking"];
const activeHobbies = ["Hiking"];

activeHobbies.push(hobbies[0], hobbies[1]);
// 위 아래의 식은 의미가 같음
activeHobbies.push(...hobbies);
// 스프레드 연산자는 배열 자체를 추가하는게 아니라 위의 식처럼 개별 값을 추가하는 것

const person = {
  name: "Max",
  age: 30,
};

const copiedPerson1 = person;

const copiedPerson2 = { ...person };
// 첫번째 식처럼 전체를 복사해 오는 것은 잘못된 방법
// 스프레드 연산자를 이용해 키-값을 복사해야와야함

/* 나머지 매개변수 */

const addRest = (...numbers: number[]) => {};

const addNumbers = addRest(2, 3, 4.5, 10);
console.log(addNumbers);
