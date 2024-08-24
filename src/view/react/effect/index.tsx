import { useState } from "react";
import { Divider, Select, Switch } from "antd";
import { FrownTwoTone, SmileTwoTone } from "@ant-design/icons";

export default function View() {
  const [name, setName] = useState<string>("lucy");

  const options = [
    { value: "jack", label: "Jack" },
    { value: "lucy", label: "Lucy" },
    { value: "Yiminghe", label: "yiminghe" },
  ];

  return (
    <div>
      <Select value={name} options={options} onChange={(value) => setName(value)} style={{ width: 120 }} />
      <p>My name is {name}</p>
      <Divider />
      <Effect />
    </div>
  );
}

function Effect() {
  const [emotion, setEmotion] = useState(true);

  console.log(123);

  return (
    <div>
      <Switch
        checkedChildren="Happy"
        unCheckedChildren="Sad"
        defaultChecked={emotion}
        onChange={(state) => setEmotion(state)}
      ></Switch>

      <div style={{ fontSize: 64 }}>{emotion ? <SmileTwoTone /> : <FrownTwoTone />}</div>
    </div>
  );
}
