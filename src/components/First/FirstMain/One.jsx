import React, { memo } from 'react';

const One = ({viewsNumber}) => {
    return (
        <div className="one">
        <p>{viewsNumber}</p>
        <svg
          width="16"
          height="13"
          viewBox="0 0 16 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.27394 12.5776C6.31542 12.5776 7.87991 10.1864 7.87991 6.66308C7.87991 3.13343 6.31542 0.754883 4.27394 0.754883C2.23246 0.754883 0.667969 3.13343 0.667969 6.66308C0.667969 10.1864 2.23246 12.5776 4.27394 12.5776ZM12.3953 12.5776C14.4368 12.5776 16.0013 10.1864 16.0013 6.66308C16.0013 3.13343 14.4368 0.754883 12.3953 0.754883C10.3602 0.754883 8.78936 3.13343 8.78936 6.66308C8.78936 10.1864 10.3602 12.5776 12.3953 12.5776ZM2.99563 8.85083C4.06407 8.85083 4.77636 8.1131 4.77636 6.99379C4.77636 5.88719 4.06407 5.13674 2.99563 5.13674C2.55681 5.13674 2.18159 5.26394 1.88904 5.48653C2.14343 3.3115 3.12283 1.89328 4.27394 1.88692C5.63493 1.88056 6.74152 3.81392 6.74152 6.66308C6.74152 9.49317 5.63493 11.4392 4.27394 11.4456C3.25638 11.452 2.37874 10.3517 2.00987 8.59008C2.28334 8.7618 2.61405 8.85083 2.99563 8.85083ZM11.117 8.85083C12.1791 8.85083 12.8977 8.1131 12.8977 6.99379C12.8977 5.88719 12.1791 5.13674 11.117 5.13674C10.6718 5.13674 10.2966 5.26394 9.99771 5.48653C10.2585 3.3115 11.2379 1.89328 12.3953 1.89328C13.75 1.89328 14.8566 3.82664 14.8566 6.66308C14.8566 9.49953 13.75 11.4392 12.3953 11.4392C11.3778 11.4392 10.4938 10.3454 10.1249 8.59008C10.3984 8.7618 10.7354 8.85083 11.117 8.85083ZM2.49321 6.7712C2.27062 6.73304 2.12435 6.46593 2.17523 6.1861C2.23246 5.90627 2.45506 5.70912 2.67129 5.74728C2.90024 5.7918 3.03379 6.05891 2.97655 6.33238C2.92568 6.6122 2.71581 6.80936 2.49321 6.7712ZM10.6146 6.7712C10.3857 6.72668 10.2457 6.46593 10.2966 6.1861C10.3539 5.90627 10.5637 5.70912 10.7863 5.74728C11.0216 5.78544 11.1552 6.05891 11.0979 6.33238C11.0407 6.6122 10.8372 6.80936 10.6146 6.7712Z"
            fill="#B5CED9"
          />
        </svg>
      </div>
    );
};

export default memo(One);