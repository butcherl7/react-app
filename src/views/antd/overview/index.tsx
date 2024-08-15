import dayjs, { Dayjs } from "dayjs";
import React, { useContext, useMemo, useRef, useState } from "react";
import { MoonOutlined, RadiusUprightOutlined, SunOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Calendar,
  Card,
  Cascader,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Flex,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  TreeSelect,
  message,
  notification,
} from "antd";

import type { GetProps, NotificationArgsProps, MessageArgsProps, TableProps, SelectProps, CalendarProps } from "antd";

import { ThemeContext } from "@/context";

import style from "./index.module.scss";

const { Search } = Input;
const { RangePicker } = DatePicker;

type NoticeType = MessageArgsProps["type"];
type NotificationPlacement = NotificationArgsProps["placement"];
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const Context = React.createContext({ name: "Default" });

const defaultTime = dayjs("04:00:00", "HH:mm:ss");

/**
 * 生成 0 到指定范围的随机整数
 *
 * @param  max 随机数上限（exclusive）
 * @returns 0 到指定范围的随机整数
 */
function randomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

function randomName() {
  // prettier-ignore
  const firstName = "刘 关 张 陈 李 诸葛 赵 钱 孙 周 吴 郑 王 冯 蒋 韩 杨 孔 曹 谢 鲁 乐 伍 余 毛 杜 贾 秦 黄 熊 江 童 梅 林 高 夏 田 蔡 钟 胡 皮 庞 宇文 虞 柯 卢 雷 康 安 马 牛 方 魏 金 陶 姜 何 朱 尤 沈 路 祝 公孙".split(' ')
  const maleLastName = "亮 玮 雨 羽 飞".split(" ");
  const femaleLastName = "菲菲 羽墨 若若".split(" ");

  const usedName = Math.random() > 0.2 ? maleLastName : femaleLastName;

  return firstName[randomNumber(firstName.length)] + usedName[randomNumber(usedName.length)];
}

export default function Page() {
  const [pass, setPass] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [noticeApi, noticeContextHolder] = notification.useNotification();

  const showCustomNotification = () => {
    noticeApi.open({
      type: pass ? "success" : "error",
      // duration: 0,
      placement: "topRight",
      message: pass ? "PASS" : "NG",
      description: pass
        ? "Challenge passed, please continue to the next level!"
        : "Failed, Zombies have eaten your brain!",
      className: pass ? "custom-pass-notice" : "custom-fail-notice",
    });
  };

  return (
    <div>
      <ButtonPicker />

      <MiniTable pass={pass} setPass={setPass} />

      <Inputs />

      <Space>
        {noticeContextHolder}
        <Button type="primary" onClick={() => setDrawerOpen(true)}>
          Open Drawer
        </Button>
        <Drawer title="Basic Drawer" onClose={() => setDrawerOpen(false)} open={drawerOpen}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>

        <Button onClick={() => showCustomNotification()}>{pass ? "PASS" : "NG"} Notification</Button>
      </Space>

      <Newline />

      <MyCalendar />
    </div>
  );
}

function Newline() {
  return <p></p>;
}

