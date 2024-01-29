import { readContracts } from "wagmi";

export const checkTicket = async (gameTicketContract, address) => {
  const data = await readContracts({
    contracts: [
      {
        ...gameTicketContract,
        functionName: "balanceOf",
        args: [address, 1],
      },
      {
        ...gameTicketContract,
        functionName: "balanceOf",
        args: [address, 2],
      },
      {
        ...gameTicketContract,
        functionName: "balanceOf",
        args: [address, 3],
      },
      {
        ...gameTicketContract,
        functionName: "getNumberOfLives",
        args: [1],
      },
      {
        ...gameTicketContract,
        functionName: "getNumberOfLives",
        args: [2],
      },
      {
        ...gameTicketContract,
        functionName: "getNumberOfLives",
        args: [3],
      },
    ],
  });

  return mapTicket(data);
};

export const mapTicket = (data) => {
  return [
    {
      name: "BRONZE",
      amount: data[0].status === "success" ? data[0].result.toString() : "0",
      numberOfLives:
        data[3].status === "success" ? data[3].result.toString() : "2",
      type: 1,
    },
    {
      name: "SILVER",
      amount: data[1].status === "success" ? data[1].result.toString() : "0",
      numberOfLives:
        data[4].status === "success" ? data[4].result.toString() : "5",
      type: 2,
    },
    {
      name: "GOLD",
      amount: data[2].status === "success" ? data[2].result.toString() : "0",
      numberOfLives:
        data[5].status === "success" ? data[5].result.toString() : "10",
      type: 3,
    },
  ];
};
