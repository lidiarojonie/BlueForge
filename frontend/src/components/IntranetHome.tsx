import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext.tsx';

import Placeholder from '../imgs/placeholder.png'

function IntranetHome() {
    const navigate = useNavigate();
    const { customer: user } = useUser();

    

    return (
        <div className="intranet-home">
            
            <div className="bienvenida-intranet">
            <h2>¡Bienvenido/a, {user?.username ?? "empleado"}!</h2>
            <p>
                Esta es la zona privada de la empresa. Desde aquí puedes gestionar
                tus fichajes, consultar tu historial de actividad y conocer mas acerca de nuestra empresa y sus políticas.
            </p>
            </div>
            <div className="welcome-card">
                <div className="welcome-text">
                    <h2>¿Quienes somos?</h2>
                    <p>
                        Somos una empresa dedicada a la customización de mandos para 
                        videojuegos, ofeciendo a nuestros clientes la posibilidad de 
                        personalizarlos con diseños únicos y exclusivos. Nuestro 
                        objetivo es dar una experiencia de juego personalizada en la que
                        los jugadores puedan expresar su estilo y personalidad a través de sus mandos.    
                    </p>
                </div>
                <img src={Placeholder} alt="Imagen de bienvenida" className="welcome-image" />
            <button className="intranet-action-button" onClick={() => navigate('/intranet/fichajes')}>Ir a Fichajes</button>
            </div>

        </div>
    );
}

export default IntranetHome;
