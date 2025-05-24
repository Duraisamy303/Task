import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Avatar,
  Pagination,
  Radio,
  Modal,
  Form,
  Popconfirm,
  message,
  Spin,
} from "antd";
import {
  SearchOutlined,
  TableOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import Models from "../../imports/models.import";
import { useSetState, validImgUrl } from "../../utils/functions.util";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import useDebounce from "../../component/useDebounce.component";
import UserCard from "../../component/userCard.component";
import Assets from "../../imports/assets.import";

const UserList = () => {
  const [view, setView] = useState<"table" | "card">("table");

  const [messageApi, contextHolder] = message.useMessage();

  const [state, setState] = useSetState({
    userList: [],
    isOpen: false,
    isModalOpen: false,
    search: "",
    loading: false,
    btnLoading: false,
    detailsLoading: false,
    total: 0,
    page: 1,
    per_page: 10,
    view: "table",
  });

  const [form] = Form.useForm();

  const showModal = () => {
    setState({ isModalOpen: true });
  };

  const handleCancel = () => {
    form.resetFields();
    setState({ isModalOpen: false, userId: null });
  };

  const handleSubmit = async (values: any) => {
    try {
      setState({ btnLoading: true });
      const body = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        avatar: values.avatar,
      };

      if (state.userId) {
        const res: any = await Models.auth.update_user(state.userId, body);
        const updatedUser = {
          id: state.userId,
          first_name: res?.first_name,
          last_name: res?.last_name,
          avatar: res?.avatar,
          email: res?.email,
        };

        const updatedUserList = state.userList.map((user: any) =>
          user.id === state.userId ? { ...user, ...updatedUser } : user
        );
        setState({
          userList: updatedUserList,
          isModalOpen: false,
        });
        messageApi.open({
          type: "success",
          content: "User updated succssfully",
        });
      } else {
        const res = await Models.auth.create_user(body);
        const arr = [res, ...state.userList];
        setState({ userList: arr });

        messageApi.open({
          type: "success",
          content: "User created succssfully",
        });
      }
      setState({ userId: null });
      form.resetFields();
      setState({ isModalOpen: false, btnLoading: false });
    } catch (error) {
      setState({ btnLoading: true });

      console.log("error: ", error);
    }
  };

  const deleteUser = async (record: any) => {
    try {
      const res = await Models.auth.delete_user(record?.id);
      const updatedUserList = state.userList.filter(
        (user: any) => user.id !== record.id
      );
      setState({
        userList: updatedUserList,
        originalUserList: updatedUserList,
      });
      messageApi.open({
        type: "success",
        content: "User deleted succssfully",
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const edit = async (record: any) => {
    try {
      setState({ detailsLoading: true, userId: record?.id });
      //   const res: any = await Models.auth.user_details(record?.id);
      form.setFieldsValue({
        firstName: record?.first_name,
        lastName: record?.last_name,
        email: record?.email,
        avatar: record?.avatar,
      });
      setState({ isModalOpen: true, detailsLoading: false });
    } catch (error) {
      setState({ detailsLoading: false });

      console.log("error: ", error);
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      render: (src: string) => (
        <Avatar
          src={validImgUrl(src) ? src : Assets.logo}
          size="large"
          className={`${!validImgUrl(src) && "bg-red-500"}`}
        />
      ),
      width: 60,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text: string) => <a className="text-blue-600">{text}</a>,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
    },
    {
      title: "Action",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            loading={record?.id === state.userId && state.detailsLoading}
            onClick={() => edit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => deleteUser(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  useEffect(() => {
    userList(state.page);
  }, []);

  const debounceSearch = useDebounce(state.search, 1000);

  useEffect(() => {
    filterBySearch();
  }, [debounceSearch]);

  const filterBySearch = () => {
    if (state.search) {
      const searchLower = state.search.toLowerCase();
  
      const filtered = state.originalUserList.filter((user: any) =>
        user.first_name?.toLowerCase().includes(searchLower) ||
        user.last_name?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower)
      );
  
      setState({
        userList: filtered,
        total_pages: filtered?.length,
        loading: false,
      });
    } else {
      setState({
        userList: state.originalUserList,
        total_pages: state.originalUserList?.length || 0,
        loading: false,
      });
    }
  };
  

  const userList = async (page: number) => {
    try {
      setState({ loading: true });
      const res: any = await Models.auth.userList(page, state.per_page);
      setState({
        userList: res?.data,
        loading: false,
        originalUserList: res?.data,
        total: res?.total,
        page: res?.page,
      });
    } catch (error) {
      setState({ loading: false });

      console.log("error: ", error);
    }
  };

  return (
    <div className="p-6  min-h-screen">
      {contextHolder}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Users</h2>
              <div className="pt-3">
                <Radio.Group
                  value={view}
                  onChange={(e) => setState({ view: e.target.value })}
                >
                  <Radio.Button value="table">
                    <TableOutlined style={{ marginRight: 6 }} />
                    Table
                  </Radio.Button>
                  <Radio.Button value="card">
                    <AppstoreOutlined style={{ marginRight: 6 }} />
                    Card
                  </Radio.Button>
                </Radio.Group>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search by email"
              value={state.search}
              onChange={(e) => setState({ search: e.target.value })}
              className="w-full md:w-64"
            />

            <Button type="primary" onClick={showModal}>
              Create User
            </Button>
          </div>
        </div>
        {state.loading ? (
          <div className="flex items-center justify-center h-screen">
            <Spin size="large" tip="Loading..." />
          </div>
        ) : state.view === "table" ? (
          <Table
            dataSource={state.userList}
            columns={columns}
            pagination={false}
            scroll={{ x: "max-content" }}
            className="overflow-x-auto"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.userList?.length > 0 ? (
              state.userList.map((user: any) => (
                <UserCard
                  user={user}
                  loading={state.detailsLoading}
                  deleteUser={() => deleteUser(user)}
                  edit={() => edit(user)}
                />
              ))
            ) : (
              <div className="w-full flex items-center justify-center">
                <div className="text-center">User Not Found</div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end mt-6">
          <Pagination
            current={state.page}
            pageSize={state.per_page}
            total={state.total}
            onChange={(page) => userList(page)}
          />
        </div>

        <Modal
          title={state.userId ? "Edit User" : "Create New User"}
          open={state.isModalOpen}
          onCancel={handleCancel}
          footer={null}
          centered
          className="rounded-xl"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="mt-4"
          >
            <Form.Item
              name="firstName"
              label={<span className="font-semibold">First Name</span>}
              rules={[{ required: true, message: "Please enter first name" }]}
            >
              <Input placeholder="Please enter first name" />
            </Form.Item>

            <Form.Item
              name="lastName"
              label={<span className="font-semibold">Last Name</span>}
              rules={[{ required: true, message: "Please enter last name" }]}
            >
              <Input placeholder="Please enter last name" />
            </Form.Item>

            <Form.Item
              name="email"
              label={<span className="font-semibold">Email</span>}
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Please enter email" />
            </Form.Item>

            <Form.Item
              name="avatar"
              label={<span className="font-semibold">Profile Image Link</span>}
              rules={[
                { required: true, message: "Please enter profile image link" },
              ]}
            >
              <Input placeholder="Please enter profile image link" />
            </Form.Item>

            {/* Footer Actions */}
            <div className="flex justify-end mt-4 gap-2">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={state.btnLoading}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default UserList;
