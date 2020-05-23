# express 웹 프레임워크를 사용한 서버 열기

### express 라우팅

```
const express = require('express')
const app = express()
//get : 해당 파일경로에 있는 서버로부터 메시지를 응답함(조회 기능)
app.get('파일경로', (req, res) => {
  res.send()
})
//listen : 포트번호와 리스닝이 성공했을 때 콜백 함수 실행
app.listen(port, function(){

})
```

### 기본 라우팅

> app.METHOD(path, handler)
> > - METHOD : http 요청 메소드로 get, post, put , delete
> > - path : 라우터 경로
> > - handler : 실행 될 콜백 함수

> :params : 라우터 파라미터, url에서 값을 얻을 수 있는 변수

**api 테스팅 도구 : postman**

### 미들 웨어

- http 요청 -- 미들웨어 --> 라우팅 --> 서버응답

```
const logger = function(req, res, next) {
  실행
  next()
}
// next는 다른 middleware를 실행하거나 routing 작업 실행 후 그 다음으로 넘기는 callback 함수

app.use(logger)
```

- morgan : 로깅 미들웨어로 좀 더 쉽고 상세하게 로깅 가능

```
  const morgan = require('morgan')
  app.use(morgan('dev'))
```

- body-parser : json 데이터 형식을 req해서 데이터 파싱하는 미들웨어
- 모듈의 github 페이지 이동 : cmd에 npm repo module-name 을 입력하면 맞는 이동한다

- 정적 파일 제공 : static -> html, img, css, js 이러한 파일들이 browser에 접근하도록 만듦
  app.use('/', express.static('public')) : /경로에 접근했을때 public 파일에 접근한다

## MONGO DB

- noSQL : not only sql, sql 기능 외의 기능을 담음
- 구성 : server > db > collection > document > { "key" : "value" }
- 한 문서({ ... })는 키와 밸류 값("key" : "value")으로 구성되어 있으며 안에 서브 콜렉션을 담을 수 있다.
  {
  "id" : 1,
  "name" : "홍길동",
  "gender" : "male",
  "tag" : [
  {
  "id" : "tag1",
  "sort" : "man"
  },
  {
  ...
  }
  ]
  }

### 사용법

1. 서버 실행 : mongod 입력
2. 클라이언트 실행 : mongo 입력
3. 데이터베이스 선택 : use db_name
4. 데이터베이스 삭제 : db.dropDatabase() // 미리 선택 되어 있어야 함

> _기본 명령어_
>
> > db 삭제 : db 선택 후 db.dropDatabase() 입력
> > collection 생성 : db.createCollection(name)
> > collection 제거 : db.collection_name.drop()
> > document 삽입 : db.collection_name.insert({ "key" : "value", ... })
> > document 제거 : db.collection_name.remove({ 조건 }, t ) // true이면 상위 1개만 삭제
> > collection 조회 : show collections
> > document 조회 : db.collection_name.find()
> > 특정 키값만 포함하는 document 조회 : db.collection_name.find({}, {"\_id": false, "key1": true, "key2": true})

> _비교 연산자_
>
> > ex) db.collection_name.find({key:"value"}, {\$eq: {key:"value"}})
> >
> > 1. \$eq : equals, 주어진 값과 일치
> > 2. \$gt : greater than, 주어진 값보다 큰 값
> > 3. \$gte : greater than equals
> > 4. \$lt : less than
> > 5. \$lte : less than equals
> > 6. \$ne : not equal
> > 7. \$in : 주어진 배열(array)안에 속하는 값
> > 8. \$nin : 주어진 배열(array)안에 속하지 않는 값

> _논리 연산자_
>
> > ex) db.collection_name.find({ $or : [ {key:"value"}, {key:"value} ] })
> > $or, $and, $not(주어진 조건이 false -> true), \$nor(주어진 '모든'조건이 false -> true)

> _정규식 regex(regular expression) 연산자_
>
> > { <filed> : /pattern/<options> } // 옵션값 무시 가능
> > ex) db.name.find( { key : /value[1-2]/ } ) -> key의 value값 중 1-2를 포함한 데이터 조회
> > ex) db.name.find( { key : /value/i }) -> key의 value값의 대소문자를 무시한 데이터 조회
> > <options>
> >
> > > 1. i : 대소문자 무시
> > > 2. m : anchor(^)를 사용할 때 값에 \n 이 존재하면 무력화
> > > 3. x : whitespace 모두 무시
> > > 4. s : dot(.)을 사용할 때 \n 을 포함해서 매치

- $where 연산자 : 조건을 검 ex) { $where: "this.key.length == 0" }
- $elemMatch 연산자 : 서브도큐먼트 배열을 쿼리할 때 사용 ex) find({ comment: { $elemMatch: { name: "Charile" }}}) -> Charile라는 name의 comment가 있는 doc 조회
- $slice 연산자 : 서브도큐먼트 배열을 읽을 때 한계 설정 ex) find({key1:"value"}, {key2: { $slice: 출력 개수 }}) -> 출력 개수에 1을 넣으면 1개만 보여짐
- sort({ "value" : 1 or -1 }) : 1이면 오름차순, -1이면 내림차순 정렬
- limit(개수) : 개수 만큼 출력함
- skip(개수) : 개수 만큼 생략하고 그 다음부터 출력함

## git에 project 추가

1. 해당 파일에서 git bash 실행
2. git init -> git remote add origin git-url
3. git add .
4. git status -> git commit -m " "
5. git push origin master로 업로드

_toggle_
state에 !를 붙인다, 즉 조건에 !를 붙여주면 됨
ex) setState(!state)