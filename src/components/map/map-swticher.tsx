import { useState } from "react";

const styles = [
  { id: "streets-v12", label: "Steet" },
  { id: "light-v11", label: "Light" },
  { id: "dark-v11", label: "Dark" },
  { id: "satellite-streets-v12", label: "Sputnik" },
];

export function MapStyleSwitcher({
  onChange,
  initial = "streets-v12",
}: {
  onChange: (styleId: string) => void;
  initial?: string;
}) {
  const [selected, setSelected] = useState(initial);

  const handleChange = (id: string) => {
    setSelected(id);
    onChange(id);
  };

  return (
    <div
      className="bg-background"
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        borderRadius: 6,
        padding: "4px 6px",
        fontSize: 11,
        zIndex: 1,
      }}
    >
      <RadioGroup
        orientation="horizontal"
        size="sm"
        value={selected}
        onValueChange={(v) => handleChange(v)}
      >
        {styles.map((style) => (
          <Radio key={style.id} value={style.id}>
            {style.label}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
}

import { Radio, RadioGroup } from "@heroui/react";

export default function App() {
  return (
    <RadioGroup label="Select your favorite city">
      <Radio value="buenos-aires">Buenos Aires</Radio>
      <Radio value="sydney">Sydney</Radio>
      <Radio value="san-francisco">San Francisco</Radio>
      <Radio value="london">London</Radio>
      <Radio value="tokyo">Tokyo</Radio>
    </RadioGroup>
  );
}
