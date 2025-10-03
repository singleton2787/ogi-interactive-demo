import React from 'react';

const Slider = ({ label, min, max, step, value, onChange }) => {
    return (
        <div style={{ margin: '15px 0' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                {label}
            </label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                style={{ width: '100%' }}
            />
        </div>
    );
};

export default Slider;