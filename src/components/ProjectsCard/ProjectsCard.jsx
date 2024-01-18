import './ProjectsCard.scss';

import { Link } from 'react-router-dom';

export default function ProjectsCard({work, skills}) {

    return (
        <div className="card">
            <h3 className='tracking-out-expand'>{work.title}</h3>
            <div className='hover-content'>
                <p>{work.title}</p>
                <p className='hover-description'>{work?.description}</p>
                <Link to={`/detailsWork/${work.id}`} className='hover-button'>Voir plus</Link>
                <div className='skills-pics'>
                    {skills?.map((skill, index) =>
                        <div className="skill" key={index}>
                            <img className='skills-pic' src={skill} alt={index} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}