import React from 'react';
import styled from 'styled-components';
import {
    ArrowLeftOutlined as ArrowLeftOutlinedIcon,
    ArrowRightOutlined as ArrowRightOutlinedIcon
} from '@mui/icons-material';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;

`;

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
`;

const Wrapper = styled.div`
    height: 100%;

`;

const Slide = styled.div`
    display: flex;
    align-items: center;
    
`;

const ImgContainer = styled.div`
    flex: 1;
    
`;

const Image = styled.img`

`;

const InfoContainer = styled.div`
    flex: 1;
`;

const Slider = () => {
    return (
        <div>
            <Container>
                <Arrow direction="left">
                    <ArrowLeftOutlinedIcon />
                </Arrow>
                <Wrapper>
                    <ImgContainer>
                        <Image src="https://i.ibb.co/XsdmR2c/1.png"/>
                    </ImgContainer>
                    <InfoContainer></InfoContainer>
                </Wrapper>
                <Arrow direction="right">
                    <ArrowRightOutlinedIcon />
                </Arrow>
            </Container>
        </div>
    )
}

export default Slider;