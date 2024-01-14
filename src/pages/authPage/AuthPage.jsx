import './AuthPage.css'
import authBotImg from '../../assets/auth_bot.jpg'
import metamaskIcon from '../../assets/wallets_icons/metamask_icon.svg'

function AuthPage() {
    return <div className='AuthPage'>
        <div className='AuthPageLeftSection'>
            <img className='AuthPic' src={authBotImg}></img>
        </div>
        <div className='AuthPageRightSection'>
            <div className='AuthPageRightSectionWrapper'>
                <div className='WelcomeTitle'>WELCOME TO BITPAZAAR</div>
                <div className='WelcomeSlogan'>An NFT marketplace focused on providing low fees and social utilities</div>
                <div className='ConnectNowText'>Connect Now:</div>
                <div className='ConnectButton'>
                    <img src={metamaskIcon} className='WalletIcon' />
                    <div className='ConnectButtonText'> Connect Using Metamask</div>
                </div>
                <div className='AuthFooterText'>* More authentication methods are on their way</div>
            </div>
        </div>
    </div>
}

export default AuthPage;
