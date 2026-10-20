# Build from the repository root:
# docker build -t ninja-food .
#
# Two stages: build, then serve. The site is a static export (`output: 'export'`), so the runtime is
# a plain web server with no Node.js. NEXT_PUBLIC_* values are inlined at compile time, so they
# arrive as build args.

# ---- Builder ----
FROM node:24-alpine AS builder

# Some prebuilt binaries expect glibc.
RUN apk add --no-cache libc6-compat

WORKDIR /app
ENV CI=true
# No .git in the build context, so the `prepare` script (husky) has nothing to install.
ENV HUSKY=0
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
ENV NEXT_TELEMETRY_DISABLED=1

# Manifests first, so a change to the source does not invalidate the install layer.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# corepack resolves pnpm from the `packageManager` field, so the image matches the lockfile.
RUN corepack enable
RUN pnpm install --frozen-lockfile

COPY . .

ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# Writes the static site to /app/out
RUN pnpm build

# ---- Runner ----
# Least privilege: this nginx image runs as an unprivileged user and listens on 8080.
FROM nginxinc/nginx-unprivileged:alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 8080

# A liveness probe: /robots.txt is a small static file served by nginx alone. 127.0.0.1 rather than
# localhost, which also resolves to ::1.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/robots.txt || exit 1
