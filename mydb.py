import mysql.connector as mysqldb

conn = mysqldb.connect(host='localhost', user='root', password='whitesatin', port=3306)

cur = conn.cursor()

cur.execute("create database invoice_manager")

print("All Done")