import { useState } from "react";
import { IconPicker } from "@/component";
import { Divider, Select, SelectProps } from "antd";
import { RefIcon } from "@/component/icon-picker";

export default function View() {
  const [val, setVal] = useState<RefIcon>();
  const [open, setOpen] = useState(false);

  const handlePick = (icon: RefIcon) => {
    setVal(icon);
    setOpen(false);
  };

  const labelRender: SelectProps["labelRender"] = () => {
    if (val) {
      const Icon = val;
      return (
        <span>
          <Icon /> {val.displayName}
        </span>
      );
    }
  };

  return (
    <div>
      <Select
        value={val}
        open={open}
        style={{ width: 200 }}
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

      <Divider />

      <IconPicker height={400} />
    </div>
  );
}
