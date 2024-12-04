import React, { memo } from 'react';

function Arrow({
    height = 313,
    color = "#0FE1E8",
}: {
    height?: number;
    color?: string;
}) {
    const validatedHeight = Math.max(height, 0);

    const dynamicPath = `
        M28.4749 1.52513
        C27.108 0.158291 24.892 0.158291 23.5251 1.52513
        L1.25126 23.799
        C-0.115571 25.1658 -0.115571 27.3819 1.25126 28.7487
        C2.6181 30.1156 4.83418 30.1156 6.20101 28.7487
        L26 8.94975
        L45.799 28.7487
        C47.1658 30.1156 49.3819 30.1156 50.7487 28.7487
        C52.1156 27.3819 52.1156 25.1658 50.7487 23.799
        L28.4749 1.52513
        Z
        M22.5 4
        L22.5 ${validatedHeight}
        L29.5 ${validatedHeight}
        L29.5 4
        L22.5 4
        Z
    `;

    return (
        <svg
            style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 1 }}
            width={52}
            height={validatedHeight}
            viewBox={`0 0 52 ${validatedHeight}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d={dynamicPath} fill={color} />
        </svg>
    );
}

export default memo(Arrow);
