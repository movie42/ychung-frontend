import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type CheckValue = "email" | "userName";

const checkValueExist = async (value: string, type: CheckValue) => {
  return axios.get(`/api/user/checked-db?${type}=${value}`);
};

interface UseCheckValueExistProps {
  type: CheckValue;
  value: string;
}
const useCheckValueExist = ({ type, value }: UseCheckValueExistProps) => {
  return useQuery(["checkValueExist", type], () =>
    checkValueExist(value, type)
  );
};

export default useCheckValueExist;
