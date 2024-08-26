import { Metric, onCLS, onFCP, onTTFB } from "web-vitals";

const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        onCLS(onPerfEntry);
        onFCP(onPerfEntry);
        onFCP(onPerfEntry);
        onTTFB(onPerfEntry);
    }
};
export default reportWebVitals;
