import zenoh, time


if __name__ == "__main__":
  # Open a Zenoh session
  session = zenoh.open()

  # Define the key for the data
  key = "example/topic"

  # Declare a publisher for the key
  pub = session.declare_publisher(key)

  while True:
    # Generate some data
    data_str = f"Hello, Zenoh!"
    print(f"Message Published Successfully: '{key}': '{data_str}'")

    pub.put(data_str)

    # Wait for one second before publishing again
    time.sleep(1)
