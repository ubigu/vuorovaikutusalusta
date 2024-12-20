import React from 'react';
import {
  AppBar,
  List,
  ListItem,
  Theme,
  Toolbar,
  Typography,
} from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import SurveyLanguageMenu from '../SurveyLanguageMenu';
import LanguageMenu from '../LanguageMenu';
import AppBarUserMenu from './AppBarUserMenu';
import { NavLink } from 'react-router-dom';
import KartallaLogo from '@src/components/icons/KartallaLogo';
import { AppBarInstructionsMenu } from './Instructions/AppBarInstructionsMenu';

interface Props {
  labels?: string[];
  withHomeLink?: boolean;
  style?: SystemStyleObject<Theme>;
}

export function AdminAppBar({
  labels = [],
  withHomeLink = true,
  style = {},
}: Props) {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <List
            sx={{
              ...style,
              display: 'flex',
              flexWrap: 'nowrap',
              '& li': {
                padding: '0',
              },
              'li+li::before': {
                content: '" • "',
                padding: '0px 10px',
                lineHeight: 1.6,
                fontSize: '1.25rem',
              },
            }}
          >
            {withHomeLink && (
              <ListItem>
                <Typography
                  variant="subtitle1"
                  noWrap
                  component={NavLink}
                  to="/"
                  sx={{
                    textDecoration: 'none',
                    color: 'white',
                    '&:hover': {
                      opacity: 0.6,
                    },
                  }}
                >
                  <KartallaLogo />
                </Typography>
              </ListItem>
            )}
            {labels.map((item, index) => (
              <ListItem
                key={`${item}-${index}`}
                sx={{ maxWidth: index === 0 ? '300px' : 'auto' }}
              >
                <Typography
                  noWrap
                  variant="subtitle1"
                  component="p"
                  sx={{ textOverflow: 'ellipsis' }}
                  title={item}
                >
                  {item}
                </Typography>
              </ListItem>
            ))}
          </List>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifySelf: 'flex-end',
              gap: '0.25rem',
            }}
          >
            <SurveyLanguageMenu />
            <LanguageMenu />
            <AppBarInstructionsMenu />
            <AppBarUserMenu />
          </div>
        </Toolbar>
      </AppBar>
      {/* Additional toolbar for preventing content going under appbar */}
      <Toolbar />
    </>
  );
}
