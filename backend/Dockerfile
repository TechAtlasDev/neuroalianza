# Dockerfile optimizado para Neuroalianza Backend (FastAPI + uv)

FROM python:3.12-slim AS builder

WORKDIR /app

# Instalar uv para gestión determinista y ultrarrápida
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uv/bin/uv

# Copiar archivos de dependencias
COPY pyproject.toml uv.lock ./

# Sincronizar entorno virtual en modo producción
RUN /uv/bin/uv sync --frozen --no-dev

# Copiar código fuente
COPY app ./app

# Exponer el puerto 8000
EXPOSE 8000

# Comando de ejecución en producción con uvicorn
CMD ["/app/.venv/bin/uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
