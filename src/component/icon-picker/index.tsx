import React, { useRef, useState } from "react";
import { Card, GetProps, Input, theme } from "antd";

import styles from "./index.module.scss";
import { AppIconNames, IconPickerProps, RefIcon, getIconByName } from "./util";

type SearchProps = GetProps<typeof Input.Search>;

const IconPicker: React.FC<IconPickerProps> = (props) => {
  const [iconNams, setIconNams] = useState(AppIconNames);
  const lastPickedCard = useRef<HTMLDivElement>();

  const {
    token: { controlItemBgActive },
  } = theme.useToken();

  const { width, height, showPickedBg = true, showSearch = false, searchWidth = "100%", onPick } = props;

  const handleSearch: SearchProps["onSearch"] = (value) => {
    setIconNams(AppIconNames.filter((key) => key.toLowerCase().includes(value.toLowerCase())));
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

  const wrapperStyle: React.CSSProperties = { overflowY: "auto" };
  if (width !== undefined) wrapperStyle.width = width;
  if (height !== undefined) wrapperStyle.height = height;

  return (
    <div style={wrapperStyle}>
      <div hidden={!showSearch} className={styles["search-bar"]}>
        <Input.Search allowClear onSearch={handleSearch} style={{ width: searchWidth }} />
      </div>

      <div className={styles["card-container"]}>
        {iconNams
          .map((name) => getIconByName(name))
          .filter((icon) => !!icon)
          .map((Icon) => (
            <Card
              hoverable
              key={Icon.displayName}
              className={styles.card}
              data-icon-name={Icon.displayName}
              onClick={(e) => handleClick(Icon, e)}
            >
              <Icon />
              <Card.Meta description={Icon.displayName} />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default IconPicker;
export type { IconPickerProps, RefIcon };
