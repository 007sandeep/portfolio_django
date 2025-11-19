from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.cache import never_cache
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
from .models import Users
from datetime import datetime
from django.contrib import messages

def login(request):
    message = ""
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")

        user = Users.objects(email=email).first()
        if user and check_password(password, user.password):
            request.session['user_data'] = {
                "id": str(user.id),
                "name": user.name,
                "email": user.email,
                "age": user.age,
                "join_date": str(user.join_date),
            }

            # Update last login time
            user.last_time_login = datetime.utcnow()
            user.save()

            messages.success(request, "Login Successful")
            return redirect("dashboard")
        else:
            messages.error(request, "Invalid email or password")
            return redirect("login")

    return render(request, 'login.html')

def signup(request):
    message = ""
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        password = request.POST.get("password")
        age = request.POST.get("age")
        remember_me = 1 if request.POST.get("remember_me") == 1 else 0

        hashed_password = make_password(password)

        if Users.objects.filter(email=email).first():
            messages.error(request, "Email already exists!")
        else:
            Users(
                name=name,
                email=email,
                password=hashed_password,
                age=int(age),
                remember_me=int(remember_me),
                status=1,
                join_date=datetime.today(),   # Auto set current date
                created_on=datetime.today(),
                last_time_login = datetime.today(),
            ).save()
            messages.success(request, "User registered successfully!")
        return redirect("signup")
    return render(request, "signup.html")

def dashboard(request):
    if 'user_data' not in request.session:
        return redirect('login')

    user_data = request.session.get("user_data")
    return render(request, "dashboard.html", {"user": user_data})
    #template = loader.get_template('dashboard.html')
    #return HttpResponse(template.render())

def logout(request):
    message=""
    request.session.flush()
    messages.success(request, "Logged out successfully")
    return redirect("login")
