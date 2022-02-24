# BTC1 MBT(04) Backend

## 실행방법
 - global docker 설치

 - .env 셋업
    ```bash
    PORT=4004
    DATABASE_HOST=localhost
    DATABASE_USERNAME=mbt
    DATABASE_PASSWORD=mbt04
    DATABASE_DATABASE=bithumb
    DATABASE_PORT=3306
    ```

 - 서버 셋업
    ```bash
    # install package
    $ yarn

    # setup containers for project
    $ yarn docker:on

    # setup db
    $ yarn migration:run
    ```

- 서버 실행
    ```bash
    # server run
    $ yarn start

    # server run watch mode
    $ yarn start:watch
    ```

## 설계방향
 - 기본 서버 기능 구현
    - 서버 프레임워크: express
    - ORM: typeorm (active-record)
    - DB: mysql8

## APIS
 - /
   - / (get) : healthcheck
   - /network (get) : 연결된 블록체인네트워크 정보 겟
   - /faucet/:accountAddress (get) : 로컬넷인 경우, 타겟 주소에 100eth 보냄
      - params: {accountAddress: account주소}

 - /wallets:
   - / (post) : 지갑(계정) 생성 - 로그인 아이디, 비밀번호, pk, account 생성 - 니모닉키 반환
      - body: {username: string, password: string}
   - /login (post) : 아이디, 비밀번호로 지갑 계정에 로그인
      - body: {username: string, password: string}
   - /find (post) : 니모닉으로 계정 찾고, 비밀번호 바로 변경
      - body: {mnemonic: string, passwordToChange: string}

 - /accounts:
   - /:accountAddress (get) : 생성한 특정 계정정보 겟
      - params: {accountAddress: account주소}
   - /:accountAddress/balance (get) : 특정 계정의 잔액정보 겟
      - params: {accountAddress: account주소}

 - transactions:
   - 

 - blocks:
   - 