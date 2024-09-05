/* 클래스 & 인스턴스 */
// 클래스는 객체가 가지는 프로퍼티나 메서드 등의 구조를 정의
// 클래스를 기반으로 생성된 객체 -> 인스턴스

//추상 클래스
/* abstract */ class Department {
  // private name: string; // 클래스의 필드
  // private employees: string[] = []; // private 클래스 또는 생성된 객체 안에서만 사용가능 -> 접근 제한자
  protected employees: string[] = []; // 상속받은 클래스에서도 사용 가능
  // constructor 로직을 통해 프로퍼티 추가
  constructor(private readonly id: string, private name: string) {
    //readonly: 읽기 전용 속성
    // 위 private name 대신 약식으로 가능
    // this.name = n;
  }

  // 클래스를 인스턴스화하지 않고 정적 메서드로 사용하려면 static 키워드 사용
  // 정적 메서드는 일반 인스턴스 안에서 호출할 수 없음
  // 즉 정적 메서드는 클래스 기반으로 생성된 객체가 아니라 클래스에서 직접 호출하는 메서드를 말함
  static createEmployee(name: string) {
    return { name: name };
  }

  // describe 메서드
  describe(this: Department) {
    // Department를 참조함, 이와 같이 작성 -> 타입 안정성 올라감
    console.log("Department: " + name); // 이 식에서 name은 6번째 줄의 name이 아니라 클래스 외부의 전역 변수 name 사용
    console.log(`Department (${this.id}): (${this.name})`); // 클래스 안의 변수를 사용하려면 this 키워드 사용
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

/* 상속 */

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  // 게터: 값을 가져오기 위해 함수나 메서드를 실행하는 프로퍼티 (get 키워드 사용)
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report Found!");
  }

  // 세터: set 키워드 사용
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please Pass");
    }
    this.addReport(value);
  }

  // 싱글톤 패턴: 하나의 클래스에 하나의 인스턴스만 갖게하는 패턴 (private 키워드 사용)
  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  addEmployee(name: string) {
    if (name === "MAX") {
      return;
    }
    this.employees.push(name); // employees가 private일때는 상속 불가능 했으나 protected로 변경 후 상속 가능
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReport() {
    console.log(this.reports);
  }
}

const accouting = new Department("d1", "Accounting");

accouting.addEmployee("MAX");
accouting.addEmployee("MANU");
// accouting.employees[2] = "Anna"; // employees는 private이기때문에 클래스 밖에서 사용 불가

console.log(accouting);
accouting.describe();
accouting.printEmployeeInformation();

const it = new ITDepartment("d1", ["MAX"]);

// Math는 클래스 자체에서 엑세스 하는 프로퍼티와 메서드임
// Math.pow();

it.addEmployee("MAX");
it.addEmployee("MANU");

console.log(it);

// const exAccouting = new AccountingDepartment("d2", []);

// console.log(exAccouting.mostRecentReport);
// exAccouting.mostRecentReport = "";
// exAccouting.addReport("Something went wrong");
