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
import { chooseLanguage } from '../utils';

const ShareButtonContainer = styled.div`
    display: flex;
    margin-top: 15px;
    & > button {
        margin-right: 5px;
    }
`
const language = chooseLanguage()

const url = `https://koronawirus.lol/${language !== "pl" ? language : ""}`

const ShareButtons = ({ }) => (
    <>
        <ShareButtonContainer>
            <FacebookShareButton url={url}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <button className="react-share__ShareButton" style={{ background: 'white', border: 0, margin: 0, paddingLeft: 0 }} onClick={() => {
                window.location.href = `fb-messenger://share?link=${url}`
            }}>
                <FacebookMessengerIcon size={32} round />
            </button>
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