import logo from '../../../assets/imagenes/LOGO-LOGISTIC.webp';
import fondo from '../../../assets/imagenes/background-login.webp';

export const LoginLayout = ({children, title=''}) =>{
    return(
        <main className="grid grid-cols-1 md:grid-cols-[1fr_,35%]  h-screen ">
         {/* IMAGEN DE FONDO */}
         <section className="hidden md:block">
            <img src={fondo} className="w-full h-full object-cover" alt="Fondo"/>
         </section>
            {/* FRMULARIO */}
           
                <section className="p-4 overflow-auto">

                
                 <img src={logo} alt="logo" className="h-20 mb-4 mx-auto"/>
           
                <h2 className="text-black text-lg md:text-lg pt-2 text-center mb-5 md:mb-2 mt-4">{title}</h2>
                  {children}   
                </section>
 
        </main>
    )
}