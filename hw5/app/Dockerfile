FROM python:3.12-slim

WORKDIR /app

RUN pip install mysql-connector-python

COPY main.py .

CMD ["python", "main.py"]
