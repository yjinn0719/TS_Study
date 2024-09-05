import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { Product } from "./product.model";

// 백엔드에서 가져온 데이터
const products = [
  { title: "A Carpet", price: 29.99 },
  { title: "A Book", price: 10.99 },
];

const newProd = new Product("", -5.99);
// validate가 유효성 검사 실행
validate(newProd).then((errors) => {
  if (errors.length > 0) {
    console.log("VALIDATION ERRORS!");
    console.log(errors);
  } else {
    console.log(newProd.getInformation());
  }
});

// const p1 = new Product('A Book', 12.99);

// 백엔드에서 가져온 객체를 직접 변환하는 방법
// const loadedProducts = products.map(prod => {
//   return new Product(prod.title, prod.price);
// });

// 첫번째 인수 Product -> 변환하려는 클래스
// 두번째 인수 products -> 변환하려는 데이터
const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}
