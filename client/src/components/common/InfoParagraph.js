import React from 'react'

const InfoParagraph = ({divClassName, paragraphs}) => {
    return (
        <div className={divClassName}>
            {
                paragraphs.length && paragraphs.map((text, i) => (
                    <p key={i}>
                        <span><i className="fas fa-info-circle"></i></span>
                        {text}
                    </p>
                ))
            }         
        </div>          
    )
}

export default InfoParagraph
