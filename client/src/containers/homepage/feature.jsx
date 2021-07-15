import React from 'react';
import FeatureBox from './featureBox';
import featureimage from '../../assets/images/feature_1.png';
import featureimage1 from '../../assets/images/feature_2.png';
import featureimage2 from '../../assets/images/feature_3.png';

const Feature = () => {
  return (
    <div id="features">
      <div className="a-container">
        <FeatureBox
          image={featureimage}
          title="Trabajo Remoto"
          description="Ideas para equipos de trabajo que funcionen remotamente"
        />
        <FeatureBox
          image={featureimage1}
          title="Comunicacion 24/7"
          description="Ahora cada miembro puede saber que tareas tiene y mantenerse organizados"
        />
        <FeatureBox
          image={featureimage2}
          title="Roles"
          description="Con los roles se diversifica la participacion en el chat con distintas funciones para cada rol"
        />
      </div>
    </div>
  );
};

export default Feature;
