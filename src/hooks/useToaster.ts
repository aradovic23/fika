import { useRouter } from "next/router";
import { useState } from "react";

interface NavigationInfo {
  type: "back" | "toPage";
  path?: string;
}

const useToaster = (): [boolean, string, (msg: string) => void] => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const showToaster = (
    msg: string,
    navigation?: NavigationInfo | (() => void)
  ) => {
    setMessage(msg);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
      if (navigation && navigation.type === "back") {
        router.back();
      } else if (navigation && navigation.type === "toPage") {
        router.push(navigation.path);
      }
    }, 3000);
  };

  return [isVisible, message, showToaster];
};

export default useToaster;
