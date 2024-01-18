import './Projects.scss';

import ProjectsCard from '../ProjectsCard/ProjectsCard';

import React, { useEffect, useState } from 'react';

import api from '../../axios';

export default function Projects() {

  // Ici on initialise works a un tableau vide
  const [works, setWorks] = useState([]);

  // On effectue une requête GET pour récupérer les données
  useEffect(() => {
    api.get('/works', { withCredentials: true })
      .then(response => {
        setWorks(response.data.works);
      })
      // Ici works correspondra au body de la réponse renvoyé, à savoir un tableau des projets
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);

  return (
    // Avec la méthode (.map) on inqique que pour chaque élement du tableau works alors il renverra le composant ProjectsCard
    <>
      <h1>Mes projets</h1>
      <div className="projects-cards">
        {works.map(work =>
          <ProjectsCard key={work.id} work={work} skills={work.skills} />
        )}
      </div>
    </>
  );
}