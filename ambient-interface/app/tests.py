'''
tests to determine if raspi recognizes sensehat
'''

from sense_hat import SenseHat
from time import sleep

sense = SenseHat()

print("running tests")

t = 0.4

def matrix():
	try:
		sense.clear(255, 255, 255)
		sleep(t)
		sense.clear(255, 0, 0)
		sleep(t)
		sense.clear(0,255,0)
		sleep(t)
		sense.clear(0,0,255)
		sleep(t)
		sense.clear(0, 0, 0)
		print("successfull")
	except Exception as e:
		print(e)
		print("tests failed")
		raise
	finally:
		print("test run completed")
