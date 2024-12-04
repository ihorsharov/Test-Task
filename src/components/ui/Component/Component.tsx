import React, { forwardRef, useState, useLayoutEffect, Ref, MutableRefObject } from 'react';
import classNames from 'classnames';
import ComponentEvents from '../ComponentEvents/ComponentEvents';

interface WsComponentProps {
    isSource: boolean;
    isDestination: boolean;
    componentNumber: number;
    indexOfSource: number;
    indexOfDestination: number;
    eventType: string;
}

interface WsComponentRef {
    getBoundingClientRect: any;
    scrollIntoView(arg0: { behavior: string; block: string; }): unknown;
    destinationComponentRef: React.RefObject<HTMLDivElement>;
    sourceRef: React.RefObject<HTMLDivElement>;
}

const WsComponent = forwardRef<WsComponentRef, WsComponentProps>((props, ref) => {
    const {
        isSource,
        componentNumber,
        indexOfSource,
        indexOfDestination,
        eventType,
    } = props;
    const mutableRef = ref as never as MutableRefObject<HTMLDivElement>;

    useLayoutEffect(() => {
        if (isSource && mutableRef?.current) {
            mutableRef?.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [isSource, mutableRef]);

    const isPositionHigher = indexOfDestination < indexOfSource;

    const componentStyleWrapper = classNames('', {
        'activeDashedComponent': isSource,
        'defaultDashedComponent': !isSource,
    });

    const componentStyle = classNames('', {
        'activeComponent': isSource,
        'defaultComponent': !isSource,
    });

    const componentDescription = classNames('font-[16px] font-bold align-middle', {
        'text-[#AE44F9]': isSource,
        'text-[#031361]': !isSource,
    });

    const descriptionStyle = classNames('absolute left-[24px] top-[24px] font-[16px] font-bold', {
        'text-[#FFA449]': isSource,
        'text-[#031361]': !isSource,
    });

    const arrowDirectionStyle = classNames('absolute bottom-0 flex flex-col', {
        'rotate-[0deg] right-[35%] bottom-[-20px] ': isPositionHigher,
        'rotate-[180deg] right-0 bottom-0 translate-y-[-35px]': !isPositionHigher,
    });

    function calculateArrowParams(indexOfSource: number, indexOfDestination: number): number {
        const baseOffset = 425;
        const extraOffset = 57;

        return Math.abs(indexOfSource - indexOfDestination) === 1
            ? baseOffset + extraOffset
            : baseOffset * 2 + extraOffset;
    }


    const arrowParams = calculateArrowParams(indexOfSource, indexOfDestination);

    return (
        <div
            ref={isSource ? mutableRef : mutableRef}
            className="relative w-[80%] h-[50vh] flex flex-col justify-center items-center py-[50px]"
        >
            <div className={descriptionStyle}>Component {componentNumber + 1}</div>
            <div className="w-[50%] mb-[8px]">
                <p className={componentDescription}>
                    Organization {componentNumber + 1}
                </p>
            </div>
            <div className={componentStyleWrapper}>
                <div className={componentStyle}></div>
            </div>
            <div className="w-full border border-t-[#BCBDBD] border-b-[#BCBDBD] flex justify-center items-center relative">
                <div className="w-[50%]">
                    <ComponentEvents
                        arrowParams={arrowParams}
                        arrowDirectionStyle={arrowDirectionStyle}
                        isSource={isSource}
                        eventType={eventType}
                    />
                </div>
            </div>
        </div>
    );
});

export default WsComponent;
