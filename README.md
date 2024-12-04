### Usage

Execute the following command inside the project folder
```sh
  sudo docker compose up
```

#### Running the demo
After the project is up and running you can do the following to run the demo: 
- Subscribe to the event stream on: ```ws://127.0.0.1:8080/events```. 
They will start streaming with ```ARTIFICIAL_DELAY_IN_SECONDS``` delay between them, configurable in ```Dockerfile```

