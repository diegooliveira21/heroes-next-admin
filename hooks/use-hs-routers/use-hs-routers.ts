import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { UseHSRoutersPathNameEnum } from '@hooks/use-hs-routers/use-hs-routers.enums';
import { UseHsRouters } from '@hooks/use-hs-routers/use-hs-routers.types';

function useHSRouters(): UseHsRouters {
  const router = useRouter();

  function pushToDashboard(): Promise<boolean> {
    return router.push(UseHSRoutersPathNameEnum.Dashboard);
  }

  function pushToSignIn(): Promise<boolean> {
    return router.push(UseHSRoutersPathNameEnum.SignIn);
  }

  return useMemo(() => ({
    pushToDashboard,
    pushToSignIn,
  }), [router]);
}

export default useHSRouters;
