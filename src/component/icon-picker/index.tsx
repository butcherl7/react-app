import React from "react";
import * as AntIcon from "@ant-design/icons";
import { Card, List, Tabs, TabsProps } from "antd";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";

const { Meta } = Card;

import styles from "./index.module.scss";

type IconName = keyof typeof AntIcon;
type RefIcon = React.ForwardRefExoticComponent<Omit<AntdIconProps, "ref"> & React.RefAttributes<HTMLSpanElement>>;

const IconPicker: React.FC = () => {
  const keys = Object.keys(AntIcon).sort((a, b) => a.localeCompare(b));

  const outlineds: RefIcon[] = [],
    filleds: RefIcon[] = [],
    twoTones: RefIcon[] = [];

  const iconMap: Map<string, RefIcon> = new Map();

  for (const key of keys) {
    let icon = AntIcon[key as IconName] as RefIcon;
    if (key.endsWith("Outlined")) {
      outlineds.push(icon);
    } else if (key.endsWith("Filled")) {
      filleds.push(icon);
    } else if (key.endsWith("TwoTone")) {
      twoTones.push(icon);
    } else {
      continue;
    }
    iconMap.set(key, icon);
  }

  const tabItems: TabsProps["items"] = [
    {
      label: "线框风格",
      key: "outlineds",
      children: (
        <div>
          <List
            grid={{ gutter: 16, xs: 2, sm: 4, md: 5, lg: 6, xl: 8, xxl: 10 }}
            dataSource={outlineds}
            renderItem={(Icon) => (
              <List.Item>
                <Card hoverable className={styles.card}>
                  <Icon />
                  <Meta description={Icon.displayName} />
                </Card>
              </List.Item>
            )}
          ></List>
        </div>
      ),
    },
    {
      label: "实底风格",
      key: "filleds",
      children: (
        <div>
          {filleds.map((Icon) => (
            <Icon key={Icon.displayName} />
          ))}
        </div>
      ),
    },
    {
      label: "双色风格",
      key: "twoTones",
      children: (
        <div>
          {twoTones.map((Icon) => (
            <Icon key={Icon.displayName} />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="outlineds" items={tabItems} />
    </div>
  );
};

export default IconPicker;
