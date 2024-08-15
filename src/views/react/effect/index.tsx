import { FrownTwoTone, SmileTwoTone } from "@ant-design/icons";
import { Switch } from "antd";
import { useEffect, useState } from "react";

export default function Effect() {
  const [emotion, setEmotion] = useState(true);

  useEffect(() => {
    console.log(123);
  }, []);

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
