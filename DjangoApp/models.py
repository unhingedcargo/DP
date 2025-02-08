from django.db import models


class Customer(models.Model):
    added_at = models.DateTimeField(auto_now_add=True)
    acc_type = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
    contact = models.CharField(max_length=10)
    alt_contact = models.CharField(max_length=10)
    email = models.EmailField(max_length=100)
    gstin = models.CharField(max_length=20)
    state_tax = models.BooleanField(default=True)
    igst = models.BooleanField(default=True)
    opening_balance = models.FloatField()
    closing_balance = models.FloatField()

class Sundry_debtors(models.Model):
    added_at = models.DateTimeField(auto_now_add=True)
    cust_id = models.BigIntegerField()
    voucher_no = models.IntegerField()
    date = models.DateField(auto_now_add=False)
    debit_amount = models.FloatField()
    credit_amount = models.FloatField()
    closing_balance = models.FloatField()

class Receipt(models.Model):
    added_at = models.DateTimeField(auto_now_add=True)
    jobno = models.IntegerField()
    cust_id = models.BigIntegerField()
    amount_received = models.FloatField()
    receipt_date = models.DateField(auto_now=True)
    receipt_no = models.BigIntegerField()
    payment_mode = models.CharField(max_length=20)

class Jobcard(models.Model):
    jobno = models.IntegerField()
    date = models.DateField(auto_now=True)
    order_id = models.BigIntegerField()
    cust_id = models.BigIntegerField()
    taxable_total = models.FloatField()
    discount = models.FloatField()
    gtotal = models.FloatField()

class Order(models.Model):
    ref_no = models.IntegerField()
    acc_type = models.CharField(max_length=10)
    item_no = models.SmallIntegerField()
    prod_id = models.BigIntegerField()
    qty = models.FloatField()
    unit = models.CharField(max_length=10)
    rate = models.FloatField()
    total = models.FloatField()
    tax_rate = models.FloatField()
    tax_amount = models.FloatField()
    gtotal = models.FloatField()

class Vendor(models.Model):
    # vend_id = models.BigAutoField(primary_key=True)
    added_at = models.DateTimeField(auto_now_add=True)
    acc_type = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
    contact = models.CharField(max_length=10)
    alt_contact = models.CharField(max_length=10)
    email = models.EmailField(max_length=100)
    gstin = models.CharField(max_length=20)
    state_tax = models.BooleanField(default=True)
    igst = models.BooleanField(default=True)
    opening_balance = models.FloatField()
    closing_balance = models.FloatField()

class Sundry_creditors(models.Model):
    added_at = models.DateTimeField(auto_now_add=True)
    vend_id = models.BigIntegerField()
    voucher_no = models.IntegerField()
    date = models.DateField(auto_now_add=False)
    debit_amount = models.FloatField()
    credit_amount = models.FloatField()
    closing_balance = models.FloatField()

class Payment(models.Model):
    added_at = models.DateTimeField(auto_now_add=True)
    billno = models.IntegerField()
    vend_id = models.BigIntegerField()
    amount_paid = models.FloatField()
    payment_date = models.DateField(auto_now=True)
    payment_no = models.BigIntegerField()
    payment_mode = models.CharField(max_length=20)    

class Bill(models.Model):
    billno = models.IntegerField()
    date = models.DateField()
    order_id = models.BigIntegerField()
    vend_id = models.BigIntegerField()
    taxable_total = models.FloatField()
    discount = models.FloatField()
    gtotal = models.FloatField()

class Product(models.Model):
    name = models.CharField(max_length=100)
    hsn_code = models.CharField(max_length=20)
    unit = models.CharField(max_length=10)
    tax_applicable = models.BooleanField(default=False)
    tax_rate = models.FloatField()
    state_tax = models.BooleanField(default=True)
    igst = models.BooleanField(default=True)
    purchase_rate = models.FloatField()
    selling_rate = models.FloatField()

class Month(models.Model):
    year = models.IntegerField()
    month_no = models.IntegerField()
    month_name = models.CharField(max_length=25)
    month_days = models.IntegerField()

class Account(models.Model):
    name = models.CharField(max_length=20)
    txn_type = models.CharField(max_length=10)

class Ledger(models.Model):
    # ledger_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    account_id = models.IntegerField()
    added_at = models.DateField(auto_now_add=True, auto_now=False)
    last_update = models.DateField(auto_now=True)

class Cashflow(models.Model):
    ref_no = models.CharField(max_length=10)
    date = models.DateField(auto_now=True)
    ledger_id = models.BigIntegerField()
    details = models.CharField(max_length=200)
    cashflow = models.BooleanField()    # True - Cash-IN and False - Cash-OUT
    amount_in = models.FloatField()
    amount_out = models.FloatField()

class Gst(models.Model):
    slab = models.CharField(max_length=10)
    rate = models.FloatField()










