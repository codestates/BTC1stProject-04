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
      - 사용처: 이더스캔) 기본적인 네트워크 정보
      - output: {chainId: number, node: string, blockNumber: number, currentBlock: BlockEntity}

   - /faucet/:accountAddress (get) : 로컬넷인 경우, 타겟 주소에 100eth 보냄
      - 사용처: 월렛) 로그인후 화면 ~ 계정에 테스트 이더 넣는 버튼
      - input: params: {accountAddress: account주소}
      - output: {account: string, balance: string}


 - /wallets:
   - / (post) : 지갑(계정) 생성 - 로그인 아이디, 비밀번호, pk, account 생성 - 니모닉키 반환
      - 사용처: 월렛) 계정 생성하는 페이지 (니모닉만 던져줌)
      - input: body: {username: string, password: string}
      - output: body: {mnemonic: string}

   - /login (post) : 아이디, 비밀번호로 지갑 계정에 로그인
      - 사용처: 월렛) 계정 로그인 페이지 (리턴값(계정정보)으로 로그인 후 페이지 구현)
      - input: body: {username: string, password: string}
      - output: body: {accounts: [{ AccountEntity }]}

   - /find (post) : 니모닉으로 계정 찾고, 비밀번호 바로 변경
      - 사용처: 월렛) 니모닉과 변경할 비밀번호로, 잃어버린 계정정보 되찾음 (로그인 아이디 리턴) - 아이디 보여주면서 재로그인 하라고 유도
      - input: body: {mnemonic: string, passwordToChange: string}
      - output: body: {username: string}


 - /accounts:
   - /:accountAddress (get) : 생성한 특정 계정정보 겟
      - 사용처: 이더스캔) 특정 계좌 주소 정보 조회
      - input: params: {accountAddress: account주소}
      - output: body: {accounts: AccountEntity }

   - /:accountAddress/balance (get) : 특정 계정의 잔액정보 겟
      - 사용처: ?
      - input: params: {accountAddress: account주소}
      - output: body: {balance: string }

 - /transactions:
   - / (post): 트랜잭션 생성
      - 사용처: 송금 기능에 사용
      - input(body): {addressFrom: string, addressTo: string, amount: string | number}
      - output: 생성된 트랜잭션의 hash
   - /:transactionId (get): 특정 트랜잭션의 정보 겟
      - 사용처: 익스플로러에서 특정 트랜잭션의 정보를 보여줄 때 사용
      - input(params): {transactionId: 트랜잭션 주소}
      - output: MoonbeamTransactionEntity (`src/entities/transaction.entity.ts`)

 - /blocks:
   - /:blockNumber (get): 특정 블록의 정보 겟
      - 사용처: 익스플로러에서 특정 블록의 정보를 보여줄 때 사용
      - input(params): {blockNumber: 블럭 번호}
      - output: MoonbeamBlockEntity (`src/entities/block.entity.ts`)