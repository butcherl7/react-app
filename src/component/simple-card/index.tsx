import React from "react";
import { theme } from "antd";

type SimpleCardProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * 一个带有边框的 div 容器。
 */
const SimpleCard = React.forwardRef<HTMLDivElement, SimpleCardProps>((props, ref) => {
  const { style, ...rest } = props;

  const {
    token: { colorBorder, borderRadius },
  } = theme.useToken();

  return (
    <div
      ref={ref}
      {...rest}
      style={{ borderColor: colorBorder, borderRadius: borderRadius, borderWidth: 1, borderStyle: "solid", ...style }}
    >
      {props.children}
    </div>
  );
});

export default SimpleCard;
