/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useState } from "react";

import { User } from "../types/api/user";
import { useMassage } from "./useMassage";

export const useAllUsers = () => {
  const { showMassage } = useMassage();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<Array<User>>([]);

  const getUsers = useCallback(() => {
    setLoading(true);
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch(() => {
        showMassage({ title: "ユーザー取得に失敗しました", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { getUsers, loading, users };
};