function Inputs() {
  const selectOptions: SelectProps["options"] = [];

  interface Option {
    value: string | number;
    label: string;
    children?: Option[];
  }

  for (let i = 10; i < 36; i++) {
    selectOptions.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  const cascaderOptions: Option[] = [
    {
      value: "zhejiang",
      label: "Zhejiang",
      children: [
        {
          value: "hangzhou",
          label: "Hangzhou",
          children: [
            {
              value: "xihu",
              label: "West Lake",
            },
          ],
        },
      ],
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      children: [
        {
          value: "nanjing",
          label: "Nanjing",
          children: [
            {
              value: "zhonghuamen",
              label: "Zhong Hua Men",
            },
          ],
        },
      ],
    },
  ];

  const treeData = [
    {
      value: "parent 1",
      title: "parent 1",
      children: [
        {
          value: "parent 1-0",
          title: "parent 1-0",
          children: [
            {
              value: "leaf1",
              title: "leaf1",
            },
            {
              value: "leaf2",
              title: "leaf2",
            },
          ],
        },
        {
          value: "parent 1-1",
          title: "parent 1-1",
          children: [
            {
              value: "leaf3",
              title: <b style={{ color: "#08c" }}>leaf3</b>,
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <Space>
        <TreeSelect placeholder="TreeSelect" treeDefaultExpandAll treeData={treeData} style={{ width: 200 }} />
        <Search placeholder="input search text" allowClear style={{ width: 200 }} />
        <Input.Password placeholder="input password" />

        <Select
          style={{ width: 120 }}
          showSearch
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "tom", label: "Tom" },
          ]}
        />

        <Select style={{ width: 250 }} mode="multiple" allowClear placeholder="Please select" options={selectOptions} />

        <Cascader options={cascaderOptions} placeholder="Cascader" />
      </Space>

      <Divider />
    </>
  );
}

function ButtonPicker() {
  const themeContext = useContext(ThemeContext);
  const [dateTime, setDateTime] = useState<RangePickerProps["value"]>();

  const handleOk: RangePickerProps["onOk"] = (dates) => setDateTime(dates);

  return (
    <>
      <Flex gap="small" wrap="wrap">
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed" disabled>
          Dashed Button
        </Button>
        <Button type="text">Text Button</Button>
        <Button type="link" onClick={() => console.log("isDarkMode: " + themeContext.isDarkMode)}>
          Link Button
        </Button>

        <DatePicker />
        <RangePicker
          onOk={handleOk}
          value={dateTime}
          allowClear={false}
          showTime={{ defaultValue: [defaultTime, defaultTime] }}
          disabledDate={(current) => current.isBefore(dayjs(), "day")}
        />
      </Flex>
      <Divider />
    </>
  );
}

function MiniTable({ pass, setPass }: any) {
  const themeContext = useContext(ThemeContext);

  const [isModalOpen, setModalOpen] = useState(false);

  const [messageApi, messageContextHolder] = message.useMessage();
  const [noticeApi, noticeContextHolder] = notification.useNotification();

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  const showMessage = (type: NoticeType) => {
    messageApi.open({ type, content: `This is a ${type} message` });
  };

  const openNotification = (placement: NotificationPlacement) => {
    noticeApi.info({
      message: `Notification ${placement}`,
      description: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
      placement,
    });
  };

  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <>
      <Flex gap="large">
        <Card title="Default size card" style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>

        <Space direction="vertical">
          <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
          <Switch checkedChildren="PASS" unCheckedChildren="NG" value={pass} onChange={(c) => setPass(c)} />
          <Switch
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            onChange={(c) => themeContext.setDarkMode(c)}
          />
          <Switch loading defaultChecked />
        </Space>

        <div>
          <Button type="primary" onClick={() => setModalOpen(true)}>
            显示模态框
          </Button>

          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={() => setModalOpen(false)}
            onCancel={() => setModalOpen(false)}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>

          <Newline />

          <Popconfirm title="Delete the task" description="Are you sure to delete this task?">
            <Button danger>Delete (Popconfirm)</Button>
          </Popconfirm>

          <Newline />

          <Context.Provider value={contextValue}>
            {noticeContextHolder}
            <Button type="primary" onClick={() => openNotification("topRight")} icon={<RadiusUprightOutlined />}>
              topRight
            </Button>
          </Context.Provider>

          <Newline />

          <Space>
            {messageContextHolder}
            <Button onClick={() => showMessage("info")}>Success</Button>
            <Button onClick={() => showMessage("error")}>Error</Button>
          </Space>

          <Newline />

          <Alert showIcon message="Success Text" type="success" />
        </div>

        <Table columns={columns} dataSource={data} pagination={false} />
      </Flex>

      <Divider />
    </>
  );
}

function MyCalendar() {
  const today = dayjs();
  const [date, setDate] = useState(today);
  const userMap = useRef<Map<string, [string, string]>>(new Map());

  const headerRender: CalendarProps<Dayjs>["headerRender"] = ({ value, onChange }) => {
    const yearOptions = new Array(3).fill(today.year() - 1).map((v, ix) => ({
      value: v + ix,
      label: v + ix,
    }));

    const monthsOptions = new Array(12).fill(0).map((_v, ix) => ({
      value: ix,
      label: dayjs(ix + 1 + "").format("MMM"),
    }));

    const wid = { width: 80 };

    return (
      <div style={{ padding: 8 }}>
        <Row gutter={8} justify="end">
          <Col>
            <span style={{ fontWeight: isSameDay(today, date) ? "bold" : "normal" }}>{date.format("LL dddd")}</span>
          </Col>

          <Col flex="auto" />

          <Col hidden={isSameDay(today, value)}>
            <Button type="text" onClick={() => setDate(today)}>
              返回今天
            </Button>
          </Col>

          <Col>
            <Select
              style={wid}
              value={date.year()}
              options={yearOptions}
              onChange={(newYear) => onChange(value.year(newYear))}
            ></Select>
          </Col>

          <Col>
            <Select
              style={wid}
              value={date.month()}
              options={monthsOptions}
              onChange={(newMonth) => onChange(value.month(newMonth))}
            ></Select>
          </Col>
        </Row>
      </div>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date" && current.day() !== 0) {
      let users;
      const date = current.format("YYYYMMDD");
      const CellTag = isSameDay(current, today) ? "strong" : "span";

      if (userMap.current.has(date)) {
        users = userMap.current.get(date)?.join("/");
      } else {
        userMap.current.set(date, [randomName(), randomName()]);
      }
      return <CellTag>{users}</CellTag>;
    }
    // return info.originNode;
    return <></>;
  };

  return (
    <div className={style.calendar}>
      <Calendar
        value={date}
        cellRender={cellRender}
        headerRender={headerRender}
        onChange={(date) => setDate(date)}
        disabledDate={(currentDate) => currentDate.isBefore(today, "day")}
      />
    </div>
  );
}

/**
 * 判断两个日期是否是同一天。
 */
function isSameDay(date1: Dayjs, date2: Dayjs) {
  return date1.isSame(date2, "day");
}
