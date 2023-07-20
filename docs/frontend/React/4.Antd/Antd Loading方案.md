# Loading方案

## 使用Context将Loading包装为高阶组件

这种方式通过hooks来控制loading，实际上是组件级别的loading控制

通过自定义hooks抛出三个属性loading,startLoading,stopLoading

```tsx
import React, { useContext } from "react";
import { Spin } from "antd";
import { useState } from "react";

interface LoadingContextProps {
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = React.createContext<LoadingContextProps | undefined>(
  undefined
);

interface LoadingServiceProps {
  children: JSX.Element;
}
// 自定义hook用于访问LoadingContext
export const useLoading = (): LoadingContextProps => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingService");
  }
  return context;
};

export const LoadingService: React.FC<LoadingServiceProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
      {children}
      {loading && (
        <div className="overlay">
          <Spin />
        </div>
      )}
    </LoadingContext.Provider>
  );
};
```

```tsx
// index.tsx
root.render(
  <React.StrictMode>
    <LoadingService>
      <App />
    </LoadingService>
  </React.StrictMode>
);
```

```css
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-color: rgba(0, 0, 0, 0.25); */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  font-size: 20px;
}
```



## axios拦截器控制loading

这种方式属于接口级别的loading控制

```tsx
import { Spin } from "antd";
import axios from "axios";
import ReactDOM from "react-dom/client";
const service = axios.create({
  baseURL: "http://localhost:3000/users/",
  timeout: 6000
});

let requestCount = 0;
const showLoading = () => {
  if (requestCount === 0) {
    const dom = document.createElement("div");
    dom.setAttribute("class", "overlay");
    document.body.append(dom);
    ReactDOM.createRoot(dom).render(<Spin />);
  }
  requestCount++;
};
const hideLoading = () => {
  requestCount--;
  if (requestCount === 0) {
    document.querySelector(".overlay")?.remove();
  }
};

service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做一些处理，例如添加token等
    showLoading();
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据进行处理，例如解析数据等
    hideLoading();
    return response;
  },
  (error) => {
    // 处理响应错误
    return Promise.reject(error);
  }
);

export default service;
```

