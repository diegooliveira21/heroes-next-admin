import React, {
  useContext,
  ReactElement,
  useLayoutEffect,
} from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import HSDrawerMenu from '@components/hs-drawer-menu/hs-drawer-menu.component';
import useHSRouters from '@hooks/use-hs-routers/use-hs-routers';
import { GlobalContext } from '@contexts/global.context';

function DashboardPage(): boolean | ReactElement {
  const {
    user: {
      data: {
        isLogged,
      },
    },
  } = useContext(GlobalContext);

  const { pushToSignIn } = useHSRouters();

  useLayoutEffect(() => {
    if (!isLogged) pushToSignIn();
  }, [isLogged]);

  return (
    isLogged && (
      <HSDrawerMenu>
        <Container>
          <Grid>
            <Typography>Works!</Typography>
          </Grid>
        </Container>
      </HSDrawerMenu>
    )
  );
}

export default DashboardPage;
