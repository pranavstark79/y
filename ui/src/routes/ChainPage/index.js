import { Space, Table, Tag, Button } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
const { io } = require("socket.io-client");
const SERVER_URL = `http://localhost:5000`;

const socket = io(SERVER_URL);

socket.on("connect", () => {
  const status = socket.connected;
  console.log(`Socket connected`, status);
});

socket.on("disconnect", () => {
  const status = socket.connected;
  console.log(`Socket Connected`, status);
});

const ChainPage = () => {
  const [lotsData, setLotsData] = useState({});
  const [chainData, setChainData] = useState([
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
  ]);
  // const [amount, setAmount] = useState(0);

  const fetchChainData = () => {
    socket.on("data", (optionData) => {
      const { data } = optionData;
      setChainData(data);
    });
  };

  useEffect(() => {
    fetchChainData();
  }, []);

  const handleLotCount = (input) => {
    const { index, type, action } = input;
    setLotsData((prevState) => {
      const key = `${type}_${index}`;
      if (action === "increase") {
        return {
          ...prevState,
          [key]: prevState[key] ? (prevState[key] = prevState[key] + 1) : 1,
        };
      }
      if (action === "decrease") {
        return {
          ...prevState,
          [key]: prevState[key] ? (prevState[key] = prevState[key] - 1) : 0,
        };
      }
    });
    console.log(lotsData);
    // setLotsData(lotsData);
  };

  const columns = [
    {
      title: "CALL PRICE",
      dataIndex: "callPrice",
      key: "callprice",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "LOTS",
      key: "LOTS_CALL",
      render: (text, record, index) => (
        <Space size="middle">
          <MinusCircleOutlined
            style={{ fontSize: "21px", color: "#08c" }}
            onClick={() =>
              handleLotCount({ index, type: "call", action: "decrease" })
            }
          />
          <span>
            {lotsData[`call_${index}`] ? lotsData[`call_${index}`] : 0}
          </span>
          <PlusCircleOutlined
            style={{ fontSize: "21px", color: "#08c" }}
            onClick={() =>
              handleLotCount({ index, type: "call", action: "increase" })
            }
          />
        </Space>
      ),
    },
    {
      title: "AMOUNT",
      key: "AMOUNT",
      render: () => <Space size="large">{0}</Space>,
    },
    {
      title: "ACTION",
      key: "ACTION",
      render: () => (
        <Space size="middle">
          <Button size="middle" type="primary">
            Buy
          </Button>
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
      key: "LOTS_PUT",
      render: (text, record, index) => {
        // console.log("::::", text, record, index);
        return (
          <Space size="middle">
            <MinusCircleOutlined
              style={{ fontSize: "21px", color: "#08c" }}
              onClick={() =>
                handleLotCount({ index, type: "put", action: "decrease" })
              }
            />
            <span>
              {lotsData[`put_${index}`] ? lotsData[`put_${index}`] : 0}
            </span>
            <PlusCircleOutlined
              style={{ fontSize: "21px", color: "#08c" }}
              onClick={() =>
                handleLotCount({ index, type: "put", action: "increase" })
              }
            />
          </Space>
        );
      },
    },

    {
      title: "ACTION",
      key: "ACTION",
      render: () => (
        <Space size="middle">
          <Button size="middle" type="primary">
            Buy
          </Button>
        </Space>
      ),
    },
    {
      title: "AMOUNT",
      key: "AMOUNT",
      render: () => <Space size="large">{0}</Space>,
    },
  ];
  // const data = [
  //   {
  //     key: "1",
  //     callPrice: "200.90",
  //     strikePrice: "19500",
  //     putPrice: "26.10",
  //   },
  //   {
  //     key: "2",
  //     callPrice: "251.90",
  //     strikePrice: "19550",
  //     putPrice: "26.10",
  //   },
  //   {
  //     key: "3",
  //     callPrice: "301.90",
  //     strikePrice: "19600",
  //     putPrice: "26.10",
  //   },
  //   {
  //     key: "4",
  //     callPrice: "321.90",
  //     strikePrice: "19650",
  //     putPrice: "26.10",
  //   },
  //   {
  //     key: "5",
  //     callPrice: "431.90",
  //     strikePrice: "19700",
  //     putPrice: "26.10",
  //   },
  //   {
  //     key: "6",
  //     callPrice: "521.90",
  //     strikePrice: "19750",
  //     putPrice: "26.10",
  //   },
  //   {
  //     key: "7",
  //     callPrice: "601.90",
  //     strikePrice: "19800",
  //     putPrice: "26.10",
  //   },
  // ];

  return (
    <div style={{ display: "flex" }}>
      <Table columns={columns} dataSource={chainData} />
    </div>
  );
};

export default ChainPage;
