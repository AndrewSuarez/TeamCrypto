import Header from './containers/homepage/header';
import Feature from './containers/homepage/feature';
import About from './containers/homepage/aboutUs';
import Presentation from './containers/homepage/presentation';
import aboutimage from './assets/images/Frame 19.png';
import aboutimage1 from './assets/images/download.png';
import SignIn from './containers/login';

// Codigo de colores de la app:
/* 
   Blanco     E5D8D1 
   Azul claro 5B88C6
   Morado     4B2B95
   Purpura    56579F
   Azul Dark  0C0F2A
*/

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <Header />
        <Feature />
        <About
          image={aboutimage}
          tittle="Comes with all you need for daily life"
          button="Probar ahora"
        />
      </header> */}
      <SignIn />
    </div>
  );
}

export default App;
