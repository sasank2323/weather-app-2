from flask import Flask, render_template, request, redirect
import requests

app = Flask(__name__)

# API details (as provided)
akey = "c9fd1f1975b1ba8df031674f4e65267e"
aurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/search", methods=["POST"])
def handle_search():
    city = request.form["city"]
    checkWeather(city)
    return redirect("/")

def checkWeather(city):
    response = requests.get(aurl + city + "&appid=" + akey)
    data = response.json()

    display_data = {
        "city": data["name"],
        "temp": f"{round(data['main']['temp'])}°c",
        "humidity": f"{data['main']['humidity']}%",
        "wind": f"{data['wind']['speed']}km/h",
        "icon": "images/clear.png"  # Default icon
    }

    if data["weather"][0]["main"] == "Clouds":
        display_data["icon"] = "images/clouds.png"
    # ... (other weather conditions)

    return render_template("index.html", data=display_data)

if __name__ == "__main__":
    app.run(debug=True)
