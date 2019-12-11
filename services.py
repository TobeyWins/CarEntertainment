from flask import Flask
from flask import request
from flask import jsonify
from sense_hat import SenseHat
from random import randint
from flask_cors import CORS

app = Flask(__name__)

# Disable CORS protection altogether
cors = CORS(app, resources={
            r"/status": {"origins": "*"}, r"/music": {"origins": "*"}, r"/action/*": {"origins": "*"}, r"/window": {"origins": "*"}})

# Allow only specific IP for CORS
# cors = CORS(app, resources={r"/status": {"origins": "http://192.168.0.204"}, r"/action/*": {"origins": "http://192.168.0.204"}})

@app.route('/status')
def status():

    sense = SenseHat()

    consumption = 3 + randint(0, 100) / 20

    f = open("speed.txt", "r")
    speed = int(f.read())

    speed = speed + randint(-12, 12)

    if speed > 185:
        speed = 185

    if speed < 0:
        speed = 0


    fuelFile = open("remainingFuel.txt", "r")
    remainingFuel = float(fuelFile.read())

    remainingFuel -= (consumption * 0.05)

    if remainingFuel <= 0:
        speed = 0
        remainingFuel = 60

    fuelFile = open("remainingFuel.txt", "w")
    fuelFile.write(str(remainingFuel))
    fuelFile.close()

    f = open("speed.txt", "w")
    f.write(str(speed))
    f.close()

    return jsonify(
        pressure=sense.get_pressure(),
        temp=sense.get_temperature(),
        humidity=sense.get_humidity(),
        consumption=consumption,
        remainingFuel=remainingFuel,
        speed=speed
    )

@app.route('/music')
def music():

    music = [{
        'title': 'Melodie',
        'artist': 'Mousse T. feat. Cleah',
        'path': 'media/MousseT_feat._Cleah_Melodie.mp3'
    },
    {
        'title': 'Sweet but Psycho',
        'artist': 'Ava Max',
        'path': 'media/Ava Max - Sweet but Psycho.mp3'
    },
    {
        'title': 'Graveyard',
        'artist': 'Halsey',
        'path': 'media/Halsey - Graveyard.mp3'
    },
    {
        'title': 'White Lies',
        'artist': 'M-22',
        'path': 'media/M-22 - White Lies.mp3'
    },
    {
        'title': 'Around The World',
        'artist': 'Daft Punk',
        'path': 'media/Daft Punk - Around The World.mp3'
    },
    {
        'title': 'All the small things',
        'artist': 'Blink-182',
        'path': 'media/blink-182 - All The Small Things.mp3'
    },
    {
        'title': 'Butterfly',
        'artist': 'Crazy Town',
        'path': 'media/Crazy Town - Butterfly.mp3'
    },
    {
        'title': 'Jenny from the Block',
        'artist': 'Jennifer Lopez',
        'path': 'media/Jennifer Lopez - Jenny from the Block.mp3'
    },
    {
        'title': 'Blinding Lights',
        'artist': 'The Weeknd',
        'path': 'media/The Weeknd - Blinding Lights.mp3'
    },
    {
        'title': 'Miami',
        'artist': 'Will Smith',
        'path': 'media/Will Smith - Miami.mp3'
    }]
        
    return jsonify(music)


@app.route('/action/<action>')
def action(action):

    sense = SenseHat()
    #sense.show_message(request.remote_addr, text_colour=(
    #    255, 255, 0), back_colour=(127, 0, 127))

    if action == "lock":

        b = (0, 0, 0)
        r = (255, 0, 0)

        pixels = [
            b, b, b, b, b, b, b, b,
            b, b, b, r, r, b, b, b,
            b, b, r, b, b, r, b, b,
            b, b, r, b, b, r, b, b,
            b, b, r, r, r, r, b, b,
            b, b, r, r, r, r, b, b,
            b, b, r, r, r, r, b, b,
            b, b, r, r, r, r, b, b
        ]

    elif action == "unlock":

        b = (0, 0, 0)
        r = (0, 255, 0)

        pixels = [
            b, b, b, b, b, r, r, b,
            b, b, b, b, r, b, b, r,
            b, b, b, b, b, b, b, r,
            b, b, b, b, b, b, r, b,
            b, b, r, r, r, r, b, b,
            b, b, r, r, r, r, b, b,
            b, b, r, r, r, r, b, b,
            b, b, r, r, r, r, b, b
        ]

    sense.set_pixels(pixels)

    return jsonify(
        status=0
    )

@app.route('/window/<action>')
def window(action):

    sense = SenseHat()
    #sense.show_message(request.remote_addr, text_colour=(
    #    255, 255, 0), back_colour=(127, 0, 127))

    if action == "down":

        b = (0, 0, 0)
        r = (51, 204, 255)

        pixels = [
            b, b, b, b, b, b, b, b,
            b, b, b, b, b, b, b, b,
            b, b, b, b, b, b, b, b,
            b, b, b, b, b, b, b, b,
            b, b, b, b, b, b, b, b,
            r, r, r, r, r, r, r, r,
            r, r, r, r, r, r, r, r,
            r, r, r, r, r, r, r, r
        ]

    elif action == "up":

        b = (0, 0, 0)
        r = (255, 255, 0)

        pixels = [
            b, b, b, b, b, b, b, b,
            r, r, r, r, r, r, r, r,
            r, r, r, r, r, r, r, r,
            r, r, r, r, r, r, r, r,
            r, r, r, r, r, r, r, r,
            r, r, r, r, r, r, r, r,
            r, r, r, r, r, r, r, r,
            r, r, r, r, r, r, r, r
        ]

    sense.set_pixels(pixels)

    return jsonify(
        status=0
    )


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
