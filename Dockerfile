# base image
FROM node:18

# gets passed as a build argument
ARG jwt_secret

ENV JWT_SECRET=${jwt_secret}
ENV NODE_ENV=production

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
RUN pnpm install --frozen-lockfile --prod


# CMD default command to run when nothing is specified -- can be overridden
# ENTRYPOINT -- always runs and cannot be overridden
# CMD ["pnpm", "start"]
CMD ["sleep", "100000000"]