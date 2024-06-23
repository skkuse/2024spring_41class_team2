import mysql.connector
from mysql.connector import Error
from faker import Faker
import random
from datetime import datetime

def describe_table(host, port, database, user, password, table):
    """
    데이터베이스 테이블 구조를 확인하는 함수
    :param host: MariaDB 호스트 주소
    :param port: MariaDB 포트 번호
    :param database: 데이터베이스 이름
    :param user: 데이터베이스 사용자 이름
    :param password: 데이터베이스 비밀번호
    :param table: 테이블 이름
    :return: 테이블 구조 정보
    """
    try:
        # 데이터베이스 연결
        connection = mysql.connector.connect(
            host=host,
            port=port,
            database=database,
            user=user,
            password=password
        )
        if connection.is_connected():
            cursor = connection.cursor()
            cursor.execute(f"DESCRIBE {table}")
            result = cursor.fetchall()
            return result

    except Error as e:
        print(f"Error: {e}")
    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

def delete_all_tables(host, port, database, user, password):
    """
    데이터베이스의 모든 테이블을 삭제하는 함수
    :param host: MariaDB 호스트 주소
    :param port: MariaDB 포트 번호
    :param database: 데이터베이스 이름
    :param user: 데이터베이스 사용자 이름
    :param password: 데이터베이스 비밀번호
    :return: None
    """
    try:
        # 데이터베이스 연결
        connection = mysql.connector.connect(
            host=host,
            port=port,
            database=database,
            user=user,
            password=password
        )
        if connection.is_connected():
            cursor = connection.cursor()
            cursor.execute("SHOW TABLES")
            tables = cursor.fetchall()

            for table in tables:
                cursor.execute(f"DROP TABLE IF EXISTS {table[0]}")
                print(f"Table {table[0]} deleted successfully")

            connection.commit()
            print("All tables deleted successfully")

    except Error as e:
        print(f"Error: {e}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

def create_tables_from_file(host, port, database, user, password, sql_file_path):
    """
    SQL 파일의 정보를 사용하여 데이터베이스에 테이블을 생성하는 함수
    :param host: MariaDB 호스트 주소
    :param port: MariaDB 포트 번호
    :param database: 데이터베이스 이름
    :param user: 데이터베이스 사용자 이름
    :param password: 데이터베이스 비밀번호
    :param sql_file_path: 테이블 생성 SQL 명령이 포함된 파일 경로
    :return: None
    """
    try:
        # 데이터베이스 연결
        connection = mysql.connector.connect(
            host=host,
            port=port,
            database=database,
            user=user,
            password=password
        )
        if connection.is_connected():
            cursor = connection.cursor()

            # SQL 파일 읽기
            with open(sql_file_path, 'r') as file:
                sql_commands = file.read()

            # 개별 SQL 명령어로 분할
            sql_commands = sql_commands.split(';')

            # 각 SQL 명령어 실행
            for command in sql_commands:
                if command.strip():
                    cursor.execute(command)
                    print(f"Executed: {command.strip()}")

            connection.commit()
            print("Tables created successfully")

    except Error as e:
        print(f"Error: {e}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

def insert_users(host, port, database, user, password, table, data):
    """
    데이터베이스에 데이터를 삽입하는 함수
    :param host: MariaDB 호스트 주소
    :param database: 데이터베이스 이름
    :param user: 데이터베이스 사용자 이름
    :param password: 데이터베이스 비밀번호
    :param table: 삽입할 테이블 이름
    :param data: 삽입할 데이터 (리스트의 리스트, 예: [[값1, 값2, ...], [값1, 값2, ...], ...])
    :return: None
    """
    try:
        # 데이터베이스 연결
        connection = mysql.connector.connect(
            host=host,
            port=port,
            database=database,
            user=user,
            password=password
        )
        if connection.is_connected():
            cursor = connection.cursor()

            # 데이터 삽입 쿼리 생성
            placeholders = ', '.join(['%s'] * len(data[0]))
            columns = 'id, username, email, password, suggestions, created_at'
            query = f"INSERT INTO {table} ({columns}) VALUES ({placeholders})"

            # 데이터 삽입
            cursor.executemany(query, data)
            connection.commit()
            print(f"{cursor.rowcount} rows inserted successfully into {table} table")

    except Error as e:
        print(f"Error: {e}")
    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

def insert_code_data(host, port, database, user, password, table, data):
    """
    데이터베이스에 데이터를 삽입하는 함수
    :param host: MariaDB 호스트 주소
    :param port: MariaDB 포트 번호
    :param database: 데이터베이스 이름
    :param user: 데이터베이스 사용자 이름
    :param password: 데이터베이스 비밀번호
    :param table: 삽입할 테이블 이름
    :param data: 삽입할 데이터 (리스트의 리스트, 예: [[값1, 값2, ...], [값1, 값2, ...], ...])
    :return: None
    """
    try:
        # 데이터베이스 연결
        connection = mysql.connector.connect(
            host=host,
            port=port,
            database=database,
            user=user,
            password=password
        )
        if connection.is_connected():
            cursor = connection.cursor()

            # 데이터 삽입 쿼리 생성
            placeholders = ', '.join(['%s'] * len(data[0]))
            columns = 'id, user_id, pattern_num, before_code, before_code_time, before_code_cpu, before_code_mem, after_code, after_code_time, after_code_cpu, after_code_mem, created_at'
            query = f"INSERT INTO {table} ({columns}) VALUES ({placeholders})"

            # 데이터 삽입
            cursor.executemany(query, data)
            connection.commit()
            print(f"{cursor.rowcount} rows inserted successfully into {table} table")

    except Error as e:
        print(f"Error: {e}")
    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

def insert_users_data(host, port, database, user, password, table, data):
    """
    users 테이블에 데이터를 삽입하는 함수
    :param host: MariaDB 호스트 주소
    :param port: MariaDB 포트 번호
    :param database: 데이터베이스 이름
    :param user: 데이터베이스 사용자 이름
    :param password: 데이터베이스 비밀번호
    :param table: 삽입할 테이블 이름
    :param data: 삽입할 데이터 (리스트의 리스트, 예: [[값1, 값2, ...], [값1, 값2, ...], ...])
    :return: None
    """
    try:
        # 데이터베이스 연결
        connection = mysql.connector.connect(
            host=host,
            port=port,
            database=database,
            user=user,
            password=password
        )
        if connection.is_connected():
            cursor = connection.cursor()

            # 데이터 삽입 쿼리 생성
            placeholders = ', '.join(['%s'] * len(data[0]))
            columns = 'id'
            query = f"INSERT INTO {table} ({columns}) VALUES ({placeholders})"

            # 데이터 삽입
            cursor.executemany(query, data)
            connection.commit()
            print(f"{cursor.rowcount} rows inserted successfully into {table} table")

    except Error as e:
        print(f"Error: {e}")
    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

# Faker 인스턴스 생성
fake = Faker()

# 랜덤 데이터 생성
users = []
for i in range(1, 11):  # user1부터 user10까지
    id = i
    username = f'user{i}'
    email = fake.email()
    password = fake.password()
    suggestions = fake.sentence()
    created_at = fake.date_time_this_year().strftime('%Y-%m-%d %H:%M:%S')
    users.append([id, username, email, password, suggestions, created_at])
    
# 파일 내용 읽기 함수
def read_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()

# Buggy.java와 After.java 파일 경로
buggy_file_path = './Buggy.java'
fixed_file_path = './Fixed.java'

# 파일 내용 읽기
buggy_code = read_file(buggy_file_path)
fixed_code = read_file(fixed_file_path)

# 패턴 랜덤 생성
def generate_pattern_num():
    return f"{random.randint(0, 15):04b}"

# 랜덤 데이터 생성
code_data = []
id_counter = 1
start_date = datetime(2024, 6, 23)
end_date = datetime(2024, 6, 29)
for user_id in range(1, 11):  # user_id 1부터 10까지
    for _ in range(10):  # 각 user_id에 대해 10개의 레코드 생성
        id = id_counter
        pattern_num = generate_pattern_num()
        before_code = buggy_code
        before_code_time = random.uniform(0.1, 10.0)
        before_code_cpu = random.uniform(0.1, 100.0)
        before_code_mem = random.uniform(0.1, 1000.0)
        after_code = fixed_code
        after_code_time = random.uniform(0.1, before_code_time)
        after_code_cpu = random.uniform(0.1, before_code_cpu)
        after_code_mem = random.uniform(0.1, before_code_mem)
        created_at = fake.date_between(start_date=start_date, end_date=end_date).strftime('%Y-%m-%d %H:%M:%S')
        code_data.append([id, user_id, pattern_num, before_code, before_code_time, before_code_cpu, before_code_mem, after_code, after_code_time, after_code_cpu, after_code_mem, created_at])
        id_counter += 1

users_data = []
for i in range(1, 11):
    user_id = i
    users_data.append([user_id])

# 데이터베이스 연결 정보
host = 'localhost'
database = 'begreen'
user = 'root'
password = '1234'
tableUsers = 'users'
tableCodeData = 'code_data'
tableUsersData = 'users_data'
port = 3306
sql_file_path = './DDL/tables.sql'

# 테이블 구조 확인 함수 호출
table_structure = describe_table(host, port, database, user, password, tableUsers)

# 테이블 구조 출력
if table_structure:
    print("Table Structure for", tableUsers)
    for column in table_structure:
        print(column)

# DB 초기화 함수 호출
delete_all_tables(host, port, database, user, password)

# 테이블 생성 함수 호출
create_tables_from_file(host, port, database, user, password, sql_file_path)

# 유저 삽입 함수 호출
insert_users(host, port, database, user, password, tableUsers, users)

# 코드 데이터 삽입 함수 호출
insert_code_data(host, port, database, user, password, tableCodeData, code_data)

# 유저 데이터 삽입 함수 호출
insert_users_data(host, port, database, user, password, tableUsersData, users_data)