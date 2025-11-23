import os
import time
import mysql.connector

# Wait a few seconds for MySQL to start
time.sleep(5)

DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")

# Connect to MySQL
conn = mysql.connector.connect(
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASS,
    database=DB_NAME
)

cur = conn.cursor()

# Read all rows from the 'example' table
cur.execute("SELECT * FROM example;")
rows = cur.fetchall()

print("Current data in 'example' table:")
for row in rows:
    print(row)

cur.close()
conn.close()
