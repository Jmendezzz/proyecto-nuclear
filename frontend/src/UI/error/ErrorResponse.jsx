import React from 'react';
import { motion } from 'framer-motion';

export const ErrorResponse = ({ errStatus, errMessage }) => {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%' }}>
            <motion.div
                initial={{ opacity: 0, translateY: 50 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: 'center' }}
            >
                <p style={{ fontSize: '120px' }}>Oops! </p>
                <h1 style={{ fontSize: '5rem', fontWeight: 'bold', marginBottom: '2rem' }}>{errStatus}</h1>
                <p style={{ fontSize: '1.5rem' }}>{errMessage}</p>
            </motion.div>
        </div>
    );
};
