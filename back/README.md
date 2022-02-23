# BTC1 MBT(04) Backend

## 실행방법
 - global docker 설치

 - .env 셋업
    ```bash
    PORT=4004
    DATABASE_HOST=localhost
    DATABASE_USER=mbt
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
    - ORM: typeorm
    - DB: mysql8
