# -----------------------------
# 1) Build stage
# -----------------------------
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generar el cliente de Prisma dentro de la imagen
RUN npx prisma generate

# -----------------------------
# 2) Runtime stage
# -----------------------------
FROM node:20-alpine

WORKDIR /app

# Copio solo node_modules ya procesado
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/*.js ./   # por si tenés más archivos .js
COPY --from=builder /app/*.json ./ # package.json por ejemplo

COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh

EXPOSE 3000
CMD ["./entrypoint.sh"]