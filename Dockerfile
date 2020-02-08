FROM python:3.7

MAINTAINER Thanh Nguyen "nguyenthanh.php@gmail.com"

COPY . /app

WORKDIR /app

RUN pip install -r requirements.txt

RUN ["python", "seeding/activities.py"]

CMD ["python", "app.py"]
