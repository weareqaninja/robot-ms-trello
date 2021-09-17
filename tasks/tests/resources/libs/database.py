from pymongo import MongoClient
import ssl
import bcrypt

mongo_uri = 'mongodb+srv://qaninja:academy@cluster0.x70qe.mongodb.net/TrelloClone?retryWrites=true&w=majority'
client = MongoClient(mongo_uri, ssl_cert_reqs=ssl.CERT_NONE)

db = client['TrelloClone']

def clear_database():
    db.drop_collection('users')
    db.drop_collection('tasks')

def seed_users():

    users = [
        {'email': 'papito@msn.com', 'password': get_hash_pass('pwd123') }
    ]

    db['users'].insert_many(users)

def get_hash_pass(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(8))