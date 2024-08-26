import { IconPicker } from "@/component";
import { RefIcon } from "@/component/icon-picker";
import { Select, SelectProps } from "antd";
import { useState } from "react";

export default function View() {
  const [val, setVal] = useState<RefIcon>();
  const [open, setOpen] = useState(false);

  const handlePick = (icon: RefIcon) => {
    setVal(icon);
    setOpen(false);
  };

  const labelRender: SelectProps["labelRender"] = () => {
    const Icon = val!;
    return (
      <span>
        <Icon /> {val?.displayName}
      </span>
    );
  };

  return (
    <Select
      value={val}
      open={open}
      style={{ width: 300 }}
      labelRender={labelRender}
      popupMatchSelectWidth={false}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
      placeholder="Pick you icon"
      dropdownRender={() => (
        <IconPicker
          width={450}
          height={300}
          columns={4}
          showPickedBg={false}
          iconJustify="space-evenly"
          onPick={handlePick}
        />
      )}
    />
  );
}
