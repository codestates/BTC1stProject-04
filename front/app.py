from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route('/')
def main():
    return render_template("index.html")

@app.route('/wallet')
def wallet():
    return render_template("wallet/index.html")

@app.route('/explorer')
def explorer():
    return render_template("explorer/index.html")

if __name__ == '__main__':
    app.run(debug=True)
