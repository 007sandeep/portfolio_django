from django.shortcuts import render
from datetime import datetime
from django.contrib import messages
from django.shortcuts import render, redirect

def home(request):
    return render(request, 'home.html')
