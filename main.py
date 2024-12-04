import os

from fastapi import FastAPI, WebSocketDisconnect, WebSocket
from typing import List
import asyncio

app = FastAPI()

active_connections: List[WebSocket] = []
ARTIFICIAL_DELAY_IN_SECONDS = int(os.environ.get("ARTIFICIAL_DELAY_IN_SECONDS", 5))
event_list = [
    {
        "source": "component_2",
        "destination": "component_1",
        "type": "service_request",
    },
    {
        "source": "component_2",
        "destination": "component_1",
        "type": "security",
    },
    {
        "source": "component_2",
        "destination": "component_1",
        "type": "data_transmission",
    },
    {
        "source": "component_1",
        "destination": "component_3",
        "type": "data_transmission",
    },
    {
        "source": "component_2",
        "destination": "component_1",
        "type": "security",
    },
    {
        "source": "component_3",
        "destination": "component_1",
        "type": "service_request",
    },
    {
        "source": "component_1",
        "destination": "component_3",
        "type": "security",
    },
    {
        "source": "component_3",
        "destination": "component_1",
        "type": "data_transmission",
    },
    {
        "source": "component_1",
        "destination": "component_2",
        "type": "service_request",
    },
    {
        "source": "component_1",
        "destination": "component_2",
        "type": "data_transmission",
    },
]


async def event_subscriber():
    for event in event_list:
        await asyncio.sleep(ARTIFICIAL_DELAY_IN_SECONDS)
        for connection in active_connections:
            await connection.send_json(event)


@app.websocket("/events")
async def events(websocket: WebSocket):
    await connect_websocket(websocket)
    asyncio.create_task(event_subscriber())
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        await disconnect_websocket(websocket)
        print(f"Client disconnected: {websocket.client}")


async def connect_websocket(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)


async def disconnect_websocket(websocket: WebSocket):
    active_connections.remove(websocket)
