WebPack?

웹팩은 파일을 다 같이 번들링하는 도구
여러개의 파일로 코드를 분할해 HTTP 요청을 줄이도록 도와줌
코드 번들링이 import를 알아서 줄여줌

webpack.config.js와 webpack.config.prod.js의 차이점

1. webpack.config.js
개발 환경 주로 사용
보통 webpack.config.js는 개발 시 필요한 설정을 포함

2. webpack.config.prod.js
프로덕션 환경에서 주로 사용
webpack.config.prod.js는 애플리케이션의 최종 배포 시 필요한 설정을 포함
