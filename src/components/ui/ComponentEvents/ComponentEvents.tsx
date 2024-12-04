import React from 'react';
import Arrow from '../../svg/Arrow';

interface EventType {
    event: string;
    colorSheme: string;
    description: string;
}

interface ComponentEventsProps {
    eventType: string;
    isSource: boolean;
    arrowDirectionStyle: string;
    arrowParams: any
}

const alllEvents: EventType[] = [
    { event: 'data_transmission', colorSheme: '#18F849', description: 'Security' },
    { event: 'security', colorSheme: '#E50000', description: 'Data Transfer' },
    { event: 'service_request', colorSheme: '#4AF9FF', description: 'Service Request' },
];

function ComponentEvents({ eventType, isSource, arrowDirectionStyle, arrowParams }: ComponentEventsProps) {
    return (
        <div className="relative w-full flex justify-center items-center py-[20px]">
            {alllEvents.map((event) => (
                <div key={event.event} className="relative w-[300px] flex items-center">
                    <div
                        style={{ color: eventType === event.event ? event.colorSheme : '#BCBDBD' }}
                        className="w-[142px] font-bold text-[10px]"
                    >
                        {event.description}
                    </div>
                    {isSource && eventType === event.event ? (
                        <div className={arrowDirectionStyle}>
                            <Arrow height={arrowParams} color={event.colorSheme} />
                        </div>
                    ) : <div className='absolute right-0 w-[56px] border border-[#BCBDBD] rotate-90'></div>}
                </div>
            ))}
        </div>
    );
}

export default ComponentEvents;
