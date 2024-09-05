/* 인터섹션 타입 */

type /* interface */ Admin = {
  name: string;
  privileges: string[];
};

type /* interface */ Employee = {
  name: string;
  startDate: Date;
};

// 교차 타입
// 여러가지 타입을 결합하여 하나의 단일 타입으로 만들 수 있는 타입
type ElevatedEmployee = Admin & Employee;

// 교차 타입은 인터페이스 상속과 비슷함
// interface ElevatedEmployee extends Employee, Admin {}

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

// 객체 타입을 조합 시킬 수 있지만 꼭 객체일 필요는 없음

// type Combinable = string | number;
// type Numberic = number | boolean;

// // 교차되는 타입이 number 이므로 타입을 number로 판단
// type Universal = Combinable & Numberic;

// 유니언 타입 교차 -> 공통적인 타입이 교차
// 객체 타입 교차 -> 객체 속성 모두 조합하여 나옴

/* 타입 가드 */

// function add(a: Combinable, b: Combinable) {
//   if (typeof a === "string" || typeof b === "string") {
//     // -> 타입 가드 (typeof를 사용)
//     // 변수가 특정 타입인지 확인하는 방법
//     // 코드 실행 중에 변수의 타입을 좁히고, 그 타입에 맞는 속성이나 메서드에 안전하게 접근할 수 있도록 도와줌
//     return a.toString() + b.toString;
//   }
//   return a + b;
// }

type unknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: unknownEmployee) {
  console.log("Name: " + emp.name);
  // type 자체를 만들어 준 곳에서는 typeof 와 같은 타입 가드를 사용할 수 없음
  // 따라서 자바스크립드의 'in'을 사용하여 검사
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("StartDate: " + emp.startDate);
  }
}
printEmployeeInformation(e1);

/*  */
class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }
  loadCargo(amount: number) {
    console.log("Loading cargo..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // loadCargo도 마찬가지로 Truck에만 존재하기때문에 in 으로 검사 후 사용
  // if ("loadCargo" in vehicle) {

  // instanceof도 js에서 제공하는 연산자
  // instanceof는 js에서 제공하는 연산자이기에 class라면 사용이 가능
  // but! interface 같이 ts 문법에선 사용 불가
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

/* 구별된 유니언 */

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

// 겹치는 속성이 없을 때 -> 공통된 속성을 만들어줌 (type)

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log("Moving at speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

/* 형 변환 */
// 타입스크립트는 HTML을 보거나 분석하지 않음
// 따라서 HTML의 타입을 명시해줌

// const userInputElement = <HTMLInputElement>(
//   document.getElementById("user-input")!
// );

const userInputElement = document.getElementById(
  "user-input"
)! as HTMLInputElement;
// ! -> 앞에 있는 것이 절대 null이 아닐거라는 걸 명시

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = "Hi there!";
}

/* 인덱스 타입 */

//유연하게 사용하고 싶을 때 사용
interface ErrorContainer {
  // [prop: string]: string;
  // 키값도 string, 속성도 string
  // [prop: number]: string; //-> 오류 발생: 키값은 number로 설정해주어야함
}

const errorBag: ErrorContainer = {
  email: "Not a valid email!",
  username: "Must start with a capital character!",
};

/* 함수 오버라이딩 */

type Combinable = string | number;
type Numberic = number | boolean;

type Universal = Combinable & Numberic;

function add(a: number, b: number): number; // add를 호출할때 a,b가 둘다 number 이면 타입 number
function add(a: string, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    // -> 타입 가드 (typeof를 사용)
    return a.toString() + b.toString;
  }
  return a + b;
}

const result = add("Max", "kyj");
result.split("");

/* 선택적 체이닝 */
// ts가 어떤 파일에 정보(데이터)를 가져올지 모를 때

const fetchedUserData = {
  id: "u1",
  name: "Max",
  job: { title: "CEO", description: "My own company" },
};

console.log(fetchedUserData?.job?.title); // -> ?: 정의가 되었는지 여부가 불확실한 대상 뒤에 씀

/* null 병합 */
const userInput = undefined;

const storedData = userInput ?? "DEFAULT"; // -> ??: 이 값이 진짜 null이거나 undefined라면 뒤에 있는 풀백 값을 사용해라

console.log(storedData);
