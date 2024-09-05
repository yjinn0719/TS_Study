/* 제네릭 */
// 제네릭은 함수나 클래스, 인터페이스, 또는 타입을 작성할 때 타입을 매개변수로 사용할 수 있도록 해주는 기능

// 여기서 Array가 바로 제네릭 타입!
const names: Array<string> = []; // string[]
// names[0].split(' ');

const promise: Promise<number> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 2000);
});

promise.then((data) => {
  // data.split(' ');
});

/* 제네릭 함수 생성하기 */
// 제네릭은 타입을 미리 특정해 놓는 것이 아닌 동적으로 타입을 설정

// 두 매개변수가 서로 다른 타입일 수 있다고 말해줌
// function merge<T, U>(objA: T, objB: U) { // -> 타입 T와 U가 객체여야 하는데 명시가 되어있지 않음
function merge<T extends object, U extends object>(objA: T, objB: U) {
  // T타입은 어떤 구조의 객체여도 되지만 어쨋든 객체여야 한다는 한계 설정 (제약조건: extends 사용)
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "MAX", hoobies: ["Sports"] }, { age: 30 });
console.log(mergedObj);

/* */
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  // -> 튜플로 첫번째 타입은 T, 두번째는 문자열임을 명시
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    // -> interface로 length의 타입을 지정해줘야함
    // 왜? element: T 안에 length가 있는지 확신할수 없기 때문
    descriptionText = "Got 1 element.";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements.";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(["Sports", "Cooking"]));

/* keyof */

// function wrongExtractAndConvert(obj: object, key: string) {
//   return "Value: " + obj[key];
// }

// wrongExtractAndConvert({}, "name"); // 호출은 가능 but obj에 key가 존재하는지 보장 불가

// T는 object라는 제약조건을 달고 U는 T의 key라는 제약 조건을 건다
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

extractAndConvert({ name: "kyj" }, "name");

/* 제네릭 클래스 */

class DataStorage<T extends string | number | boolean> {
  //원시타입으로 제약조건 걸어줌
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1); // -1
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const maxObj = {name: 'Max'};
// objStorage.addItem(maxObj);
// objStorage.addItem({name: 'Manu'});
// // ...
// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());

/* 제네릭 유틸리티 타입 */

// Partial 타입
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

// Readonly 타입
const otherName: Readonly<string[]> = ["Max", "Anna"]; // otherName을 수정하고 싶지 않을때 사용
// otherName.push("Manu");
// otherName.pop();

/* 제네릭과 유니언의 차이 */

class genericDataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1); // -1
  }

  getItems() {
    return [...this.data];
  }
}

//vs

class unionDataStorage {
  private data: (string | number | boolean)[] = [];

  addItem(item: string | number | boolean) {
    this.data.push(item);
  }

  removeItem(item: string | number | boolean) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1); // -1
  }

  getItems() {
    return [...this.data];
  }
}

// 제네릭에선 문자열배열인지 숫자배열인지 불린배열인지가 확실하지만
// 유니언에선 배열안에 문자열, 숫자, 불린이 다 들어올수 있다는 의미가 된다
