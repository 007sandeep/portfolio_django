from django.shortcuts import render, redirect
from django.views.decorators.cache import never_cache
from django.http import HttpResponse
from django.template import loader
from datetime import datetime
from django.contrib import messages
from .models import Project

def projectadd(request):
    message=''
    if request.method == 'POST':
        

    user_data = request.user_data
    return render(request, "projectadd.html", {"user": user_data})