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
    ],
  });

  if (
    data[0].status === "success" &&
    data[1].status === "success" &&
    data[2].status === "success"
  ) {
    return mapTicket(data);
  }
  return [];
};

export const mapTicket = (data) => {
  return [
    { name: "BRONZE", amount: data[0].result.toString() },
    { name: "SILVER", amount: data[1].result.toString() },
    { name: "GOLD", amount: data[2].result.toString() },
  ];
};
