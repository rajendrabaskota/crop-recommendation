from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import pickle
from classes import id2label
import mysql.connector


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

filename = "model_svm_pickle.pkl"
with open(filename, 'rb') as file:
    model = pickle.load(file)


mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="password",
  database="crop"
)

mycursor = mydb.cursor()

X_mean = np.array([50.44318181818182,
 53.42329545454545,
 48.13693181818182,
 25.675126152979544,
 71.50815023747728,
 6.473164028671023,
 103.44443490492046])

X_std = np.array([36.8808764052793,
 32.99710425385808,
 50.62063673358458,
 5.137925815762948,
 22.232054690816646,
 0.7701459198145933,
 54.948271583721564])


# class Data(BaseModel):
#     temp: str
#     humidity: str

class Node(BaseModel):
    node_id: str
    temp: str
    humidity: str

class Form(BaseModel):
    phone_no: str
    N: float
    P: float
    K: float
    pH: float
    rainfall: float

data = {}

@app.get('/')
def req():
    return "Wassupp!!"

@app.post('/from-node')
def fetch_data(item: Node):
    dict = {}
    # data['node_id'] = int(item.node_id)
    dict['temp'] = float(item.temp)
    dict['humidity'] = float(item.humidity)
    data[int(item.node_id)] = dict

@app.post('/form-submit')
def submit(item: Form):
    dict = {}
    dict['N'] = item.N
    dict['P'] = item.P
    dict['K'] = item.K
    dict['ph'] = item.pH
    dict['rainfall'] = item.rainfall

    print("datatype: ")
    print(type(item.phone_no))

    mycursor = mydb.cursor()
    mycursor.execute('''select node_id as nodeID,pname as person_name,phone_no
    from nodes,person 
    where (nodes.person_id = person.id);''')
    ans = mycursor.fetchall()

    for x in ans:
        if x[2] == str(item.phone_no):
            node_id = int(x[0])
            name = x[1]

    required_data = data[node_id]

    # data[int(item.phone_no)] = dict

    print(data)
    print(name)

    X = np.array([[dict['N'], dict['P'], dict['K'], required_data['temp'], required_data['humidity'], dict['ph'], dict['rainfall']]])
    X = (X - X_mean) / X_std

    # data = np.array([[-1.367733, -1.073527, -0.674368, 0.797281, 0.922049, 0.954140, 0.199674]])

    # data = np.array([[-0.417275, 0.615201, 0.515993, 0.214042, 0.375975, 0.558398, 1.101592]])
    prediction = model.predict(X)
    crop = id2label[prediction[0]].capitalize()
    print(crop)

    return {"name": name, "crop": crop}
