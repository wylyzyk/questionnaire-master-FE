import { Input } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export const SearchList = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [value, setValue] = useState<string>("");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const currentValue = searchParams.get("keyword") || "";
    setValue(currentValue);
  }, [searchParams]);

  function handleSearch(val: string) {
    navigate({
      pathname,
      search: `keyword=${val}`
    });
  }

  return (
    <Input.Search
      allowClear
      placeholder="请输入关键字"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSearch={handleSearch}
    />
  );
};
