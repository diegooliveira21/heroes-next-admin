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
        id: userId,
      },
    },
  } = useContext(GlobalContext);

  const { pushToSignIn } = useHSRouters();

  useLayoutEffect(() => {
    if (!userId) pushToSignIn();
  }, [userId]);

  return (
    !!userId && (
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
