// 인터페이스: 객체가 어떻게 구성되어야할지 정의 (interface 키워드 사용)
interface Person {
  // name: string = "MAX"; // 구조는 정의 가능하지만 값은 할당하지 X
  name: string;
  age: number;

  greet(pharse: string): void;
}

let user1: Person;

user1 = {
  name: "KYJ",
  age: 24,
  greet(pharse: string) {
    console.log(pharse + "" + this.name);
  },
};

user1.greet("Hi there I am");

/* ----------------------------------- */
interface Greetable {
  name: string;

  greet(pharse: string): void;
}

class Personable implements Greetable {
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  }
}

let user2: Greetable;
