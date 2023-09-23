import React from 'react';
import {Card} from 'antd';

const { Meta } = Card;

const DefaultCard = ({width, altText, imgSrc, avatarSrc, title, description, pageLink}) =>{
  
    return (
      
        <Card
          style={{ width, margin: "0.5%" }}
          cover={<a href={pageLink}><img alt={altText} src={imgSrc} /></a>}
        >
          
          <Meta title={title} description={description} />
        </Card>
    
    );
}

export default DefaultCard;