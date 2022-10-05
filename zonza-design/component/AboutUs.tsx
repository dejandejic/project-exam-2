import style from '../styles/AboutUs.module.scss';
import 'bootstrap/dist/css/bootstrap.css';

const AboutUsComponent = () => {
    return (
        <div>
            
  <div className='container'>
        <div className='row mt-5'> 
            <div className='col-md-6 bottmtex'>
            <div className={style.aboutuscontant}>
                <h4>VÅR HISTORIE</h4>
                 <p>Siden 2020 har ZONZA DESIGN nærmet interiørdesign med en helt
klientfokusert tilnærming. De har sammen med deres unike,
personlige design, gjort boliger mer tiltrekkende for markedet.</p>
        <p>Dette er bare en av de mange grunnene til at de er en så populær
Interiørdesigner med fornøyde kunder.</p>
        <p>Ved å kombinere lidenskapen for flott design, kunst og arkitektur
har de utviklet et rykte for å skape vakre, men funksjonelle rom.</p>
<p>Kontakt ZONZA DESIGN i dag for å lære hvordan de kan forvandle
rommet ditt til ditt drømmeinteriør.</p>
               
                 <div className={style.aboutusbuttan}>
                 <a href='/portfolio' className='viewmore hoverbott'>SE PROSJEKTER</a>  
                    </div>

          <div className='row mt-5'>
          <h4>MØT TEAMET</h4>
                <div className='col-md-4'>  
                <div className={style.aboutusrightimg}> 
                <img src="images/najomza.jpeg"></img>  
                <h5>Njoma Selimi</h5>
                </div>
                </div>

                <div className='col-md-4'> 
                <div className={style.aboutusrightimg}> 
               <img src="images/arizona.jpeg"></img>  
               <h5>Arizona Dobra</h5>
              </div>
                </div>
                <div className='col-md-4'> </div>


           </div>




            </div> 
            </div>

            <div className='col-md-6 order1'>
               <div className='aboutusleftimg'>
               <img src="images/about.jpg"></img>  
              </div>
               




           </div>
  
        </div>
        </div>




        </div>
    )
}
export default AboutUsComponent;
