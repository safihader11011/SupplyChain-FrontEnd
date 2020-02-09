import React from 'react';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styled from 'styled-components';

const Center = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Spinner = ({height, width}) => {
    return (
        <Center>
            <Loader
                visible={true}
                type="Triangle"
                color="#652F8F"
                height={height || 100}
                width={width || 100}
                timeout={0}
            />
        </Center>
    )
}

export default Spinner;
