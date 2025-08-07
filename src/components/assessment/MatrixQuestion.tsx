import { QuestionOption } from "@/types/assessment";

interface MatrixQuestionProps {
  rows: QuestionOption[];
  columns: QuestionOption[];
  value: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
}

export function MatrixQuestion({ rows, columns, value, onChange }: MatrixQuestionProps) {
  const handleChange = (rowValue: string, columnValue: string) => {
    onChange({ ...value, [rowValue]: columnValue });
  };

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left"></th>
            {columns.map((col) => (
              <th key={col.value} className="px-4 py-2 text-center text-sm font-medium">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.value} className="border-t">
              <td className="pr-4 py-2 text-sm">{row.label}</td>
              {columns.map((col) => (
                <td key={col.value} className="text-center py-2">
                  <input
                    type="radio"
                    id={`${row.value}-${col.value}`}
                    name={row.value}
                    value={col.value}
                    checked={value[row.value] === col.value}
                    onChange={() => handleChange(row.value, col.value)}
                    className="h-4 w-4 border-primary text-primary focus:ring-primary"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
