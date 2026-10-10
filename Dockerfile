FROM node:22-bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        fonts-dejavu-core \
        fonts-liberation \
        libreoffice-impress \
        poppler-utils \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV ASTRO_TELEMETRY_DISABLED=1 \
    CHECKPOINT_DISABLE=1 \
    NODE_ENV=development

EXPOSE 4321

HEALTHCHECK --interval=5s --timeout=5s --start-period=10m --retries=12 \
  CMD node -e "fetch('http://127.0.0.1:4321/').then(r=>process.exit(r.ok?0:1),()=>process.exit(1))"

CMD ["sh", "-c", "npm run presentations:render && exec node scripts/run-astro.mjs dev --host 0.0.0.0"]
