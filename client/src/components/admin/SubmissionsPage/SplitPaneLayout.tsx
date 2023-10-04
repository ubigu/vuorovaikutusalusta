import {
  Chip,
  ChipProps,
  Drawer,
  FormHelperText,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import React, { ReactNode, useState } from 'react';
import SplitPane from 'react-split-pane';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100vh',
    display: 'flex',
  },
});

interface Props {
  mainPane: ReactNode;
  sidePane: ReactNode | false;
  mobileDrawer: {
    open: boolean;
    setOpen: (open: boolean) => void;
    chipProps: ChipProps;
    title: string;
    helperText: string;
  };
  defaultSize?: string;
}

export default function SplitPaneLayout({
  mainPane,
  sidePane,
  mobileDrawer,
  defaultSize,
}: Props) {
  const [isResizing, setIsResizing] = useState(false);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* Side pane doesn't exist on any page - show the page in 1 column */}
      {sidePane == null && (
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          {mainPane}
        </div>
      )}
      {/* Desktop: side pane exists */}
      {mdUp && sidePane != null && (
        <SplitPane
          split="vertical"
          defaultSize={defaultSize ?? '50%'}
          style={{ position: 'static' }}
          minSize={200}
          maxSize={-200}
          // Allow scrolling for the stepper pane
          pane1Style={{ overflowY: 'auto' }}
          // Dirty hack to fix iframe resizing issues with the split pane library
          // Issue: https://github.com/tomkp/react-split-pane/issues/361
          // Workaround: https://github.com/tomkp/react-split-pane/issues/241#issuecomment-677091968
          pane2Style={{ pointerEvents: isResizing ? 'none' : 'auto' }}
          onDragStarted={() => {
            setIsResizing(true);
          }}
          onDragFinished={() => {
            setIsResizing(false);
          }}
        >
          {mainPane}
          {sidePane || <div />}
        </SplitPane>
      )}
      {/* Mobile: side pane exists but current page has none */}
      {!mdUp && sidePane === false && (
        <>
          <div>{mainPane}</div>
          <div style={{ flexGrow: 1 }} />
        </>
      )}
      {/* Mobile: side pane exists and current page has some - render the drawer and the button to show it */}
      {!mdUp && sidePane != null && sidePane !== false && (
        <>
          <div style={{ marginTop: 50, width: '100%' }}>{mainPane}</div>

          <Paper
            elevation={3}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#fff',
              zIndex: 1,
            }}
          >
            <Chip
              {...mobileDrawer.chipProps}
              onClick={() => {
                mobileDrawer.setOpen(true);
              }}
            />
          </Paper>
          <Drawer
            anchor="top"
            open={mobileDrawer.open}
            onClose={() => {
              mobileDrawer.setOpen(false);
            }}
            PaperProps={{
              style: {
                height: 'calc(100% - 100px)',
              },
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <Paper
              elevation={3}
              style={{
                minHeight: '4rem',
                padding: '1rem',
                zIndex: 10,
                position: 'sticky',
                top: 0,
              }}
            >
              <IconButton
                style={{ float: 'right' }}
                onClick={() => {
                  mobileDrawer.setOpen(false);
                }}
              >
                <Close />
              </IconButton>
              {mobileDrawer.title && (
                <>
                  <Typography>{mobileDrawer.title}</Typography>
                  <FormHelperText>{mobileDrawer.helperText}</FormHelperText>
                </>
              )}
            </Paper>
            <div style={{ flexGrow: 1, position: 'relative' }}>{sidePane}</div>
          </Drawer>
        </>
      )}
    </div>
  );
}