FROM python:3.8-alpine
WORKDIR /app
ENV TZ="Asia/Tokyo"

ADD poetry.lock /app/poetry.lock
ADD pyproject.toml /app/pyproject.toml

RUN apk add --no-cache \
  build-base \
  libffi-dev \
  openssl-dev \
  mysql-client \
  mysql-dev \
  && pip install poetry \
  && poetry install

ADD . /app
