import os
import time

"""
This script runs the server, and runs the 'openSite' script.
"""

def runServer():
    exec(open("openSite.pyw").read())
    os.system("py manage.py runserver")

runServer()