# base image
FROM node:18

# gets passed as a build argument
ARG jwt_secret

ENV JWT_SECRET=${jwt_secret}
ENV DB_USER=csar
ENV DB_PORT=5432
ENV DB_HOST="172.17.0.2"

# start in /
RUN mkdir app
# we'll move into /app
WORKDIR /app

# Files required by pnpm install
COPY package.json pnpm-lock.yaml /app/
COPY dist /app/dist
COPY src/server /app/src/server

# RUN -- run some command
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
# we want to pass --prod so we don't install the dev dependencies,
# but then we can't use ts-node since we'd drop the types.
# oops--need to fix the tsconfig.json for the server to build js we can use
RUN pnpm install --frozen-lockfile 

# don't let pnpm skip the dev dependencies either
ENV NODE_ENV=production
# CMD default command to run when nothing is specified -- can be overridden
# ENTRYPOINT -- always runs and cannot be overridden
CMD ["pnpm", "start"]