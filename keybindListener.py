import keyboard
import requests


def post(state):
    url = 'http://localhost:3000/action'
    body = {"action": state, "target": "", "tts": ""}
    requests.post(url, data = body)
    print("Sent", state)

keyboard.on_press_key('f2', lambda e: post(str("answered")))
keyboard.on_press_key('f3', lambda e: post(str("hang")))
keyboard.on_press_key('f4', lambda e: post(str("reset")))

print("Waiting for input")

# block
while True:
    keyboard.wait()
