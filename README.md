# nemv_2020_01
node express mongo vue

## config 파일 세팅 방법

**config/index.js**
```javascript
module.exports = {
  dbUrl: 'mongodb://localhost:27017/nemv',
  admin: {
    id: 'admin',
    pwd: '1234',
    name: '관리자'
  }
};
```

이런 식으로 DB 연결 문자열을 작성해야 웹 서버가 정상적으로 구동됨