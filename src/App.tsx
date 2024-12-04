import React, { useEffect, useMemo, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { UseFetch } from './hooks/useFetch';
import { WsComponentType } from './types';
import WsComponennt from './components/ui/Component/Component';

function App() {

  const [events, setEvents] = useState<WsComponentType[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const destinationComponentRef = useRef<any>(null);
  const sourceComponentRef = useRef<any>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://127.0.0.1:80/events');

    socket.onopen = () => {
      setIsConnected(true);
    };

    socket.onmessage = (event) => {

      const message = JSON.parse(event.data);
      setEvents([message]);
    };
    socket.onclose = (event) => {
      setIsConnected(false);
      console.log('WebSocket connection closed', event);
    };

    return () => {
      socket.close();
    };
  }, []);


  const modifiedData = useMemo(() => {
    if (!events.length) return []
    const allComponents = ['component_1', 'component_2', 'component_3']
    const data = Array.from(allComponents).map(it => ({ component: it }))
    const isSource = events[0].source
    const isDestination = events[0].destination
    const eventType = events[0].type
    const modifiedData = data.map(it => ({ component: it.component, isSource: it.component === isSource, isDestination: it.component === isDestination, typeLocation: 1, typeEvent: it.component === isSource ? eventType : null }))
    return modifiedData
  }, [isConnected, events])


  const indexOfSource = modifiedData.findIndex(it => it.isSource)

  const indexOfDestination = modifiedData.findIndex(it => it.isDestination)

  return (
    <div className="w-full flex gap-[20px]">
      <div className="w-full h-[150vh] left-0 bg-[#F3F3F3]">
        <div className="fixed h-[150vh] px-[40px] py-[40px] flex flex-col gap-[40px]">
          {modifiedData.map((it, i) => {
            return (
              <div key={i} className="flex flex-col justify-center items-center gap-[20px]">

                <div className={`${it.isDestination || it.isSource ? 'outer-circle' : 'outer-circle-active'}`}>
                  <div className={`${it.isDestination || it.isSource ? 'inner-circle' : 'inner-circle-active'}`}></div>
                </div>
                <div className='w-[40px] border border-[#BCBDBD] rotate-90'></div>
              </div>

            )
          })}
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex">
          <div className="flex w-full border border-b-[#495AFF] h-[48px] justify-center items-center">
            <div className="text-[#495AFF] text-[16px]">Tab 1</div>
          </div>
          <div className="flex w-full border border-b-[#495AFF] h-[48px] justify-center items-center">
            <div className="text-[16px]">Tab 2</div>
          </div>
          <div className="flex w-full border border-b-[#495AFF] h-[48px] justify-center items-center">
            <div className="text-[16px]">Tab 3</div>
          </div>
        </div>
        {modifiedData.length ? modifiedData.map((currentComponent: any, index) => (
          <WsComponennt ref={currentComponent.isDestination ? destinationComponentRef : sourceComponentRef} indexOfSource={indexOfSource} indexOfDestination={indexOfDestination}
            key={index} componentNumber={index} isDestination={currentComponent.isDestination}
            isSource={currentComponent.isSource} eventType={currentComponent.typeEvent} />
        )) : <>Loading...</>}
      </div>
      <div className="w-full h-[150vh] left-0 bg-[#F3F3F3]">
        <div className="fixed h-[150vh] px-[40px] py-[40px]">
          {modifiedData.map((it, i) => {
            if (!it.isDestination) return
            return (
              <div key={i}>
                <h1 className="text-[24px] font-bold">
                  Component {i + 1}
                </h1>
                <p className='w-full'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            )
          })
          }
        </div>
      </div>
    </div>
  );
}

export default App