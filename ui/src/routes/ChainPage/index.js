import { Space, Table, Tag, Button } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

const ChainPage = () => {
  const [callLotsCount, setCallLotsCount] = useState(0);
  const [putLotsCount, setPutLotsCount] = useState(0);
  const [amount, setAmount] = useState(0);

  const handleLotCount = (input) => {
    const {type, action} = input;
    if(type === 'call' && action === 'increase' ){
      setCallLotsCount(callLotsCount + 1);
    }
    if(type === 'call' && action === 'decrease'  && callLotsCount > 0){
      setCallLotsCount(callLotsCount - 1);
    }

    if(type === 'put' && action === 'increase' ){
      setPutLotsCount(putLotsCount + 1);
    }
    if(type === 'put' && action === 'decrease'  && callLotsCount > 0){
      setPutLotsCount(putLotsCount - 1);
    }
  }

  const columns = [
    {
      title: "CALL PRICE",
      dataIndex: "callPrice",
      key: "callprice",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "LOTS",
      key: "LOTS",
      render: () => (
        <Space size="middle">
          <MinusCircleOutlined style={{ fontSize: "21px", color: "#08c" }} onClick={() => handleLotCount({type: 'call', action: 'decrease'})}/>
          <span>{callLotsCount}</span>
          <PlusCircleOutlined style={{ fontSize: "21px", color: "#08c" }} onClick={() => handleLotCount({type: 'call', action: 'increase'})}/>
        </Space>
      ),
    },
    {
      title: "ACTION",
      key: "ACTION",
      render: () => (
        <Space size="middle">
          <Button size="middle" type="primary">Buy</Button>
        </Space>
      ),
    },

    {
      title: "STRIKE PRICE",
      dataIndex: "strikePrice",
      key: "strikeprice",
      render: (text) => <span style={{ fontSize: "18px" }}>{text}</span>,
    },
    {
      title: "PUT PRICE",
      dataIndex: "putPrice",
      key: "putprice",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "LOTS",
      key: "LOTS",
      render: () => (
        <Space size="middle">
          <MinusCircleOutlined style={{ fontSize: "21px", color: "#08c" }} onClick={() => handleLotCount({type: 'put', action: 'decrease'})}/>
          {putLotsCount}
          <PlusCircleOutlined style={{ fontSize: "21px", color: "#08c" }} onClick={() => handleLotCount({type: 'put', action: 'increase'})}/>
        </Space>
      ),
    },

    {
      title: "ACTION",
      key: "ACTION",
      render: () => (
        <Space size="middle">
          <Button size="middle" type="primary">Buy</Button>
        </Space>
      ),
    },
    {
      title: "AMOUNT",
      key: "AMOUNT",
      render: () => (
        <Space size="large">
          {amount}
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      callPrice: "200.90",
      strikePrice: "19500",
      putPrice: "26.10",
    },
    {
      key: "2",
      callPrice: "251.90",
      strikePrice: "19550",
      putPrice: "26.10",
    },
    {
      key: "3",
      callPrice: "301.90",
      strikePrice: "19600",
      putPrice: "26.10",
    },
    {
      key: "4",
      callPrice: "321.90",
      strikePrice: "19650",
      putPrice: "26.10",
    },
    {
      key: "5",
      callPrice: "431.90",
      strikePrice: "19700",
      putPrice: "26.10",
    },
    {
      key: "6",
      callPrice: "521.90",
      strikePrice: "19750",
      putPrice: "26.10",
    },
    {
      key: "7",
      callPrice: "601.90",
      strikePrice: "19800",
      putPrice: "26.10",
    },
  ];
  return (
    <div style={{ display: "flex" }}>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ChainPage;
