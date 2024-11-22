import { Table } from "flowbite-react";
import React from "react";

export default function TableDashboard({ data, encabezado1, encabezado2 }) {
  return (
    <Table>
      <Table.Head>
        <Table.HeadCell className="w-2/4">{encabezado1}</Table.HeadCell>
        <Table.HeadCell className="w-1/5">{encabezado2}</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {data.map((item, index) => (
          <Table.Row key={index}>
            <Table.Cell className="w-2/4">{item.name}</Table.Cell>
            <Table.Cell className="w-1/5">{item.count}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
