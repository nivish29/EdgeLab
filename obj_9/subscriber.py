import zenoh, time

def listener(change):
  """Callback function called when data is received"""
  # Access data from the change object
  data = change.payload.decode("utf-8")
  print(f"Message Received data: '{change.key_expr}': '{data}'")

if __name__ == "__main__":
  # Open a Zenoh session
  session = zenoh.open()

  # Define the key to subscribe to 
  key = "example/topic"

  # Declare a subscriber for the key and set the listener callback
  sub = session.declare_subscriber(key, listener)

  # Keep the program running to receive updates
  while True:
    time.sleep(1)
