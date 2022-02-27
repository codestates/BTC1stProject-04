from flask import Flask, json, request, jsonify, redirect, url_for
from flask import render_template
from flask_cors import CORS, cross_origin
import requests

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

headers = {
    'Content-Type': 'application/json'
}

@app.route('/', methods=["GET"])
def main():
    return render_template("index.html")

@app.route('/join', methods=["POST"])
def join():
    params = json.loads(request.get_data(), encoding='utf-8')
    url = "http://localhost:4004/wallets"
    payload = json.dumps(params)
    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.json())
    return jsonify(response.json())

@app.route('/login', methods=["POST"])
def login():
    params = json.loads(request.get_data(), encoding='utf-8')
    url = "http://localhost:4004/wallets/login"
    payload = json.dumps(params)
    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.json())
    return jsonify(response.json())

@app.route('/find', methods=["POST"])
def find():
    params = json.loads(request.get_data(), encoding='utf-8')
    url = "http://localhost:4004/wallets/find"
    payload = json.dumps(params)
    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.json())
    return jsonify(response.json())

@app.route('/wallet', methods=["GET"])
def get_wallet():
    return render_template("wallet/index.html")

@app.route('/wallet/faucet', methods=["POST"])
def wallet_faucet():
    params = json.loads(request.get_data(), encoding='utf-8')
    url = "http://localhost:4004/faucet/%s" % (params['account'])
    response = requests.request("GET", url, headers=headers)
    print(response)
    return jsonify(response.json())

@app.route('/wallet/account', methods=["POST"])
def find_account():
    params = json.loads(request.get_data(), encoding='utf-8')
    url = "http://localhost:4004/accounts/%s" % (params['account'])
    response = requests.request("GET", url, headers=headers)
    print(response.json())
    return jsonify(response.json())

@app.route('/wallet/transactions', methods=["POST"])
def find_transactions():
    params = json.loads(request.get_data(), encoding='utf-8')
    url = "http://localhost:4004/accounts/%s/transactions" % (params['account'])
    response = requests.request("GET", url, headers=headers)
    print(response.json())
    return jsonify(response.json())

@app.route('/transactions', methods=["POST"])
def send_transactions():
    params = json.loads(request.get_data(), encoding='utf-8')
    url = "http://localhost:4004/transactions"
    payload = json.dumps({
        "addressFrom": params["addressFrom"],
        "addressTo": params["addressTo"],
        "amount": params["amount"]
    })
    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.json())
    return jsonify(response.json())

@app.route('/explorer', methods=["GET"])
def explorer():
    url = "http://localhost:4004/explorer/network"
    response = requests.request("GET", url, headers=headers)
    return render_template("explorer/index.html", data=response.json())

@app.route('/explorer/transactions', methods=["POST"])
def explorer_transaction():
    params = json.loads(request.get_data(), encoding='utf-8')
    url = "http://localhost:4004/explorer/transactions/%s" % (params['transactionId'])
    response = requests.request("GET", url, headers=headers)
    print(response.json())
    return jsonify(response.json())

@app.route('/explorer/transactions/latest', methods=["GET"])
def explorer_trans_late():
    url = "http://localhost:4004/explorer/transactions/latest"
    response = requests.request("GET", url, headers=headers)
    print(response.json())
    return jsonify(response.json())

@app.route('/explorer/blocks', methods=["POST"])
def explorer_block():
    params = json.loads(request.get_data(), encoding='utf-8')
    url = "http://localhost:4004/explorer/blocks/%s" % (params['number'])
    response = requests.request("GET", url, headers=headers)
    print(response.json())
    return jsonify(response.json())

@app.route('/explorer/blocks/latest', methods=["GET"])
def explorer_blocks_late():
    url = "http://localhost:4004/explorer/blocks/latest"
    response = requests.request("GET", url, headers=headers)
    print(response.json())
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)
