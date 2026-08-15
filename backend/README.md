# 🐍 Neuroalianza - Backend API

Servicio Backend para la plataforma **Neuroalianza** (Hackatón INSN San Borja 2026), desarrollado con **Python 3.12+**, **FastAPI** y gestionado con **[`uv`](https://docs.astral.sh/uv/)**.

---

## ⚡ Comandos Rápidos con `uv`

### 1. Inicialización y dependencias
```bash
# Sincronizar el entorno virtual y dependencias
uv sync

# Agregar una nueva dependencia
uv add fastapi pydantic uvicorn

# Agregar dependencias de desarrollo/testing
uv add --dev pytest httpx ruff
```

### 2. Ejecutar el servidor de desarrollo
```bash
uv run fastapi dev main.py
```
* API disponible en: `http://localhost:8000`
* Documentación interactiva (Swagger UI): `http://localhost:8000/docs`
* Documentación alternativa (ReDoc): `http://localhost:8000/redoc`

### 3. Ejecutar la suite de pruebas automatizadas
```bash
uv run pytest
```
