## Table跨页多选

父组件中定义好obj存选中行内容，keys用于计算存选中行keys

```tsx
// 应用选择的Rows
    const [appSelectedObj, setAppSelectedObj] = useState<any[]>([]);
    // 主机选择的Rows
    const [hostSelectedObj, setHostSelectedObj] = useState<any[]>([]);
    // 应用选择的Keys
    const computedAppSelectedKeys = useMemo(() => {
        return appSelectedObj.map((item) => item.uuid);
    }, [appSelectedObj]);
    // 主机选择的Keys
    const computedHostSelectedKeys = useMemo(() => {
        return appSelectedObj.map((item) => item.uuid);
    }, [hostSelectedObj]);
```

子组件中调用setObj更新选中行内容，一旦obj变化，computedAppSelectedKeys也跟着变化，而computedAppSelectedKeys又是子组件中的selectedRowKeys，用于展示勾选的。

```tsx
import { Input, Table } from "antd";
import { useState } from "react";
import styles from "./index.module.scss";
import produce from "immer";
import { useRequest } from "ahooks";
import { getAllApp } from "@/api/modules/resourcepool";

type AppTableProps = {
    setSelectedObj: any;
    selectedEngineIds?: any[];
    computedSelectedKeys: any[];
};

export const AppTable: React.FC<AppTableProps> = ({
    setSelectedObj,
    selectedEngineIds = [],
    computedSelectedKeys,
}) => {
    const [searchParams, setSearchParams] = useState({
        name: "",
        pageNum: 1,
        pageSize: 10,
    });
    const [total, setTotal] = useState(0);

    const {
        data: appDataList,
        run: fetchAppData,
        loading: appLoading,
    } = useRequest<any, any>(
        async (params) => {
            let { content, totalElements } = await getAllApp(params);
            setTotal(totalElements);
            return content;
        },
        {
            manual: true,
            defaultParams: [searchParams],
        }
    );

    return (
        <>
            <Table
                scroll={{ y: 400 }}
                rowSelection={{
                    type: "checkbox",
                    selectedRowKeys: computedSelectedKeys,
                    onChange(selectedRowKeys, selectedRows) {
                        // console.log("selectedRowKeys: ", selectedRowKeys);
                        // console.log("selectedRows: ", selectedRows);

                        setSelectedObj(selectedRows);
                    },
                    preserveSelectedRowKeys: true,
                    getCheckboxProps(record) {
                        return {
                            disabled: selectedEngineIds?.includes(record.engineId),
                        };
                    },
                }}
                rowKey="uuid"
                loading={appLoading}
                dataSource={appDataList}
                columns={[
                    {
                        title: "应用名称",
                        dataIndex: "name",
                        width: 100,
                        ellipsis: true,
                    },
                    {
                        title: "引擎类型",
                        width: 100,
                        dataIndex: "engineType",
                    },
                    {
                        title: "所属引擎",
                        dataIndex: ["engine", "name"],
                        width: 100,
                    },
                    {
                        title: "主机IP",
                        dataIndex: ["host"],
                        width: 100,
                        render: (value: any[]) => {
                            const ips = value?.map((item) => item.ip);
                            return ips;
                        },
                    },
                    {
                        title: "skyIp",
                        dataIndex: ["resource", "ip"],
                        width: 100,
                    },
                ]}
                pagination={{
                    style: {
                        justifyContent: "center",
                    },
                    total: total,
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: [10, 25, 50, 100],
                    onChange(page, pageSize) {
                        const params = {
                            ...searchParams,
                            pageNum: page,
                            pageSize,
                        };
                        fetchAppData(params);
                    },
                }}
            />
        </>
    );
};
```

