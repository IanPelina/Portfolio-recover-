import './Cover.scss';

export default function Cover({detailsWork}) {

    return (
        <>
            <figure className="snip1577">
                <img src={detailsWork.cover} alt="sample99" />
                <figcaption>
                    <h1 className='context-title'>{detailsWork.title}</h1>
                    <div className='context-container' style={{padding: 30  }}>
                        {detailsWork.context.map((contextText, index) => <p key={index}>{contextText}</p>)}
                        <a className='github-link' href={detailsWork.path}><img id='github-pic' src='/images/logo-github.png' alt='logo'/></a>  
                    </div>
                </figcaption>
            </figure>
        </>
    )
}