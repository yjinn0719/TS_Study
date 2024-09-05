import { IsNotEmpty, IsNumber, IsPositive } from "class-validator"; // decorator를 이 패키지를 이용해 사용할 수 있음

export class Product {
  @IsNotEmpty() // 라이브러리에서 불러온 데코레이터 팩토리
  title: string; // title은 빈 문자열이면 안됨
  @IsNumber()
  @IsPositive()
  price: number; // 숫자는 양수여야함

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }

  getInformation() {
    return [this.title, `$${this.price}`];
  }
}
