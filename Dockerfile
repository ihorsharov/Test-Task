FROM python:3.11 as base
WORKDIR /app
COPY requirements.txt ./
RUN pip install -r requirements.txt

FROM base as final
WORKDIR /app
COPY main.py ./
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80", "--workers", "1", ]
