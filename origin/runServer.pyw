import os
import time

"""
This script runs the server, and runs the 'openSite' script.
"""

def runServer():
    exec(open("origin/openSite.pyw").read())
    os.system("py origin/manage.py runserver")

runServer()