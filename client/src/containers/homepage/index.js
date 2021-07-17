import Header from "./header";
import Feature from "./feature";
import About from "./aboutUs";
import Presentation from "./presentation";
import aboutimage from "../../assets/images/Frame 19.png";
import aboutimage1 from "../../assets/images/download.png";

// Codigo de colores de la app:
/* 
   Blanco     E5D8D1 
   Azul claro 5B88C6
   Morado     4B2B95
   Purpura    56579F
   Azul Dark  0C0F2A
*/

function Homepage() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Feature />
        <About
          image={aboutimage}
          tittle="Comes with all you need for daily life"
          button="Probar ahora"
        />
      </header>
    </div>
  );
}

export default Homepage;
