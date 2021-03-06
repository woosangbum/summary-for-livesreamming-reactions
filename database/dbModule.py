import pymysql
import config


class Database:
    def __init__(self, password=config.db_password):
        self.db = pymysql.connect(host='localhost',
                                  user='root',
                                  password=password,
                                  charset='utf8mb4')
        self.cursor = self.db.cursor(pymysql.cursors.DictCursor)

    def execute(self, query, args=None):
        if args is None:
            args = {}
        self.cursor.execute(query, args)

    def executeOne(self, query, args=None):
        if args is None:
            args = {}
        self.cursor.execute(query, args)
        row = self.cursor.fetchone()
        return row

    def executeAll(self, query, args=None):
        if args is None:
            args = {}
        self.cursor.execute(query, args)
        row = self.cursor.fetchall()
        return row

    def commit(self):
        self.db.commit()
