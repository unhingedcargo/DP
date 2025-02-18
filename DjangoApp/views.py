from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .forms import *
from .models import *
from datetime import date
import os
from json import dumps, load, dump
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

with open(os.path.join(BASE_DIR,"static/json/company-master.json"), 'r') as f:
	company_details = load(f)

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


# REGISTER COMPANY DETAILS
def register_company(request):
	if request.method == 'POST':
		form = CompanyRegister(request.POST)
		if form.is_valid():
			context = form.cleaned_data
			file_name = os.path.join(BASE_DIR,'static/json/company-master.json')
			with open(file_name, 'w') as f:
				dump(form.cleaned_data, f)
			
			messages.success(request, "Company Registered Successfully")
			return redirect('register')
	else:
		form = CompanyRegister()		
		context = {'form':form}
		return render(request, 'register.html', context)
	return render(request, 'register.html', context)


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
 	
# <QueryDict: {'csrfmiddlewaretoken': ['WYLzljOPDD5jgxvFR51im7uKLUkbGdxnnCjg8SJXsz7nWgAKAI7QCv7wWPitJERv'], 'jobno': ['121'], 'job_date': ['14-Feb-2025'], 'customer_name': ['PRINT PLUS'], 'customer_contact': ['9945071790'], 'item': ['Trodat Seal', '300gsm', 'Star Flex'], 'desc': ['2.0', 'A4_SS', '3x2 Feet'], 'qty': ['1', '50', '2'], 'rate': ['400', '15', '350'], 'tax': ['0', '18', '0'], 'amount': ['400.00', '885.00', '700.00'], 'total_text': ['1985'], 'advance': ['1000'], 'balance_text': ['985']}>

	if request.method == 'POST':
		data = dict(request.POST)
		item = data['item_select']
		desc = data['desc']
		qty = data['qty']
		rate = data['rate']
		tax = data['tax_rate']
		amount = data['amount']
		order = []
		for i in range(len(amount)):
			order.append([item[i], desc[i],qty[i],rate[i],tax[i],amount[i]])
		

		context = {
			'data': data,
			'company_details' : company_details,
			# 'customer': data['customer_name'][0],
			# 'contact': data['customer_contact'][0],
			# 'jobno' : data['jobno'][0],
			# 'job_date' : data['job_date'][0],
			# 'subtotal' : data['subtotal_text'][0],
			# 'total' : data['total_text'][0],
			# 'advance': data['advance'][0],
			# 'balance' : data['balance_text'][0],
			'order' : order
		}
		return render(request, 'estimate_pdf.html', context)

	else:
		pass

	products = ['300gsm', '130gsm', '170gsm', 'PVC Sticker Sheet', 'Paper Sticker Sheet', 'ID Card', 'Tshirt', 'Card Holder']

	gst = {
		"GST0": 0,
		"GST5": 5,
		"GST12": 12,
		"GST18": 18,
		"GST28": 28,
	}
	today = date.today().strftime("%d-%b-%Y")
	tax = True #{"istate":True, "state":False}
	# gst = dumps(gst)
	context = {
		'gst':gst,
		'tax':tax,
		'today':today,
		'products' : products
	}
	return render(request, 'estimate.html', context)



