/**
 * Table Component
 * Reusable data table component
 */

import React from "react";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: unknown, item: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  onRowClick?: (item: T) => void;
}

export const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  keyField,
  onRowClick,
}: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={String(row[keyField])}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-gray-200 ${
                onRowClick ? "cursor-pointer hover:bg-gray-50" : ""
              }`}
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="px-6 py-3 text-sm text-gray-900">
                  {col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
