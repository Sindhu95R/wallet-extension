import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import PropTypes from 'prop-types';

function Model({ url }) {
    const gltf = useGLTF(url);
    const ref = useRef();

    useFrame((state, delta) => {
        ref.current.rotation.y += delta;
    });

    return (
        // eslint-disable-next-line react/no-unknown-property
        <primitive ref={ref} object={gltf.scene} />
    );
}

Model.propTypes = {
    url: PropTypes.string.isRequired,
};

export default function TransitionAnimation({ url }) {
    return (
        <Canvas
            // eslint-disable-next-line react/no-unknown-property
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
        >
            <ambientLight />
            <pointLight
                // eslint-disable-next-line react/no-unknown-property
                position={[10, 10, 10]}
            />
            <Model url={url} />
            <OrbitControls />
        </Canvas>
    );
}

TransitionAnimation.propTypes = {
    url: PropTypes.string.isRequired,
};