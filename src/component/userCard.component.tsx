import React from "react";
import { Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Assets from "../imports/assets.import";
import { validImgUrl } from "../utils/functions.util";

interface userCardProps {
  user: any;
  loading: boolean;
  edit: any;
  deleteUser: any;
}

export default function UserCard(props: userCardProps) {
  const { user, loading, edit, deleteUser } = props;
  return (
    <div
      key={user.key}
      className="relative group bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          loading={loading}
          onClick={() => edit(user)}
          className="w-10 h-10 bg-indigo-500 border-none text-white rounded-full flex items-center justify-center hover:bg-indigo-600"
        >
          <EditOutlined className="text-lg" />
        </Button>

        <Popconfirm
          title="Are you sure you want to delete this user?"
          onConfirm={() => deleteUser(user)}
          okText="Yes"
          cancelText="No"
        >
          <button className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
            <DeleteOutlined className="text-lg" />
          </button>
        </Popconfirm>
      </div>

      <div className="p-6 text-center border border-1 ">
        <img
          src={validImgUrl(user.avatar) ? user.avatar : Assets.logo}
          alt={`${user.first_name} ${user.last_name}`}
          className="w-20 h-20 rounded-full mx-auto mb-4 object-cover bg-red-500"
        />
        <h3 className="text-lg font-semibold text-gray-800">
          {user.first_name} {user.last_name}
        </h3>
        <p className="text-lg text-gray-500">{user.email}</p>
      </div>
    </div>
  );
}
