import mysql.connector
import sys
from collections import defaultdict
from tqdm import tqdm

try:
    conn = mysql.connector.connect(
        user='root',
        password='1234',
        host='localhost',
        port=3306,
        database='begreen',
    )
except mysql.connector.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")

cur = conn.cursor()
sql_file_path = "./DDL/tables.sql"
with open(sql_file_path, "r") as sql_file:
    sql_query = sql_file.read()
sql_query = ['CREATE' + i for i in sql_query.split('CREATE')[1:]]
for i in sql_query:
    try:
        cur.execute(i)
    except mysql.connector.Error as e:
        print(e)
        continue

conn.commit()

conn.close()
