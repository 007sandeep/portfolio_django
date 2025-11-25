from django.db import models
from datetime import datetime
from mongoengine import Document, StringField, IntField, DateTimeField

class Users(Document):
    name = StringField(required=True)
    email = StringField(required=True)
    password = StringField(required=True)
    age = IntField(required=True)
    remember_me = IntField(required=True)
    join_date = DateTimeField(default=datetime.utcnow)
    status = IntField(required=True)
    created_on = DateTimeField(required=datetime.utcnow)
    last_time_login = DateTimeField(required=datetime.utcnow)

class Project(Document):
    type=StringField(required=True)
    Title = StringField(required=True)
    link = StringField(required=True)
    languages = StringField(required=True)
    description = StringField(required=True)
    start_date = DateTimeField(required=datetime.utcnow)
    end_date = DateTimeField(required=datetime.utcnow)
    currently_working = StringField(required=True)

