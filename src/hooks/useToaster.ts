import { useRouter } from 'next/router';
import { useState } from 'react';

interface NavigationInfo {
  type: 'back' | 'toPage';
  path?: string;
}

const useToaster = (): [boolean, string, (msg: string, navigation?: NavigationInfo) => void, boolean] => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const router = useRouter();

  const showToaster = (msg: string, navigation?: NavigationInfo) => {
    setIsDisabled(true);
    setMessage(msg);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsDisabled(false);
      if (navigation && navigation.type === 'back') {
        router.back();
      } else if (navigation && navigation.type === 'toPage') {
        void router.push(navigation.path ?? '');
      }
    }, 1500);
  };

  return [isVisible, message, showToaster, isDisabled];
};

export default useToaster;
