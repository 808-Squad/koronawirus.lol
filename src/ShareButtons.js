import React from 'react'
import { 
    FacebookShareButton, 
    FacebookIcon, 
    FacebookMessengerShareButton,
    FacebookMessengerIcon, 
    TwitterShareButton,
    TwitterIcon,
    TelegramShareButton,
    TelegramIcon,
    LinkedinShareButton,
    LinkedinIcon
} from 'react-share'
import styled from 'styled-components';

const ShareButtonContainer = styled.div`
    display: flex;
    & > button {
        margin-right: 5px;
    }
`

const url = "https://koronawirus.lol"

const ShareButtons = ({ }) => (
    <>
        <ShareButtonContainer>
            <FacebookShareButton url={url}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <FacebookMessengerShareButton url={url}>
                <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>
            <TwitterShareButton url={url}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>
            <TelegramShareButton url={url}>
                <TelegramIcon size={32} round />
            </TelegramShareButton>
            <LinkedinShareButton url={url}>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
        </ShareButtonContainer>
    </>
)

export default ShareButtons;