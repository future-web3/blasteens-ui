import { readContracts } from "wagmi";

export const checkTicket = async (gameTicketContract) => {
  const data = await readContracts({
    contracts: [
      {
        ...gameTicketContract,
        functionName: "BRONZE",
      },
      {
        ...gameTicketContract,
        functionName: "SILVER",
      },
      {
        ...gameTicketContract,
        functionName: "GOLD",
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
