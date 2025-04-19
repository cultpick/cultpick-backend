# 컬픽 Cultpick API

> **컬픽 백엔드 레포**

<hr/>

## 📦 1. 프로젝트 시작하기

### ✅ 요구 사항

> - node >= 18.17.0
> - pnpm >= 9.0.2

### ⚙️ 설치 및 실행

1. 프로젝트 로컬에 클론

```shell
git clone https://github.com/cultpick/cultpick-backend.git

cd cultpick-backend
```

2. 프로젝트 세팅 명령어 실행

```shell
pnpm i
```

3. 프로젝트 실행

```shell
pnpm start:debug
```

<hr/>

## 📁 2. 프로젝트 구조

```text
┌── .github/
│   └── workflows/
│       └── deploy-main.yml
├── docs/
├── prisma/
│   ├── schema.prisma
├── src/
│   ├── auth/                   # 인증 및 인가 관련 모듈
│   ├── common/                 # 공통 유틸리티, 필터, 인터셉터, 데코레이터 등
│   ├── module/                 # 도메인 기반 모듈 집합 (실제 주요 기능 구현 위치)
│   │   └── lib/                # 재사용 가능한 라이브러리 또는 비즈니스 로직 모음
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── .eslintrc.js
|── .gitignore
├── .prettierrc
├── nest-cli.json
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.build.json
└── tsconfig.json
```

<hr/>

## 🚀 3. 배포

### 📚 API 문서

- [Dev Swagger](https://port-0-cultpick-server-dev-m5gayojn31b607da.sel4.cloudtype.app/docs)

### 🏗️ 배포 환경 (Cloudtype)

- [서버](https://app.cloudtype.io/@aptheparker/aptheparker:main/cultpick-server-dev)

- [DB](https://app.cloudtype.io/@aptheparker/aptheparker:main/cultpick-db-dev)

<hr/>

## 📄 4. 기타 문서

- [🧰 트러블슈팅](./docs/TROUBLESHOOTING.md)
