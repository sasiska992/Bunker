FROM python:3.12-slim

WORKDIR /app/backend

COPY requirements.txt /app/backend

RUN cd /app/backend

RUN pip3 install -r requirements.txt

COPY . /app/backend

EXPOSE 8000


ENTRYPOINT ["uvicorn"]
CMD ["app:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

