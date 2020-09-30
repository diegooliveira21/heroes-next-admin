import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => createStyles({
  inputWrapper: {
    '& > div:nth-child(even)': {
      margin: '15px 0',
    },
  },
}));

export default useStyles;
