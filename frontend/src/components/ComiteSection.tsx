import React from 'react';
import './intranet.css';

import Placeholder from '../imgs/placeholder.png';

const ComiteSection: React.FC = () => {
    return (
        <div className="comite-section">
            <div className="comite-header">
            <div className="organigrama">
                <h2>COMITÉ DE EMPRESA</h2>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHN4vtaC3uXTm3Hxmhw2NXB0_LWJfYjtXa9g&s" alt="Icono de comité" className="comite-icon" />
            </div>

                <h2>DOCUMENTOS DE INTERÉS</h2>
                <p>Información relevante para el empleado, convenios y horarios.</p>
            </div>

            <div className="comite-grid">
                <div className="comite-card">
                    <h2 className="comite-card-title">CONVENIO COLECTIVO</h2>
                    <p>Consulta el convenio colectivo vigente aplicable a tu categoría profesional.</p>
                    <button className="intranet-action-button" onClick={() => window.open("https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1309373420303", "_blank")}>
                        Ver Documento
                    </button>
                </div>

                <div className="comite-card">
                    <h2 className="comite-card-title">ESTATUTO DE LOS TRABAJADORES</h2>
                    <p>Accede al marco legal que regula los derechos y deberes fundamentales en el ámbito laboral.</p>
                    <button className="intranet-action-button">Consultar Ley</button>
                </div>

                <div className="comite-card">
                    <h2 className="comite-card-title">CALENDARIO LABORAL</h2>
                    <p>Visualiza los festivos nacionales, locales y de empresa para el presente año.</p>
                    <button className="intranet-action-button">Ver Calendario</button>
                </div>

            </div>
        </div>
    );
};

export default ComiteSection;
