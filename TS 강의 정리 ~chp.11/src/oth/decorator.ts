/* 데코레이터 */
// 클래스나 메서드, 프로퍼티, 또는 매개변수에 기능을 추가하거나 수정할 수 있는 특수한 함수
// 데코레이터를 사용하면 코드의 특정 부분을 수정하지 않고도 기능을 확장 가능
// 데코레이터 사용시 tsconfig.json에서 "experimentalDecorators": true 로 설정

// 데코레이터는 함수로 작성함 -> 함수명 첫글자 대문자인게 좋음
function Logger(constructor: Function) {
  console.log("Logging...");
  console.log(constructor);
}

@Logger // @ 기호 -> 데코레이터 사용
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);

/* decorator 팩토리 */
// 추가 공부 필요

function LoggerFac(logString: string) {
  console.log("LOGGER FACTORY");
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

@LoggerFac("LOGGING - PERSON")
class PersonSec {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const persec = new PersonSec();

console.log(persec);

/* ------------------------ */

// 데코레이터의 실행 순서

function LoggerOth(logString: string) {
  console.log("LOGGER FACTORY"); // -> 1번째 실행
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("Template FACTORY"); // -> 2번째 실행
  return function (constructor: any) {
    console.log("Rendering templete");
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

@LoggerOth("LOGGING") // -> LoggerOth 함수 1번째 실행
@WithTemplate("<h1>My Person Object</h1>", "app") // -> WithTemplate 함수 2번째 실행
class PersonThr {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}
// 위 데코레이터는 상향식으로 진행 따라서 WithTemplate constructor 먼저 실행
// 그 다음 LoggerOth constructor 실행

const perthr = new PersonThr();

console.log(perthr);

/* --------------------------------- */
// 속성 데코레이터

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("Invalid input, please try again!");
    return;
  }
  console.log(createdCourse);
});
