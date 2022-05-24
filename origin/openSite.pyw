
import webbrowser
import time 

"""
This script opens a web browser tab with the game.
"""


#Time delay to allow server to initialize
time.sleep(6)

#Open the game's site
url = "http://127.0.0.1:8000/type"
chrome_path = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe %s'
webbrowser.get(chrome_path).open(url)

