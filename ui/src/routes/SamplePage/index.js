import React, { Fragment } from "react";
// import IntlMessages from "util/IntlMessages";
import DefaultCard from "../../components/Card";
import marketImg from "../../assets/img/market.webp";
import securityImg from "../../assets/img/protection-shield.png";
import { FolderOpenTwoTone } from "@ant-design/icons";

const SamplePage = () => {

  return (
    <div style={{ display: "flex" }}>
      
        <DefaultCard
          pageLink={'/market'}
          width={200}
          title="Market"
          description={"Analysis & Investing"}
          imgSrc={marketImg}
        />
    

     
        <DefaultCard
        pageLink={'/security'}
          width={200}
          title="Security"
          description={"Security & Access"}
          imgSrc={securityImg}
        />
    
    </div>
  );
};

export default SamplePage;
