import style from '../styles/Footer.module.scss';

const FooterComponent = () => {
    return (
       
        <div><footer className={style.footersection}> 
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <h3>KONTAKT OSS</h3>
              <ul>
                <li><a href='mailto:post@zonzadesign.no'>post@zonzadesign.no</a></li>
                <li><a href='tel:+47404040'>+47404040</a></li> 
              </ul>
            </div>
            <div className='col-md-3'>
              <h3>FØLG OSS</h3>
              <ul>
                <li><a href='https://www.instagram.com/zonzadesign/'>Instagram</a></li>
              </ul>
            </div>
            <div className='col-md-3'>
              {/* <h3>FOLLOW US</h3>
              <ul>
                <li><a href='#'>Facebook</a></li>
                <li><a href='#'>Twitter</a></li>
                <li><a href='#'></a></li>
              </ul> */}
            </div>
            <div className='col-md-3'>
              {/* <div className='footerlogo'>
                <img alt='logo' src='images/logo.png' />
              </div> */}
            </div>
          </div>
        </div>            
    </footer>
    <div className={style.copyright}>
        <div className='container'>
          <p>zonzadesign © Copyright - All Rights Reserved.</p>
        </div>
        </div></div>
    )
}
export default FooterComponent;
