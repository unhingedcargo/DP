from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .forms import *
from .models import *




def home(request):
	if request.method == 'POST':
		username = request.POST['user_name']
		password = request.POST['user_password']

		user = authenticate(request, username=username, password=password)

		if user is not None:
			login(request, user)
			messages.success(request, "You have been successfully logged in...")
			return redirect('home')
		else:
			messages.success(request, "Please check you credentials and retry")
			return redirect('home')
	else:
		return render(request, 'index.html', {})



# PRODUCT PAGE VIEWS
def product(request):
	# products = Product.objects.all()
	products = Product.objects.order_by('name')
	
	return render(request, 'product.html', {'products':products})

def product_detail(request, prod):
	product = Product.objects.get(pk=prod)
	return render(request, 'product_detail.html', {'data':product})

def add_product(request):
	if request.method == 'POST':
		form = ProductInsert(request.POST)
		if form.is_valid():
			form.save()
			messages.success(request, "Product added successfully")
			return redirect('product')

	else:
		form = ProductInsert()
		return render(request, 'add_product.html', {'form':form})
	return render(request, 'add_product.html', {'form':form})

def register_user(request):
	if request.method == 'POST':
		form = SignUpForm(request.POST)
		if form.is_valid():
			form.save()

			username = form.cleaned_data['username']
			password = form.cleaned_data['password1']
			user = authenticate(username=username, password=password)
			login(request, user)
			messages.success(request, "You have been logged out successfully")	
			return redirect('home')		
	else:
		form = SignUpForm()
		return render(request, 'register.html', {'form' : form})
	return render(request, 'register.html', {'form' : form})

def logout_user(request):
	logout(request)
	messages.success(request, "You have been logged out successfully")
	return redirect('home')



# CUSTOMER PAGE VIEWS
def customer(request):
	customers = Customer.objects.order_by('name')
	# customers = Master.objects.all().values_list('gstin')
	print(customers)

	return render(request, 'customer.html', {'customers':customers})

def customer_detail(request, cust):
	customer = Customer.objects.get(pk=cust)
	if request.method == "POST":
		customer.name = request.POST.get('customer')
		customer.contact = request.POST.get('contact')
		customer.email = request.POST.get('email')
		customer.gstin = request.POST.get('gstin')
		customer.closing_balance = request.POST.get('balance')
		
		customer.save()

		return redirect('customer')
	else:
		return render(request, 'customer_detail.html', {'data':customer})

def add_customer(request):
	if request.method == 'POST':
		form = CustomerInsert(request.POST)
		if form.is_valid():
			form.save()
			messages.success(request, "Customer added successfully")
			return redirect('customer')
		
	else:
		form = CustomerInsert()	
		return render(request, 'add_customer.html', {'form':form})
	return render(request, 'add_customer.html', {'form':form})

def delete_customer(request, cust):
	customer = Customer.objects.get(pk=cust)
	Customer.objects.get(pk=cust).delete()
	messages.success(request, f"{customer.customer} deleted successfully")
	return redirect('customer')




def estimate(request):

	choices = ['party A', 'party B', 'party C', 'party D', 'party E', 'party F', 'party G', 'party H',]

	gst = {
		'select': 'Select a Tax',
		'gst-0': 0,
		'gst-5': 5,
		'gst-12': 12,
		'gst-18': 18,
		'gst-28': 28,
	}

	tax = False #{"istate":True, "state":False}

	context = {
		'gst':gst,
		'tax':tax
	}
	return render(request, 'estimate.html', {'context':context})




