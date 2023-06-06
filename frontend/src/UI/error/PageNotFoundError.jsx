import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PageNotFoundError = () => {
    const letters = ['4', '0', '4'];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <AnimatePresence style={{ display: 'flex', flexDirection: 'row' }}>
                    {letters.map((letter, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, translateY: -100 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            exit={{ opacity: 0, translateY: 100 }}

                            style={{
                                fontSize: '190px',
                                fontWeight: 'bold',
                                margin: '0 0.5rem',
                                display: 'inline-block',
                                rotate: 0,
                            }}
                        >
                            {letter}
                        </motion.span>
                ))}
                </AnimatePresence>
            </div>


            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: letters.length * 0.2 }}
                style={{ fontSize: '1.5rem', marginTop: '2rem' }}
            >
                La página a la que intentas acceder no existe
            </motion.p>
        </div>
    );
};

