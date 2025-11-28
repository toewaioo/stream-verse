import React from "react";

export default function DataTable({ columns, data, actions }) {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th
                            key={col.key}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                            {col.label}
                        </th>
                    ))}
                    {actions && (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Actions
                        </th>
                    )}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row) => (
                    <tr key={row.id}>
                        {columns.map((col) => (
                            <td
                                key={col.key}
                                className="px-6 py-4 whitespace-nowrap"
                            >
                                {row[col.key]}
                            </td>
                        ))}
                        {actions && (
                            <td className="px-6 py-4 whitespace-nowrap">
                                {actions(row)}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
