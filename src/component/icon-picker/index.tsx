import VirtualList from "rc-virtual-list";
import React, { useRef, useState } from "react";
import { Card, Flex, GetProps, Input, List, theme } from "antd";

import { AllIconsName, IconPickerProps, RefIcon, getIconByName } from "./util";
import styles from "./index.module.scss";

type SearchProps = GetProps<typeof Input.Search>;

const IconPicker: React.FC<IconPickerProps> = (props) => {
  const [iconNams, setIconNams] = useState(AllIconsName);
  const lastPickedCard = useRef<HTMLDivElement>();

  const {
    token: { controlItemBgActive },
  } = theme.useToken();

  const {
    width,
    height,
    columns = 8,
    showPickedBg = true,
    searchWidth = "100%",
    iconJustify = "space-between",
    onPick,
  } = props;

  const handleSerch: SearchProps["onSearch"] = (value) => {
    setIconNams(AllIconsName.filter((key) => key.toLowerCase().includes(value.toLowerCase())));
  };

  const handleClick = (icon: RefIcon, e: React.MouseEvent<HTMLDivElement>) => {
    const currentCard = e.currentTarget;
    const lastCard = lastPickedCard.current;

    if (lastCard?.dataset["iconName"] === currentCard.dataset["iconName"]) return;

    lastPickedCard.current = currentCard;
    onPick && onPick(icon);

    if (!showPickedBg) return;

    if (lastCard) lastCard.style.backgroundColor = "";
    currentCard.style.backgroundColor = controlItemBgActive;
  };

  return (
    <div>
      <Input.Search allowClear onSearch={handleSerch} style={{ width: searchWidth }} />
      <List style={{ width: width }}>
        <VirtualList
          height={height}
          itemHeight={75}
          itemKey={(row) => row.map((i) => i.displayName).join("-")}
          data={subgroup(
            iconNams.map((name) => getIconByName(name)),
            columns
          )}
        >
          {(iconRow) => (
            <List.Item>
              <Flex justify={iconJustify} style={{ width: "100%" }}>
                {iconRow.map((Icon) => (
                  <Card
                    hoverable
                    key={Icon.displayName}
                    className={styles.card}
                    data-icon-name={Icon.displayName}
                    onClick={(e) => handleClick(Icon, e)}
                  >
                    <Icon />
                    <Card.Meta description={<span title={Icon.displayName}>{Icon.displayName}</span>} />
                  </Card>
                ))}
              </Flex>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </div>
  );
};

function subgroup<T>(arr: T[], size: number) {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default IconPicker;
export type { IconPickerProps, RefIcon };
