from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from .models import *
import csv

class SignUpForm(UserCreationForm):
    name = forms.CharField(label="", max_length=20, required=True, widget=forms.TextInput(attrs={'class':'form-control', 'placeholder':'Enter Your Name'}))

    class Meta:
        model = User
        fields = ('name', 'username', 'password1', 'password2')

    def __init__(self, *args, **kwargs):
        super(SignUpForm, self).__init__(*args, **kwargs)

        self.fields['username'].widget.attrs['class'] = 'form-control'
        self.fields['username'].widget.attrs['placeholder'] = 'Enter your user name'
        self.fields['username'].label = ""
        

        self.fields['password1'].widget.attrs['class'] = 'form-control'
        self.fields['password1'].widget.attrs['placeholder'] = 'Enter your password'
        self.fields['password1'].label = ""

        self.fields['password2'].widget.attrs['class'] = 'form-control'
        self.fields['password2'].widget.attrs['placeholder'] = 'Confirm your password'
        self.fields['password2'].label = ""

class ProductInsert(forms.ModelForm):
    prod_name = forms.CharField(label="", max_length=50, required=True, widget=forms.TextInput(attrs={'class':'form-control', 'placeholder':'Product Name'}))
    # unit = forms.CharField(label="", max_length=10, required=True, widget=forms.TextInput(attrs={'class':'form-control', 'placeholder':'Unit'}))
    unit = forms.ChoiceField(choices=(('nos','nos'),('set','set')), required=True, widget=forms.RadioSelect(), label='Unit')
    # forms.ChoiceField((choices=(('nos'), ('set'))), required=True, widget=forms.)
    purchase_rate = forms.FloatField(label="", required=True, widget=forms.NumberInput(attrs={'class':'form-control', 'placeholder':'Purchase Price'}))
    selling_rate = forms.FloatField(label="", required=True, widget=forms.NumberInput(attrs={'class':'form-control', 'placeholder':'Selling Price'}))

    class Meta:
        model = Product
        fields = ('prod_name', 'unit', 'purchase_rate', 'selling_rate')

    def __init__(self, *args, **kwargs):
        super(ProductInsert, self).__init__(*args, **kwargs)

class CustomerInsert(forms.ModelForm):
    class Meta:
        model = Customer
        fields = "__all__"



    name = forms.CharField(label="Name ", max_length=100, required=True, widget=forms.TextInput(attrs={'class':'form-control form-control-lg mt-3 mb-3', 'placeholder':'Customer Name'}))
    
    acc_type = forms.ChoiceField(choices=(('Account Type','Select Account Type...'),('Sales','Sales acc'),('Purchase', 'Purchase acc')),required=True, label="", widget=forms.Select(attrs={'class':'form-control mt-2 form-control-lg', 'placeholder':'Account Type'}))
    
    contact = forms.CharField(label="Contact No. ", max_length=10, required=False, widget=forms.TextInput(attrs={'class':'form-control form-control-lg mt-3 mb-3', 'placeholder':'Contact Number'}))
    
    alt_contact = forms.CharField(label="Alternate Contact No. ", max_length=10, required=False, widget=forms.TextInput(attrs={'class':'form-control form-control-lg mt-3 mb-3', 'placeholder':'Alternate Number'}))
    
    email = forms.EmailField(label="Email Address", max_length=100, required=False,widget=forms.EmailInput(attrs={'class':'form-control form-control-lg mt-3 mb-3', 'placeholder':'Email ID'}))
    
    gstin = forms.CharField(label="GST Number ", max_length=15, required=False, widget=forms.TextInput(attrs={'class':'form-control form-control-lg mt-3 mb-3', 'placeholder':'GST Number'}))
    
    state_tax = forms.BooleanField(initial=True, required=False, label="State Tax (tick if applicable)", widget=forms.CheckboxInput(attrs={'class':''}))
    
    igst = forms.BooleanField(initial=False, label="IGST Tax (tick if applicable)")
    
    opening_balance = forms.FloatField(label="Opening Balance", required=True, initial="0.0", widget=forms.TextInput(attrs={'class':'form-control form-control-lg mt-3 mb-3', 'placeholder':'Opening Balance'}))
    
    closing_balance = forms.FloatField(label="Closing Balance", required=True, initial="0.0", widget=forms.TextInput(attrs={'class':'form-control form-control-lg mt-3 mb-3', 'placeholder':'Closing Balance'}))

    def __init__(self, *args, **kwargs):
        super(CustomerInsert, self).__init__(*args, **kwargs)