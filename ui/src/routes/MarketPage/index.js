import React, { Fragment } from "react";
// import IntlMessages from "util/IntlMessages";
import DefaultCard from "../../components/Card";
import midcapImg from "../../assets/img/midcap.png";
import finniftyImg from "../../assets/img/finnifty.png";
import bankniftyImg from "../../assets/img/banknifty.png";
import niftyImg from "../../assets/img/nifty.png";
import sensexImg from "../../assets/img/sensex.png";


const MarketPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <DefaultCard
        pageLink={"/security"}
        width={200}
        title="MidCapNifty"
        description={"Expiry: Monday"}
        imgSrc={midcapImg}
      />

      <DefaultCard
        pageLink={"/security"}
        width={200}
        title="FinNifty"
        description={"Expiry: Tuesday"}
        imgSrc={finniftyImg}
      />

      <DefaultCard
        pageLink={"/security"}
        width={200}
        title="BankNifty"
        description={"Expiry: Wednesday"}
        imgSrc={bankniftyImg}
      />

      <DefaultCard
        pageLink={"/market"}
        width={200}
        title="Nifty"
        description={"Expiry: Thursday"}
        imgSrc={niftyImg}
      />

      <DefaultCard
        pageLink={"/security"}
        width={200}
        title="Sensex"
        description={"Expiry: Friday"}
        imgSrc={sensexImg}
      />
    </div>
  );
};

export default MarketPage;
