FROM node:18-alpine As base
RUN mkdir -p /main

FROM base AS deps
# alpine 이미지는 glibc 대신 musl libc을 사용.
# 특정 라이브러리에 대해 문제가 발생할 수 있으므로 libc6-compat 패키지를 추가하는 것이 좋다.
# https://github.com/nodejs/docker-node/tree/main#nodealpine
RUN apk add --no-cache libc6-compat
WORKDIR /app
# 의존성 패키지 설치
COPY package.json package-lock.json ./
RUN npm install

FROM base AS builder
WORKDIR /app
COPY . .
# deps 단계에서 설치한 의존성 패키지 복사
COPY --from=deps /app/node_modules ./node_modules
# build 진행
RUN npm run build

FROM base AS runner
WORKDIR /app
# 보안 문제가 발생할 수 있으므로 도커 컨테이너 내에서 루트 권한으로 서버 프로세스를 실행하지 않는 것이 좋다.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
# standalone 폴더 및 정적 파일 복사
COPY . .
USER nestjs
EXPOSE 8443
ENV PORT 8443
# CMD ["node", "server.js"]
CMD ["node", "dist/main"]

# //////////////////////////////////////////////////////////////////////////////////



# alpine 이미지는 glibc 대신 musl libc을 사용.
# 특정 라이브러리에 대해 문제가 발생할 수 있으므로 libc6-compat 패키지를 추가하는 것이 좋다.
# https://github.com/nodejs/docker-node/tree/main#nodealpine
# RUN apk add --no-cache libc6-compat

# WORKDIR /app

# COPY package*.json ./

# # bash install
# RUN apk add bash

# # nginx install for reverse proxy
# RUN apk add nginx

# # wait-for-it.sh   for compose depends_on
# COPY wait-for-it.sh ./
# RUN chmod +x wait-for-it.sh

# #package.json devDependencies만 설치
# RUN npm install --only=development 

# COPY . .

# RUN npm install pm2 -g
# RUN npm run build

# FROM node:18.18-alpine3.17 as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /app

# COPY package*.json ./

# #package.json Dependencies만 설치
# RUN npm install --only=production
# RUN npm install pm2 -g
# COPY . .

# COPY --from=development /app/dist ./dist

# EXPOSE 3000
# ENV PORT 3000
# CMD ["node", "dist/main"]

# # pm2를 foreground로 실행 및 run 시 클러스터 인자 받기 pm2를 멀티도커안에서 돌리면 내부 오류 등 파악이 안되므로 쓰지않는다**
# # ENTRYPOINT ["pm2-runtime","start","dist/main.js"]